import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Button from '../../../components/button/Button';
import DropDown from '../../../components/forms/Dropdown';
import Divider from '../../../components/ui/Divider';
import Toast from '../../../components/ui/Toast';

const url = process.env.REACT_APP_API_URL;

function Modal(props) {
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto transition-all">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={props.setIsShowModal()}></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-3 sm:flex">
              <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <h4 className="text-lg font-medium text-gray-800">Delete account ?</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
                <div className="items-center gap-2 mt-3 sm:flex">
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                    onClick={props.setIsShowModal()}
                  >
                    Delete
                  </button>
                  <button
                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                    onClick={props.setIsShowModal()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Dropdown(props) {
  return (
    <div className={`${props.customClass} w-full`}>
      <h2 className="text-left mb-1">{props.title}</h2>
      <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
    </div>
  );
}

function CheckOut(props) {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const navigate = useNavigate();
  const [openedId, setOpenedId] = React.useState({});
  const [gudangList, setGudangList] = React.useState([]);
  const [materialList, setMaterialList] = React.useState([]);
  const [warehouseList, setWarehouseList] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState('');
  const [showedId, setShowedId] = React.useState('');
  const [selectedGudang, setSelectedGudang] = React.useState('');
  const [selectedMaterial, setSelectedMaterial] = React.useState('');
  const [stockSalesData, setStockSalesData] = React.useState([]);
  const [photos, setPhotos] = React.useState([]);
  const [payload, setPayload] = React.useState({});
  const checkOutId = localStorage.getItem('check-out-value');
  const [checkOutData, setCheckOutData] = React.useState([]);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [isShowModal, setIsShowModal] = React.useState(false);

  const getStockSales = () => {
    axios
      .get(`${url}warehouse/stock-sales/list?filter[gudang]=${selectedGudang}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data;
        console.log(data, 'stocksaleddata');
        setStockSalesData(data);
        setShowedId(data?.id);
        localStorage.setItem('check-out-value', data?.id);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const getCheckOutDetail = () => {
    axios
      .get(`${url}warehouse/stock-sales/detail/${checkOutId}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data;
        setCheckOutData(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  React.useEffect(() => {
    // getGudang();
    getMaterial();
    getWarehouse();
    if (checkOutId !== undefined || checkOutId) {
      getCheckOutDetail();
    }
  }, []);

  React.useEffect(() => {
    if (selectedGudang !== '') {
      getStockSales(selectedGudang);
      // getCheckOutDetail(selectedGudang, selectedMaterial);
    }
  }, [selectedGudang]);

  React.useEffect(() => {
    if (showedId) {
      getCheckOutDetail();
    }
  }, [showedId]);

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

  const onChangeWH = (e) => {
    getGudang(e.target.value);
  };

  const onChangeGudang = (e) => {
    setSelectedGudang(e.target.value);
  };

  const onEditDetail = (data) => {
    navigate(`check-out/detail/update/${data?.id}`);
    localStorage.setItem('current-checkout-detail', JSON.stringify({ ...data, wh_kode: checkOutData?.kode }));
  };

  const onEditStock = (data) => {
    console.log(data, 'datastock');
    navigate(`check-out/stock/update/${data?.id}`);
  };

  const onRemoveStock = async (stock_id, wh_id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'image/jpeg',
        Accept: 'application/json',
      },
    };
    await axios
      .post(
        `${url}warehouse/stock-sales/remove
        `,
        {
          stock_sales_id: stock_id,
          wh_stock_in_id: [wh_id],
        },
        config
      )
      .then((res) => {
        setIsSuccess(true);
        setIsSubmitted(true);
        setIsButtonDisabled(true);
        setAlertMessage('Sukses menghapus data!');
        setTimeout(() => {
          setIsButtonDisabled(false);
          setIsSubmitted(false);
          getCheckOutDetail();
        }, 3000);
      });
  };

  const handleSubmit = () => {
    //
  };

  return (
    <div>
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
        <p className="text-sm font-bold">Daftar Order Sales</p>
        <DropDown option={[]} defaultValue="Jumlah Timbangan" onChange={(e) => {}} />
      </div>
      <div className="mt-7">
        {checkOutData && checkOutId ? (
          // checkOutData?.detail?.map((res, idx) =>
          openedId === true ? (
            <div>
              <div className="bg-white">
                <div
                  className="flex justify-between items-center transition-transform cursor-pointer pt-3 pl-3 pr-3"
                  onClick={() => setOpenedId(false)}
                >
                  <div className="flex items-center">
                    <div>
                      <p className="font-bold">{checkOutData?.kode}</p>
                      <div className="flex justify-center gap-3">
                        <div className="flex gap-1">
                          <span>Wet</span>
                          <span className="text-xs text-sun font-bold">{checkOutData?.total_wet}</span>
                        </div>
                        <div className="flex gap-1">
                          <span>Drc</span>
                          <span className="text-xs text-sun font-bold">{checkOutData?.drc} %</span>
                        </div>
                        <div className="flex gap-1">
                          <span>Dry</span>
                          <span className="text-xs text-sun font-bold">{checkOutData?.total_dry}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
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
                </div>
                <Divider />
                <div className="mt-5 mb-5 pl-3 pr-3 pb-3">
                  <div className="table-check-out">
                    <div className="flex justify-between items-center my-2">
                      <div className="w-4/12" />
                      <div className="w-1/12">Wet</div>
                      <div className="w-1/12">DRC</div>
                      <div className="w-1/12">Dry</div>
                      <div className="w-1/12 " />
                    </div>
                    {checkOutData?.detail?.map((res, idx) => (
                      <div className="flex justify-between items-center my-2">
                        <div className="w-4/12">
                          {res?.kode} - <b>{res?.nama}</b>
                        </div>
                        <div className="w-1/12 font-bold">{res?.total_wet}</div>
                        <div className="w-1/12 font-bold">{res?.drc}%</div>
                        <div className="w-1/12 font-bold">{res?.total_dry}</div>
                        <div className="w-1/12 ">
                          <Button
                            isIcon
                            icon={
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.1903 1.03174C12.2585 0.100058 10.748 0.100104 9.8164 1.03184L1.84968 8.99946C1.5788 9.2704 1.3884 9.61113 1.29966 9.98387L0.56927 13.0515C0.529057 13.2204 0.579343 13.3981 0.702117 13.5209C0.824897 13.6436 1.00258 13.6939 1.17148 13.6537L4.23898 12.9233C4.61178 12.8345 4.95264 12.6441 5.2236 12.3731L13.1903 4.40542C14.1219 3.47376 14.1219 1.96334 13.1903 1.03174ZM10.5235 1.7389C11.0646 1.19773 11.942 1.1977 12.4831 1.73884C13.0242 2.27994 13.0243 3.15722 12.4832 3.69835L11.889 4.29264L9.9294 2.33309L10.5235 1.7389ZM9.22233 3.04024L11.1819 4.9998L4.51646 11.666C4.37636 11.8061 4.20012 11.9046 4.00736 11.9505L1.73027 12.4927L2.27247 10.2155C2.31834 10.0228 2.41678 9.8466 2.55683 9.70653L9.22233 3.04024Z"
                                  fill="#332919"
                                />
                              </svg>
                            }
                            isText={false}
                            className="bg-white text-black shadow m-0"
                            onClick={() => onEditDetail(res)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {checkOutData?.stock?.map((res, idx) => (
                <div>
                  <div
                    className="flex justify-between items-center transition-transform cursor-pointer pt-3 pl-3 pr-3"
                    onClick={() => setOpenedId(true)}
                  >
                    <div className="flex items-center">
                      <div>
                        <p className="font-bold">{res?.kode}</p>
                        <div className="flex justify-center gap-3">
                          <div className="flex gap-1">
                            <span>Wet</span>
                            <span className="text-xs text-sun font-bold">{res?.total_wet}</span>
                          </div>
                          <div className="flex gap-1">
                            <span>Drc</span>
                            <span className="text-xs text-sun font-bold">{res?.drc} %</span>
                          </div>
                          <div className="flex gap-1">
                            <span>Dry</span>
                            <span className="text-xs text-sun font-bold">{res?.total_dry}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <Button
                        isIcon
                        icon={
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.1903 1.03174C12.2585 0.100058 10.748 0.100104 9.8164 1.03184L1.84968 8.99946C1.5788 9.2704 1.3884 9.61113 1.29966 9.98387L0.56927 13.0515C0.529057 13.2204 0.579343 13.3981 0.702117 13.5209C0.824897 13.6436 1.00258 13.6939 1.17148 13.6537L4.23898 12.9233C4.61178 12.8345 4.95264 12.6441 5.2236 12.3731L13.1903 4.40542C14.1219 3.47376 14.1219 1.96334 13.1903 1.03174ZM10.5235 1.7389C11.0646 1.19773 11.942 1.1977 12.4831 1.73884C13.0242 2.27994 13.0243 3.15722 12.4832 3.69835L11.889 4.29264L9.9294 2.33309L10.5235 1.7389ZM9.22233 3.04024L11.1819 4.9998L4.51646 11.666C4.37636 11.8061 4.20012 11.9046 4.00736 11.9505L1.73027 12.4927L2.27247 10.2155C2.31834 10.0228 2.41678 9.8466 2.55683 9.70653L9.22233 3.04024Z"
                              fill="#332919"
                            />
                          </svg>
                        }
                        isText={false}
                        className="bg-white text-black shadow m-0"
                        onClick={() => onEditStock(res)}
                      />
                      <Button
                        isIcon
                        icon={
                          <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.889 2.83333H8.55566C8.55566 2.09695 7.95873 1.5 7.22233 1.5C6.48593 1.5 5.889 2.09695 5.889 2.83333ZM4.889 2.83333C4.889 1.54467 5.93366 0.5 7.22233 0.5C8.511 0.5 9.55566 1.54467 9.55566 2.83333H13.389C13.6651 2.83333 13.889 3.05719 13.889 3.33333C13.889 3.60947 13.6651 3.83333 13.389 3.83333H12.5096L11.7283 11.9075C11.6043 13.1889 10.5273 14.1667 9.23986 14.1667H5.20479C3.91736 14.1667 2.84043 13.1889 2.71642 11.9075L1.93505 3.83333H1.05566C0.779524 3.83333 0.555664 3.60947 0.555664 3.33333C0.555664 3.05719 0.779524 2.83333 1.05566 2.83333H4.889ZM6.22233 6C6.22233 5.72386 5.99846 5.5 5.72233 5.5C5.44619 5.5 5.22233 5.72386 5.22233 6V11C5.22233 11.2761 5.44619 11.5 5.72233 11.5C5.99846 11.5 6.22233 11.2761 6.22233 11V6ZM8.72233 5.5C8.99846 5.5 9.22233 5.72386 9.22233 6V11C9.22233 11.2761 8.99846 11.5 8.72233 11.5C8.4462 11.5 8.22233 11.2761 8.22233 11V6C8.22233 5.72386 8.4462 5.5 8.72233 5.5ZM3.71177 11.8111C3.78618 12.58 4.43233 13.1667 5.20479 13.1667H9.23986C10.0123 13.1667 10.6585 12.58 10.7329 11.8111L11.5049 3.83333H2.93972L3.71177 11.8111Z"
                              fill="#332919"
                            />
                          </svg>
                        }
                        isText={false}
                        className="bg-white text-black shadow m-0"
                        onClick={() => onRemoveStock(checkOutData?.id, res?.id)}
                      />
                    </div>
                  </div>
                  <Divider className="mb-0" />
                </div>
              ))}
              <Divider className="mb-0" />
            </div>
          ) : (
            <div>
              <div
                className="flex justify-between items-center transition-transform cursor-pointer pt-3 pl-3 pr-3"
                onClick={() => setOpenedId(true)}
              >
                <div className="flex items-center">
                  <div>
                    <p className="font-bold">{checkOutData?.kode}</p>
                    <div className="flex justify-center gap-3">
                      <div className="flex gap-1">
                        <span>Wet</span>
                        <span className="text-xs text-sun font-bold">{checkOutData?.total_wet}</span>
                      </div>
                      <div className="flex gap-1">
                        <span>Drc</span>
                        <span className="text-xs text-sun font-bold">{checkOutData?.drc} %</span>
                      </div>
                      <div className="flex gap-1">
                        <span>Dry</span>
                        <span className="text-xs text-sun font-bold">{checkOutData?.total_dry}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-5">
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
              </div>
              <Divider className="mb-0" />
            </div>
          )
        ) : (
          // )
          <div className="flex justify-center">No Data</div>
        )}
      </div>
      <div className="submit-area mt-8">
        <Button isText text="Check-Out" className="w-full font-bold" onClick={() => setIsShowModal(true)} />
      </div>
      <Toast text={alertMessage} onClose={() => setIsSubmitted(false)} isShow={isSubmitted} isSuccess={isSuccess} />
      {isShowModal === true ? <Modal setIsShowModal={() => setIsShowModal(false)} /> : null}
    </div>
  );
}

export default CheckOut;
