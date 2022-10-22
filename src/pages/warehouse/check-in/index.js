import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Button from '../../../components/button/Button';
import DropDown from '../../../components/forms/Dropdown';
import Divider from '../../../components/ui/Divider';

const url = process.env.REACT_APP_API_URL;

function Dropdown(props) {
  return (
    <div className={`${props.customClass} w-full`}>
      <h2 className="text-left mb-1">{props.title}</h2>
      <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
    </div>
  );
}

function CheckIn(props) {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [warehouseList, setWarehouseList] = React.useState([]);
  const [gudangList, setGudangList] = React.useState([]);
  const navigate = useNavigate();
  const [selectedGudang, setSelectedGudang] = React.useState('');
  const [openedId, setOpenedId] = React.useState({});
  const [selectedItem, setSelectedItem] = React.useState([]);
  const [selectedMaterial, setSelectedMaterial] = React.useState('');
  const [materialList, setMaterialList] = React.useState([]);

  const [checkInData, setCheckInData] = React.useState([]);

  React.useEffect(() => {
    getMaterial();
    getWarehouse();
  }, []);

  React.useEffect(() => {
    if (selectedGudang !== '' && selectedMaterial !== '') {
      getCheckInData(selectedGudang, selectedMaterial);
    }
  }, [selectedGudang, selectedMaterial]);

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

  const getMaterial = () => {
    axios
      .get(`${url}bahan-baku/list`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const materialData = data.map((res) => ({
          value: res.id,
          label: res.nama,
        }));
        setMaterialList(materialData);
      });
  };

  const getCheckInData = (gudang_id, jenis_bahan_baku_id) => {
    axios
      .get(`${url}warehouse/timbang/list?filter[gudang]=${gudang_id}&filter[jenis_bahan_baku]=${jenis_bahan_baku_id}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        setCheckInData(data);
      });
  };

  const onExpand = (idx) => {
    setOpenedId({
      ...openedId,
      [`item_${idx}`]: true,
    });
  };

  const onCollapse = (idx) => {
    setOpenedId({
      ...openedId,
      [`item_${idx}`]: false,
    });
  };

  const onChangeWH = (e) => {
    getGudang(e.target.value);
  };

  const onChangeGudang = (e) => {
    setSelectedGudang(e.target.value);
  };

  const onChangeMaterial = (e) => {
    setSelectedMaterial(e.target.value);
  };

  const onCheckMaterial = (e, id) => {
    if (!selectedItem.includes(id)) {
      setSelectedItem([...selectedItem, id]);
    } else {
      setSelectedItem(selectedItem.filter((val) => val !== id));
    }
    e.stopPropagation();
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
        `${url}warehouse/gabung-stock-in
          `,
        {
          wh_penimbangan_id: selectedItem,
        },
        config
      )
      .then((res) => {
        navigate(`/warehouse/check-in/join/${res?.data.data.stock_in_id}`);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div>
      <div className="scan mb-3">
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
          text="Scan Barang Sampai"
          className="w-full mt-2"
          onClick={() => navigate(`check-in/scan`)}
        />
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex-auto w-64">
          <Dropdown
            title="Tempat Penimbangan"
            defaultValue="Pilih tempat penimbangan"
            option={warehouseList}
            onChange={(e) => onChangeWH(e)}
          />
        </div>
        <div className="flex-auto w-64">
          <Dropdown
            title="Gudang"
            defaultValue="Pilih gudang"
            option={gudangList}
            onChange={(e) => onChangeGudang(e)}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm font-bold">Daftar Barang Sampai</p>
        <DropDown option={materialList} defaultValue="Pilih jenis bahan baku" onChange={(e) => onChangeMaterial(e)} />
      </div>
      <div className="mt-7">
        {checkInData?.length > 0 ? (
          checkInData?.map((res, idx) =>
            openedId[`item_${idx}`] === true ? (
              <div className="bg-white">
                <div
                  className="flex justify-between items-center transition-transform cursor-pointer pt-3 pl-3 pr-3"
                  onClick={() => onCollapse(idx)}
                >
                  <div className="flex items-center">
                    <input
                      checked={selectedItem.includes(res?.id)}
                      onClick={(e) => onCheckMaterial(e, res?.id)}
                      type="checkbox"
                      className="accent-flora scale-150 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 mr-3"
                    />
                    <p className="font-bold">{res?.kode}</p>
                  </div>
                  <div className="cursor-pointer">
                    <svg
                      className="rotate-90"
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002"
                        stroke="#A7A29A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <Divider />
                <div className="mt-5 pl-3 pr-3 pb-3">
                  <div className="flex justify-between items-center font-bold">
                    <div className="flex items-center">
                      <input
                        checked={selectedItem.includes(res?.id)}
                        onClick={(e) => onCheckMaterial(e, res?.id)}
                        type="checkbox"
                        className="accent-flora scale-150 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 mr-3"
                      />
                      <div
                        onClick={() => navigate(`/warehouse/check-in/detail/arrived/${res?.id}`)}
                        className="cursor-pointer ml-2 rounded-lg p-2 text-xs bg-white shadow focus:outline-none focus:shadow-outline font-bold"
                      >
                        {res?.kode_armada}
                      </div>
                    </div>
                    <p>{res?.berat_kirim}</p>
                    <p>{res?.berat_sampai}</p>
                    <p>{res?.selisih_berat}</p>
                  </div>
                </div>
                <Divider className="mb-0" />
              </div>
            ) : (
              <div>
                <div
                  className="flex justify-between items-center transition-transform cursor-pointer pt-3 pl-3 pr-3"
                  onClick={() => onExpand(idx)}
                >
                  <div className="flex items-center">
                    <input
                      checked={selectedItem.includes(res?.id)}
                      onClick={(e) => onCheckMaterial(e, res?.id)}
                      type="checkbox"
                      className="accent-flora scale-150 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 mr-3"
                    />
                    <p className="font-bold">{res?.kode}</p>
                  </div>
                  <div className="cursor-pointer">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002"
                        stroke="#A7A29A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <Divider className="mb-0" />
              </div>
            )
          )
        ) : (
          <div className="flex justify-center">No Data</div>
        )}
      </div>
      <div className="submit-area mt-8">
        <Button isText text="Gabungkan" className="w-full font-bold" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default CheckIn;
