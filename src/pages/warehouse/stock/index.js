import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Button from '../../../components/button/Button';
import DropDown from '../../../components/forms/Dropdown';
import Divider from '../../../components/ui/Divider';
import Toast from '../../../components/ui/Toast';

const url = process.env.REACT_APP_API_URL;

function Dropdown(props) {
  return (
    <div className={`${props.customClass} w-full`}>
      <h2 className="text-left mb-1">{props.title}</h2>
      <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
    </div>
  );
}

function Stock(props) {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const navigate = useNavigate();
  const [openedId, setOpenedId] = React.useState();
  const [photos, setPhotos] = React.useState([]);
  const [payload, setPayload] = React.useState({});
  const [isNoData, setIsNoData] = React.useState(true);
  const [selectedId, setSelectedId] = React.useState('');
  const [stockData, setStockData] = React.useState([]);
  const [gudangList, setGudangList] = React.useState([]);
  const [materialList, setMaterialList] = React.useState([]);
  const [warehouseList, setWarehouseList] = React.useState([]);
  const [selectedGudang, setSelectedGudang] = React.useState('');
  const [selectedMaterial, setSelectedMaterial] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState([]);
  const [isEditWet, setIsEditWet] = React.useState(false);
  const [isEditDrc, setIsEditDrc] = React.useState(false);
  const [isEditDry, setIsEditDry] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  React.useEffect(() => {
    // getGudang();
    getMaterial();
    getWarehouse();
  }, []);

  React.useEffect(() => {
    if (selectedGudang !== '' && selectedMaterial !== '') {
      getStock(selectedGudang, selectedMaterial);
    }
  }, [selectedGudang, selectedMaterial]);

  const getWarehouse = (id) => {
    axios
      .get(`${url}/warehouse/list?include=wilayah_tugas,gudang`, {
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
      .get(`${url}/bahan-baku/list`, {
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
      .get(`${url}/gudang/list?filter[warehouse]=${val}`, {
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

  const getStock = (gudang_id, bahan_baku_id) => {
    axios
      .get(`${url}/warehouse/stock-in/list?filter[gudang]=${gudang_id}&filter[jenis_bahan_baku]=${bahan_baku_id}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data;
        setStockData(data);
        setIsNoData(false);
        setStockData(data?.data);
      });
  };

  const onSelectPhoto = (e) => {
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('path', 'public/stock/gudang');
    void uploadPhoto(formData);
  };

  const uploadPhoto = async (formData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'image/jpeg',
        Accept: 'application/json',
      },
    };
    await axios
      .post(
        `${url}/upload-foto
        `,
        formData,
        config
      )
      .then((res) => {
        const data = res?.data?.data;
        setPhotos([...photos, data?.path]);
        setPayload({
          ...payload,
          foto: [...photos, data?.path],
        });
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

  const onEditWet = () => {
    setPayload((prev) => ({
      ...prev,
      mode: 'total_wet',
    }));
    setIsEditWet(true);
    setIsEditDrc(false);
    setIsEditDry(false);
  };

  const onEditDrc = () => {
    setPayload((prev) => ({
      ...prev,
      mode: 'drc',
    }));
    setIsEditWet(false);
    setIsEditDrc(true);
    setIsEditDry(false);
  };

  const onEditDry = () => {
    setPayload((prev) => ({
      ...prev,
      mode: 'total_dry',
    }));
    setIsEditWet(false);
    setIsEditDrc(false);
    setIsEditDry(true);
  };

  const onChangeHandler = (e) => {
    setPayload((prev) => ({
      ...prev,
      value: e.target.value,
    }));
  };

  const onExpand = (idx, id) => {
    setIsEditDrc(false);
    setIsEditDry(false);
    setIsEditWet(false);
    setPhotos([]);
    setSelectedId(id);
    setOpenedId(idx + 1);
  };

  const onCollapse = () => {
    setIsEditDrc(false);
    setIsEditDry(false);
    setIsEditWet(false);
    setPhotos([]);
    setOpenedId(0);
  };

  const onCheckItem = (e, id) => {
    if (!selectedItem.includes(id)) {
      setSelectedItem([...selectedItem, id]);
    } else {
      setSelectedItem(selectedItem.filter((val) => val !== id));
    }
    e.stopPropagation();
  };

  const handleSave = async (total_wet, drc, total_dry) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    };
    if (payload?.mode === 'total_wet' && payload?.value < total_dry) {
      setIsSubmitted(true);
      setIsSuccess(false);
      setIsButtonDisabled(true);
      setAlertMessage('Total wet tidak boleh lebih kecil dari total dry');
      setTimeout(() => {
        setIsButtonDisabled(false);
        setIsSubmitted(false);
      }, 3000);
    } else if (payload?.mode === 'total_dry' && payload?.value > total_wet) {
      setIsSubmitted(true);
      setIsSuccess(false);
      setIsButtonDisabled(true);
      setAlertMessage('Total dry tidak boleh lebih besar dari total wet');
      setTimeout(() => {
        setIsButtonDisabled(false);
        setIsSubmitted(false);
      }, 3000);
    } else if (payload?.mode === 'total_wet' && payload?.value === '0') {
      setIsSubmitted(true);
      setIsSuccess(false);
      setIsButtonDisabled(true);
      setAlertMessage('Total wet tidak boleh 0!');
      setTimeout(() => {
        setIsButtonDisabled(false);
        setIsSubmitted(false);
      }, 3000);
    } else {
      await axios
        .put(
          `${url}/warehouse/stock-in/update/${selectedId}
          `,
          payload,
          config
        )
        .then(() => {
          setIsSuccess(true);
          setAlertMessage('Sukses mengupdate data!');
          setIsSubmitted(true);
          setIsButtonDisabled(true);
          setTimeout(() => {
            setIsButtonDisabled(false);
            setIsSubmitted(false);
            getStock(selectedGudang, selectedMaterial);
          }, 3000);
        });
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
        `${url}/warehouse/gabung-stock-sales
          `,
        {
          gudang_id: selectedGudang,
          wh_stock_in_id: selectedItem,
        },
        config
      )
      .then((res) => {
        const stock_sales_id = res?.data?.data?.stock_sales_id;
        setIsSuccess(true);
        setAlertMessage('Sukses keluarkan stock!');
        setIsSubmitted(true);
        setIsButtonDisabled(true);
        setTimeout(() => {
          setIsButtonDisabled(false);
          setIsSubmitted(false);
          getStock(selectedGudang, selectedMaterial);
          localStorage.setItem('saved_tab', 'check-out');
          localStorage.setItem('check-out-value', stock_sales_id);
        }, 3000);
      })
      .catch((err) => {
        console.error(err.message);
      });
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
        <p className="text-sm font-bold">Daftar Stock di Gudang</p>
        <DropDown option={materialList} defaultValue={'Pilih jenis bahan baku'} onChange={(e) => onChangeMaterial(e)} />
      </div>
      <div className="mt-7">
        {stockData?.length > 0 ? (
          stockData?.map((res, idx) =>
            openedId === idx + 1 ? (
              <div className="bg-white">
                <div
                  className="flex justify-between items-center transition-transform cursor-pointer pt-3 pl-3 pr-3"
                  onClick={() => onCollapse(idx)}
                >
                  <div className="flex items-center">
                    <input
                      checked={selectedItem.includes(res?.id)}
                      onClick={(e) => onCheckItem(e, res?.id)}
                      type="checkbox"
                      className="accent-flora scale-150 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 mr-3"
                    />
                    <div>
                      <p className="font-bold">{res?.kode}</p>
                      <div className="flex justify-center gap-3">
                        <div className="flex gap-1">
                          <span>Wet</span>
                          <span className="text-xs text-sun font-bold">{res?.total_wet}</span>
                        </div>
                        <div className="flex gap-1">
                          <span>DRC</span>
                          <span className="text-xs text-sun font-bold">{res?.drc}</span>
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
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.250621 0.0284527C0.235421 0.0436107 0.222996 0.910224 0.222996 1.95426V3.85244H0.88564H1.54828V2.58928V1.32612H2.81145H4.07461V0.663472V0.000828481H2.17643C1.13239 0.000828481 0.265779 0.0132534 0.250621 0.0284527ZM10.3697 0.663058V1.32612H11.6329H12.8961V2.58928V3.85244H13.5591H14.2222L14.2114 1.93699L14.2006 0.0215361L12.2852 0.0107684L10.3697 0V0.663058ZM2.76361 2.5911C2.75446 2.61492 2.75218 3.47221 2.75852 4.4962L2.77003 6.35806L4.6859 6.36883L6.60177 6.3796L6.591 4.47322L6.58023 2.56687L4.68023 2.55735C3.38965 2.55093 2.77488 2.56174 2.76361 2.5911ZM7.86067 2.56513C7.85118 2.57462 7.8434 3.43655 7.8434 4.48059V6.37877H9.74663H11.6498L11.674 6.24417C11.6872 6.17012 11.6927 5.31179 11.6862 4.33671L11.6743 2.56385L9.77612 2.55586C8.73213 2.55147 7.87015 2.55565 7.86067 2.56513ZM5.31707 4.47367V5.0949H4.69584H4.07461V4.47367V3.85244H4.69584H5.31707V4.47367ZM10.3697 4.47367V5.0949H9.7485H9.12727V4.47367V3.85244H9.7485H10.3697V4.47367ZM2.76084 9.52633C2.76589 10.5741 2.78403 11.4314 2.80109 11.4314C2.81816 11.4314 3.68013 11.4314 4.71655 11.4314H6.60094V9.52633V7.62123H4.67629H2.75164L2.76084 9.52633ZM7.8434 8.26316V8.9051H8.48533H9.12727V9.52633V10.1476H8.48533H7.8434V10.7895C7.8434 11.4272 7.84402 11.4314 7.93658 11.4327C8.15852 11.4356 8.98873 11.4367 9.05479 11.4342C9.12048 11.4317 9.12727 11.3732 9.12727 10.8102V10.189H9.74742H10.3676L10.379 10.8113L10.3904 11.4337L11.0214 11.4385L11.6524 11.4434L11.6633 10.1742L11.6743 8.90506L10.4008 8.9051H9.12727V8.26316V7.62123H8.48533H7.8434V8.26316ZM5.31707 9.52633V10.1476H4.69584H4.07461V9.52633V8.9051H4.69584H5.31707V9.52633ZM0.232936 12.063L0.243704 13.9785L2.15916 13.9892L4.07461 14V13.3369V12.6739H2.81145H1.54828V11.4107V10.1476H0.885226H0.222168L0.232936 12.063ZM12.8961 11.4107V12.6739H11.6329H10.3697V13.3369V14L12.2852 13.9892L14.2006 13.9785L14.2114 12.063L14.2222 10.1476H13.5591H12.8961V11.4107Z"
                            fill="#332919"
                          />
                        </svg>
                      }
                      isText={false}
                      className="bg-white text-black shadow m-0"
                      onClick={() => navigate(`/warehouse/stock/${res?.id}/qr`)}
                    />
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
                <div className="mt-5 pl-3 pr-3 pb-3">
                  <div className="input-section">
                    <div className="flex justify-between items-center my-2">
                      <p className="font-bold">Total Wet</p>
                      <div className="flex gap-3">
                        <div className="relative">
                          <span className="absolute inset-y-4 right-2">kg</span>
                          <input
                            className={`rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline ${
                              isEditWet ? 'border border-flora' : ''
                            }`}
                            type="number"
                            min="0"
                            defaultValue={res?.total_wet}
                            disabled={!isEditWet}
                            onChange={(e) => onChangeHandler(e)}
                          />
                        </div>
                        <Button className="text-xs w-16" isText text="Edit" onClick={onEditWet} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center my-2">
                      <p className="font-bold">DRC</p>
                      <div className="flex gap-3">
                        <div className="relative">
                          <span className="absolute inset-y-4 right-2">%</span>
                          <input
                            className={`rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline ${
                              isEditDrc ? 'border border-flora' : ''
                            }`}
                            type="number"
                            min="0"
                            defaultValue={res?.drc}
                            disabled={!isEditDrc}
                            onChange={(e) => onChangeHandler(e)}
                          />
                        </div>

                        <Button className="text-xs w-16" isText text="Edit" onClick={onEditDrc} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center my-2">
                      <p className="font-bold">Total Dry</p>
                      <div className="flex gap-3">
                        <div className="relative">
                          <span className="absolute inset-y-4 right-2">kg</span>
                          <input
                            className={`rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline ${
                              isEditDry ? 'border border-flora' : ''
                            }`}
                            type="number"
                            min="0"
                            defaultValue={res?.total_dry}
                            disabled={!isEditDry}
                            onChange={(e) => onChangeHandler(e)}
                          />
                        </div>
                        <Button className="text-xs w-16" isText text="Edit" onClick={onEditDry} />
                      </div>
                    </div>
                  </div>
                  <div className="photo-area mt-3">
                    <div className="photos-container overflow-x-auto flex gap-3">
                      {res?.foto?.map((res, idx) => (
                        <img
                          width="200"
                          alt={`photo_${idx + 1}`}
                          src={res.includes('/storage') ? res : `${'https://jop.dudyali.com/storage/'}${res}`}
                          className="rounded-xl"
                        />
                      ))}
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
                  <div className="mt-3">
                    <label
                      htmlFor="file-upload"
                      className="w-full rounded-lg bg-flora text-white font-bold p-3 block text-center flex justify-center items-center gap-2 cursor-pointer"
                    >
                      <svg
                        className="block"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.889 8.00052C13.9141 8.00052 15.5557 9.64212 15.5557 11.6672C15.5557 13.6922 13.9141 15.3338 11.889 15.3338C9.86393 15.3338 8.22233 13.6922 8.22233 11.6672C8.22233 9.64212 9.86393 8.00052 11.889 8.00052ZM11.889 9.33332L11.8291 9.33865C11.693 9.36338 11.5857 9.47065 11.5611 9.60672L11.5557 9.66665L11.5554 11.3333L9.88746 11.3338L9.82753 11.3392C9.69146 11.3639 9.58413 11.4712 9.55946 11.6072L9.55413 11.6672L9.55946 11.727C9.58413 11.8631 9.69146 11.9704 9.82753 11.9951L9.88746 12.0005L11.5561 12L11.5564 13.6694L11.5618 13.7294C11.5865 13.8654 11.6937 13.9727 11.8298 13.9974L11.8897 14.0028L11.9497 13.9974C12.0857 13.9727 12.193 13.8654 12.2177 13.7294L12.2231 13.6694L12.2228 12L13.8921 12.0005L13.9519 11.9951C14.088 11.9704 14.1953 11.8631 14.22 11.727L14.2254 11.6672L14.22 11.6072C14.1953 11.4712 14.088 11.3639 13.9519 11.3392L13.8921 11.3338L12.2221 11.3333L12.2223 9.66665L12.2169 9.60672C12.1923 9.47065 12.085 9.36338 11.9489 9.33865L11.889 9.33332ZM9.50546 1.66919C10.0373 1.66919 10.5295 1.95084 10.7988 2.40944L11.3419 3.33382H12.7223C13.9189 3.33382 14.889 4.30387 14.889 5.50049L14.8895 8.54072C14.5934 8.25645 14.257 8.01385 13.8897 7.82232L13.889 5.50049C13.889 4.85616 13.3667 4.33382 12.7223 4.33382H11.0557C10.8784 4.33382 10.7143 4.23994 10.6245 4.08707L9.9366 2.91594C9.8468 2.76307 9.68273 2.66919 9.50546 2.66919H6.9706C6.82161 2.66919 6.6818 2.7355 6.58762 2.84772L6.5445 2.90756L5.81508 4.09546C5.72414 4.24356 5.5628 4.33382 5.389 4.33382H3.72233C3.078 4.33382 2.55566 4.85616 2.55566 5.50049V11.8338C2.55566 12.4782 3.078 13.0005 3.72233 13.0005L7.76453 13.0001C7.87946 13.3559 8.03913 13.6917 8.23693 14.0007L3.72233 14.0005C2.52571 14.0005 1.55566 13.0304 1.55566 11.8338V5.50049C1.55566 4.30387 2.52571 3.33382 3.72233 3.33382H5.10928L5.69233 2.38429C5.96516 1.93996 6.44917 1.66919 6.9706 1.66919H9.50546ZM8.22233 5.33382C9.55686 5.33382 10.6879 6.20518 11.0774 7.40998C10.7437 7.47292 10.4238 7.57432 10.1221 7.70918C9.8604 6.91045 9.10873 6.33382 8.22233 6.33382C7.11773 6.33382 6.22233 7.22925 6.22233 8.33385C6.22233 9.28672 6.88876 10.084 7.781 10.285C7.67606 10.5961 7.60553 10.9242 7.5742 11.2636C6.22896 10.9675 5.22233 9.76818 5.22233 8.33385C5.22233 6.67698 6.56548 5.33382 8.22233 5.33382Z"
                          fill="#F2F5F7"
                        />
                      </svg>
                      Tambah Foto
                    </label>
                    <input id="file-upload" type="file" onChange={onSelectPhoto} style={{ display: 'none' }} />
                  </div>
                  <div className="button-area flex mt-5 gap-2">
                    <Button isText isBack text="Batalkan" className="w-full" onClick={() => onCollapse()} />
                    <Button
                      isText
                      text="Simpan"
                      className="w-full"
                      onClick={() => handleSave(res?.total_wet, res?.drc, res?.total_dry)}
                      disabled={isButtonDisabled}
                    />
                  </div>
                </div>
                <Divider className="mb-0" />
              </div>
            ) : (
              <div>
                <div
                  className="flex justify-between items-center transition-transform cursor-pointer pt-3 pl-3 pr-3"
                  onClick={() => onExpand(idx, res?.id)}
                >
                  <div className="flex items-center">
                    <input
                      checked={selectedItem.includes(res?.id)}
                      onClick={(e) => onCheckItem(e, res?.id)}
                      type="checkbox"
                      className="accent-flora scale-150 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 mr-3"
                    />
                    <div>
                      <p className="font-bold">{res?.kode}</p>
                      <div className="flex justify-center gap-3">
                        <div className="flex gap-1">
                          <span>Wet</span>
                          <span className="text-xs text-sun font-bold">{res?.total_wet}</span>
                        </div>
                        <div className="flex gap-1">
                          <span>DRC</span>
                          <span className="text-xs text-sun font-bold">{res?.drc}</span>
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
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.250621 0.0284527C0.235421 0.0436107 0.222996 0.910224 0.222996 1.95426V3.85244H0.88564H1.54828V2.58928V1.32612H2.81145H4.07461V0.663472V0.000828481H2.17643C1.13239 0.000828481 0.265779 0.0132534 0.250621 0.0284527ZM10.3697 0.663058V1.32612H11.6329H12.8961V2.58928V3.85244H13.5591H14.2222L14.2114 1.93699L14.2006 0.0215361L12.2852 0.0107684L10.3697 0V0.663058ZM2.76361 2.5911C2.75446 2.61492 2.75218 3.47221 2.75852 4.4962L2.77003 6.35806L4.6859 6.36883L6.60177 6.3796L6.591 4.47322L6.58023 2.56687L4.68023 2.55735C3.38965 2.55093 2.77488 2.56174 2.76361 2.5911ZM7.86067 2.56513C7.85118 2.57462 7.8434 3.43655 7.8434 4.48059V6.37877H9.74663H11.6498L11.674 6.24417C11.6872 6.17012 11.6927 5.31179 11.6862 4.33671L11.6743 2.56385L9.77612 2.55586C8.73213 2.55147 7.87015 2.55565 7.86067 2.56513ZM5.31707 4.47367V5.0949H4.69584H4.07461V4.47367V3.85244H4.69584H5.31707V4.47367ZM10.3697 4.47367V5.0949H9.7485H9.12727V4.47367V3.85244H9.7485H10.3697V4.47367ZM2.76084 9.52633C2.76589 10.5741 2.78403 11.4314 2.80109 11.4314C2.81816 11.4314 3.68013 11.4314 4.71655 11.4314H6.60094V9.52633V7.62123H4.67629H2.75164L2.76084 9.52633ZM7.8434 8.26316V8.9051H8.48533H9.12727V9.52633V10.1476H8.48533H7.8434V10.7895C7.8434 11.4272 7.84402 11.4314 7.93658 11.4327C8.15852 11.4356 8.98873 11.4367 9.05479 11.4342C9.12048 11.4317 9.12727 11.3732 9.12727 10.8102V10.189H9.74742H10.3676L10.379 10.8113L10.3904 11.4337L11.0214 11.4385L11.6524 11.4434L11.6633 10.1742L11.6743 8.90506L10.4008 8.9051H9.12727V8.26316V7.62123H8.48533H7.8434V8.26316ZM5.31707 9.52633V10.1476H4.69584H4.07461V9.52633V8.9051H4.69584H5.31707V9.52633ZM0.232936 12.063L0.243704 13.9785L2.15916 13.9892L4.07461 14V13.3369V12.6739H2.81145H1.54828V11.4107V10.1476H0.885226H0.222168L0.232936 12.063ZM12.8961 11.4107V12.6739H11.6329H10.3697V13.3369V14L12.2852 13.9892L14.2006 13.9785L14.2114 12.063L14.2222 10.1476H13.5591H12.8961V11.4107Z"
                            fill="#332919"
                          />
                        </svg>
                      }
                      isText={false}
                      className="bg-white text-black shadow m-0"
                      onClick={() => navigate(`/warehouse/stock/${res?.id}/qr`)}
                    />
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
          )
        ) : (
          <div className="flex justify-center">No Data</div>
        )}
      </div>
      <div className="submit-area mt-8">
        <Button
          isText
          text="Keluarkan Stock"
          className="w-full font-bold"
          onClick={handleSubmit}
          disabled={isButtonDisabled || stockData?.length === 0 || selectedItem?.length === 0}
        />
      </div>
      <Toast text={alertMessage} onClose={() => setIsSubmitted(false)} isShow={isSubmitted} isSuccess={isSuccess} />
    </div>
  );
}

export default Stock;
