import React from 'react';
import Header from '../../../../../../components/ui/Header';
import DropDown from '../../../../../../components/forms/Dropdown';
import DatePicker from '../../../../../../components/forms/DatePicker';
import FlatButton from '../../../../../../components/button/flat';
import TimePicker from '../../../../../../components/forms/TimePicker';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Toast from '../../../../../../components/ui/Toast';
import Button from '../../../../../../components/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../../../../../../store/actions';
import Divider from '../../../../../../components/ui/Divider';

const url = process.env.REACT_APP_API_URL;

function Dropdown(props) {
  return (
    <div className={`mt-5 ${props.customClass}`}>
      <h2 className="text-left mb-1">{props.title}</h2>
      <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
    </div>
  );
}

function CheckIsRecurring(props) {
  return (
    <input
      checked={props.checked}
      onClick={props.onChange}
      type="checkbox"
      className="accent-flora w-4 h-4 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600"
    />
  );
}

function WarehouseCIDetailRescale() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [photos, setPhotos] = React.useState([]);
  const [payload, setPayload] = React.useState({});
  const [warehouseList, setWarehouseList] = React.useState([]);
  const [gudangList, setGudangList] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [weigherList, setWeigherList] = React.useState([]);
  const [shipmentDetail, setShipmentDetail] = React.useState({});
  const [toggle, settoggle] = React.useState(Boolean);
  React.useEffect(() => {
    getShipmentDetail();
    getWarehouse();
    getWeigher();
  }, []);

  const getWarehouse = (id) => {
    axios
      .get(`${url}warehouse/list?include=wilayah_tugas,gudang`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const warehouseData = data.map((res) => ({
          value: res.id,
          label: res.nama,
        }));
        setWarehouseList(warehouseData);
      });
  };

  const getGudang = (val) => {
    axios
      .get(`${url}gudang/list?filter[warehouse]=${val}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const gudangData = data.map((res) => ({
          value: res.id,
          label: res.nama,
        }));
        setGudangList(gudangData);
      });
  };

  const getWeigher = () => {
    axios
      .get(`${url}petugas-timbang/list`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const weigherData = data.map((res) => ({
          value: res.id,
          label: res.nama,
        }));
        setWeigherList(weigherData);
      });
  };

  const getShipmentDetail = async () => {
    await axios
      .get(`${url}pengiriman/scan-by-uuid?identifier=${id}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data;
        setShipmentDetail(data);
        const detailMaterial = data?.loading?.map((res) => ({
          jenis_bahan_baku_id: res?.jenis_bahan_buku_id,
          berat_kirim: res?.berat,
          foto: res?.foto?.map((res) => res.split('/storage/')[1]),
        }));
        console.log(
          data?.loading?.map((res) => ({
            jenis_bahan_baku_id: res?.jenis_bahan_baku_id,
            berat_kirim: res?.berat,
            foto: res?.foto?.map((res) => res.split('/storage/')[1]),
          })),
          'detail data'
        );
        setPayload({
          ...payload,
          pengiriman_id: id,
          detail: detailMaterial,
        });
      });
  };

  const onChangeHandler = (e, input_id) => {
    if (input_id === 'tempat_penimbangan') {
      getGudang(e.target.value);
    }
    setPayload((prev) => ({
      ...prev,
      [input_id]: e.target.value,
    }));
  };

  const onChangeWeight = (e, idx) => {
    payload.detail[idx] = {
      ...payload.detail[idx],
      berat_sampai: parseInt(e.target.value),
    };
    settoggle(!toggle);
  };

  const handleSubmit = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    };
    await axios
      .post(
        `${url}warehouse/timbang-ulang
        `,
        payload,
        config
      )
      .then(() => {
        setIsSubmitted(true);
        setIsButtonDisabled(true);
        setTimeout(() => {
          setIsButtonDisabled(false);
          setIsSubmitted(false);
          navigate(`/warehouse`);
        }, 3000);
      });
  };

  React.useEffect(() => {
    console.log(payload, 'payload');
  }, [toggle]);

  return (
    <>
      <div className="header">
        <Header title="Konfirmasi Barang" isWithBack />
      </div>
      <div className="container">
        <div>
          <Dropdown
            title="Tempat Penimbangan"
            defaultValue="Pilih Tempat Penimbangan"
            option={warehouseList}
            onChange={(e) => onChangeHandler(e, 'tempat_penimbangan')}
            customClass={'mt-0'}
          />
          <Dropdown
            title="Gudang"
            defaultValue="Pilih Gudang"
            option={gudangList}
            onChange={(e) => onChangeHandler(e, 'gudang_id')}
          />
          <Dropdown
            title="Petugas Penimbang WH"
            defaultValue="Pilih Petugas Penimbang WH"
            option={weigherList}
            onChange={(e) => onChangeHandler(e, 'petugas_penimbang_id')}
          />
          <Divider className="mt-5" />
          <div className="mt-5">
            <p>Konfirmasi Bahan Baku</p>
            {shipmentDetail?.loading?.map((res, idx) => (
              <div className="flex justify-between gap-2 mt-4">
                <h2 className="text-left mb-1 font-bold">{res?.nama_produk}</h2>
                <input
                  checked={true}
                  readOnly
                  type="checkbox"
                  className="accent-flora w-4 h-4 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            ))}
          </div>
          <Divider />
          <div className="mt-5">
            <p>Konfirmasi Berat (Wet)</p>
            {shipmentDetail?.loading?.map((res, idx) => (
              <div className="my-2">
                <span>{res?.nama_produk}</span>
                <div className="flex justify-between mt-2 gap-3">
                  <div className="w-1/3 p-3 rounded-xl border border-cloud w-full">
                    <p className="text-xxs mb-3">Berat Kirim</p>
                    <span className="text-4xl font-bold mr-1">{res?.berat}</span>
                    <span>kg</span>
                  </div>
                  <div className="w-1/3 p-3 rounded-xl border border-cloud w-full">
                    <p className="text-xxs mb-3">Berat Sampai</p>
                    <div className="relative">
                      <span className="absolute inset-y-7 right-2">kg</span>
                      <input
                        className="w-full text-4xl font-bold rounded-lg py-2 px-3 text-xs leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        min="0"
                        max={res?.berat}
                        onChange={(e) => onChangeWeight(e, idx)}
                      />
                    </div>
                  </div>
                  <div className="w-1/3 p-3 rounded-xl border border-cloud w-full">
                    <p className="text-xxs mb-3">Selisih Berat</p>
                    <span className="text-4xl font-bold mr-1">
                      {payload?.detail[idx].berat_sampai
                        ? payload?.detail[idx].berat_kirim - payload?.detail[idx].berat_sampai
                        : payload?.detail[idx].berat_kirim}
                    </span>
                    <span>kg</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="photo-area mt-3">
              <div className="photos-container overflow-x-auto flex gap-3">
                {photos?.map((res, idx) => (
                  <img
                    width="200"
                    alt={`photo_${idx + 1}`}
                    src={res.includes('/storage') ? res : `${'https://jop.dudyali.com/storage/'}${res}`}
                    className="rounded-xl"
                  />
                ))}
              </div>
            </div>
            <div className="button-area flex mt-12 gap-2">
              <Button isText isBack text="Kembali" className="w-full" />
              <Button isText text="Konfirmasi" className="w-full" onClick={handleSubmit} disabled={isButtonDisabled} />
            </div>
          </div>
          <Toast text="Sukses menambahkan data !" onClose={() => setIsSubmitted(false)} isShow={isSubmitted} />
        </div>
      </div>
    </>
  );
}

export default WarehouseCIDetailRescale;
