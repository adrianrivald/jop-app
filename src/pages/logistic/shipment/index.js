import axios from '../../../services/axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Button from '../../../components/button/Button';
import DropDown from '../../../components/forms/Dropdown';
import Divider from '../../../components/ui/Divider';
import Header from '../../../components/ui/Header';
import Toast from '../../../components/ui/Toast';

const url = process.env.REACT_APP_API_URL;

function Dropdown(props) {
  return (
    <div className={`${props.className} w-full`}>
      <label className="text-left mb-1">{props.title}</label>
      <DropDown
        selected={props.selected}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        option={props.option}
      />
    </div>
  );
}

function LogisticShipment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [tphList, setTphList] = React.useState([]);
  const [photos, setPhotos] = React.useState([]);
  const loaded_data = JSON.parse(localStorage.getItem('loaded_data'));
  const [logisticType, setLogisticType] = React.useState([]);
  const [vehicleList, setVehicleList] = React.useState([]);
  const [storageList, setStorageList] = React.useState([]);
  const [addInput, setAddInput] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const scanned_driver = localStorage.getItem('scanned_driver');
  const shipment_payload = JSON.parse(localStorage.getItem('shipment_payload'));

  React.useEffect(() => {
    getLogisticType();
    getStorage();
    setAddInput({
      ...addInput,
      loading_id: loaded_data?.loading_id,
    });
    localStorage.setItem(
      'shipment_payload',
      JSON.stringify({
        ...shipment_payload,
        loading_id: loaded_data?.loading_id,
      })
    );
    if (shipment_payload?.jenis_logistik_id !== null) {
      getVehicle(shipment_payload?.jenis_logistik_id);
    }
  }, []);

  React.useEffect(() => {
    if (scanned_driver !== undefined) {
      setAddInput({
        ...addInput,
        supir_id: scanned_driver,
      });
    }
  }, []);

  const getLogisticType = () => {
    axios
      .get(`${url}jenis-logistik/list?sort=nama`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const logisticTypeData = data.map((res) => ({
          value: res.id,
          label: res.nama,
        }));
        setLogisticType(logisticTypeData);
      });
  };

  const getVehicle = (val) => {
    axios
      .get(`${url}armada/list?sort=kode&filter[jenis_logistik]=${val}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const vehicleData = data.map((res) => ({
          value: res.id,
          label: res.plat_nomor,
        }));
        setVehicleList(vehicleData);
      });
  };

  const getStorage = (val) => {
    axios
      .get(`${url}gudang/list`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const storageData = data.map((res) => ({
          value: res.id,
          label: res.nama,
        }));
        setStorageList(storageData);
      });
  };

  const onChangeHandler = (e, id) => {
    setAddInput({
      ...addInput,
      [id]: e.target.value,
    });

    localStorage.setItem(
      'shipment_payload',
      JSON.stringify({
        ...shipment_payload,
        [id]: e.target.value,
      })
    );

    if (id === 'jenis_logistik_id') {
      getVehicle(e.target.value);
    }
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
        `${url}pengiriman/store
    `,
        shipment_payload,
        config
      )
      .then(() => {
        setIsSubmitted(true);
        setIsButtonDisabled(true);
        setTimeout(() => {
          setIsButtonDisabled(false);
          setIsSubmitted(false);
          localStorage.removeItem('loaded_data');
          localStorage.removeItem('supir_data');
          localStorage.removeItem('pengawal_data');
          localStorage.removeItem('shipment_payload');
          localStorage.removeItem('scan_type');
          localStorage.removeItem('scanned_tapper');
          navigate(-1);
        }, 3000);
      });
  };

  const onScan = (type) => {
    localStorage.setItem('scan_type', type);
    navigate(`scan`);
  };

  const defaultValue = (id) => {
    if (shipment_payload && shipment_payload[id] !== '') {
      return shipment_payload[id];
    }
    return `Pilih ${id}`;
  };

  const removeLocalStorage = () => {
    localStorage.removeItem('loaded_data');
    localStorage.removeItem('supir_data');
    localStorage.removeItem('pengawal_data');
    localStorage.removeItem('shipment_payload');
    localStorage.removeItem('scan_type');
    localStorage.removeItem('scanned_tapper');
  };

  return (
    <>
      <div className="header">
        <Header title="Logistik" isWithBack moreAction={removeLocalStorage} />
      </div>
      <div className="container">
        {loaded_data?.detail?.map((res, idx) => (
          <>
            <div>
              <p>
                LOAD {idx + 1}: {res?.nama} - {res?.berat_kirim} Kg
              </p>
              <p className="font-bold">
                {loaded_data?.kode}/{res?.kode} ({res?.nama})
              </p>
            </div>
            <Divider />
          </>
        ))}
        <div className="load-detail">
          <Dropdown
            title="Jenis logistik"
            defaultValue={!shipment_payload?.jenis_logistik_id ? 'Pilih jenis logistik' : ''}
            selected={
              shipment_payload?.jenis_logistik_id !== null
                ? shipment_payload?.jenis_logistik_id
                : 'Pilih jenis logistik'
            }
            className="mt-3"
            option={logisticType}
            onChange={(e) => onChangeHandler(e, 'jenis_logistik_id')}
          />
          <Dropdown
            title="Armada yang digunakan"
            defaultValue={!shipment_payload?.armada_id ? 'Pilih armada' : ''}
            selected={
              shipment_payload?.armada_id !== null && vehicleList !== [] ? shipment_payload?.armada_id : 'Pilih armada'
            }
            className="mt-3"
            option={vehicleList}
            onChange={(e) => onChangeHandler(e, 'armada_id')}
          />
          <div className="flex gap-3">
            <Dropdown
              title="Alamat / fasilitas tujuan"
              defaultValue={!shipment_payload?.wh_id ? 'Pilih WH' : ''}
              selected={shipment_payload?.wh_id !== null ? shipment_payload?.wh_id : 'Pilih WH'}
              className="mt-3"
              option={[
                { value: 'wh', label: 'WH' },
                { value: 'klien', label: 'Klien' },
              ]}
              onChange={(e) => onChangeHandler(e, 'wh_id')}
            />
            <Dropdown
              title="Kode lokasi gudang"
              defaultValue={!shipment_payload?.gudang_id ? 'Pilih kode lokasi gudang' : ''}
              selected={shipment_payload?.gudang_id !== null ? shipment_payload?.gudang_id : 'Pilih kode lokasi gudang'}
              className="mt-3"
              option={storageList}
              onChange={(e) => onChangeHandler(e, 'gudang_id')}
            />
          </div>
          <div className="flex flex-col items-start w-full mb-4 mt-3">
            <label className="text-left mb-1">Alamat / fasilitas tujuan lain (optional)</label>
            <textarea
              defaultValue={shipment_payload?.alamat_pengiriman !== null ? shipment_payload?.alamat_pengiriman : ''}
              onChange={(e) => onChangeHandler(e, 'alamat_pengiriman')}
              rows="4"
              className="flex justify-between w-full font-bold bg-white dark:bg-white shadow border-none text-xs rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-3 resize-none"
              placeholder="Tulis alamat lengkap di box ini apabila tujuan pengiriman tidak ada dalam pilihan diatas.."
            />
          </div>
          <Divider />
          <div className="driver">
            <div>
              <p>Supir / pengendara</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">
                    <b>{JSON.parse(localStorage.getItem('supir_data'))?.name ?? '-'}</b>
                  </p>
                  <p>{JSON.parse(localStorage.getItem('supir_data'))?.code ?? '-'}</p>
                </div>
                <Button
                  isIcon
                  icon={
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.0555 0C11.2521 0 12.2222 0.970047 12.2222 2.16667V3.5C12.2222 3.77614 11.9983 4 11.7222 4C11.446 4 11.2222 3.77614 11.2222 3.5V2.16667C11.2222 1.52233 10.6998 1 10.0555 1H8.72217C8.44603 1 8.22217 0.77614 8.22217 0.5C8.22217 0.22386 8.44603 0 8.72217 0H10.0555ZM3.72217 0C3.9983 0 4.22217 0.22386 4.22217 0.5C4.22217 0.77614 3.9983 1 3.72217 1H2.38883C1.7445 1 1.22217 1.52233 1.22217 2.16667V3.5C1.22217 3.77614 0.998301 4 0.722168 4C0.446034 4 0.222168 3.77614 0.222168 3.5V2.16667C0.222168 0.970047 1.19223 0 2.38883 0H3.72217ZM11.2222 8.5C11.2222 8.22387 11.446 8 11.7222 8C11.9983 8 12.2222 8.22387 12.2222 8.5V9.83333C12.2222 11.0299 11.2521 12 10.0555 12H8.72217C8.44603 12 8.22217 11.7761 8.22217 11.5C8.22217 11.2239 8.44603 11 8.72217 11H10.0555C10.6998 11 11.2222 10.4777 11.2222 9.83333V8.5ZM0.222168 8.5C0.222168 8.22387 0.446034 8 0.722168 8C0.998301 8 1.22217 8.22387 1.22217 8.5V9.83333C1.22217 10.4777 1.7445 11 2.38883 11H3.72217C3.9983 11 4.22217 11.2239 4.22217 11.5C4.22217 11.7761 3.9983 12 3.72217 12H2.38883C1.19223 12 0.222168 11.0299 0.222168 9.83333V8.5ZM9.22217 5.5C9.49831 5.5 9.72217 5.72387 9.72217 6C9.72217 6.27613 9.49831 6.5 9.22217 6.5H3.22217C2.94603 6.5 2.72217 6.27613 2.72217 6C2.72217 5.72387 2.94603 5.5 3.22217 5.5H9.22217Z"
                        fill="white"
                      />
                    </svg>
                  }
                  text="Scan"
                  className="w-32 p-1.5"
                  onClick={() => onScan('supir')}
                />
              </div>
            </div>
            <Divider />
            <div>
              <p>Pengawal (optional)</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">
                    <b>{JSON.parse(localStorage.getItem('pengawal_data'))?.name ?? '-'}</b>
                  </p>
                  <p>{JSON.parse(localStorage.getItem('pengawal_data'))?.code ?? '-'}</p>
                </div>
                <Button
                  isIcon
                  icon={
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.0555 0C11.2521 0 12.2222 0.970047 12.2222 2.16667V3.5C12.2222 3.77614 11.9983 4 11.7222 4C11.446 4 11.2222 3.77614 11.2222 3.5V2.16667C11.2222 1.52233 10.6998 1 10.0555 1H8.72217C8.44603 1 8.22217 0.77614 8.22217 0.5C8.22217 0.22386 8.44603 0 8.72217 0H10.0555ZM3.72217 0C3.9983 0 4.22217 0.22386 4.22217 0.5C4.22217 0.77614 3.9983 1 3.72217 1H2.38883C1.7445 1 1.22217 1.52233 1.22217 2.16667V3.5C1.22217 3.77614 0.998301 4 0.722168 4C0.446034 4 0.222168 3.77614 0.222168 3.5V2.16667C0.222168 0.970047 1.19223 0 2.38883 0H3.72217ZM11.2222 8.5C11.2222 8.22387 11.446 8 11.7222 8C11.9983 8 12.2222 8.22387 12.2222 8.5V9.83333C12.2222 11.0299 11.2521 12 10.0555 12H8.72217C8.44603 12 8.22217 11.7761 8.22217 11.5C8.22217 11.2239 8.44603 11 8.72217 11H10.0555C10.6998 11 11.2222 10.4777 11.2222 9.83333V8.5ZM0.222168 8.5C0.222168 8.22387 0.446034 8 0.722168 8C0.998301 8 1.22217 8.22387 1.22217 8.5V9.83333C1.22217 10.4777 1.7445 11 2.38883 11H3.72217C3.9983 11 4.22217 11.2239 4.22217 11.5C4.22217 11.7761 3.9983 12 3.72217 12H2.38883C1.19223 12 0.222168 11.0299 0.222168 9.83333V8.5ZM9.22217 5.5C9.49831 5.5 9.72217 5.72387 9.72217 6C9.72217 6.27613 9.49831 6.5 9.22217 6.5H3.22217C2.94603 6.5 2.72217 6.27613 2.72217 6C2.72217 5.72387 2.94603 5.5 3.22217 5.5H9.22217Z"
                        fill="white"
                      />
                    </svg>
                  }
                  text="Scan"
                  className="w-32 p-1.5"
                  onClick={() => onScan('pengawal')}
                />
              </div>
            </div>
            <Divider />
            <div className="button-area mt-5">
              <Button className="w-full" isText text="Deliver" onClick={handleSubmit} disabled={isButtonDisabled} />
            </div>
          </div>
          <Toast text="Sukses mengirim data !" onClose={() => setIsSubmitted(false)} isShow={isSubmitted} />
        </div>
      </div>
    </>
  );
}

export default LogisticShipment;
