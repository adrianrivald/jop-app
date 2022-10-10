import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import DropDown from '../../../components/forms/Dropdown';
import Divider from '../../../components/ui/Divider';

function CheckOut(props) {
  const navigate = useNavigate();
  const [openedId, setOpenedId] = React.useState({});
  const [photos, setPhotos] = React.useState([]);
  const [payload, setPayload] = React.useState({});
  const [stockData, setStockData] = React.useState([
    {
      status: 'Perjalanan',
      date: 'Rabu, 12 Februari 2022, 15:37',
      code: 'TP1-01/02-12/B.007/P1',
      detail: {
        jenis_logistik: 'Ojek - Motor (120 Kg)',
        armada: 'B 3355 QPR  -  01',
        alamat: 'Gudang Induk - WH1 - G1',
        supir: 'Aji Kuntara / 02887 - PKWT',
        pengawal: 'Sumber Wono / 02887 - PKWT',
      },
      foto: [],
    },
    {
      status: 'Perjalanan',
      date: 'Kamis, 12 Februari 2022, 15:37',
      code: 'TP1-01/02-12/B.007/P2',
      detail: {
        jenis_logistik: 'Ojek - Motor (114 Kg)',
        armada: 'B 155 QPR  -  01',
        alamat: 'Gudang Induk - WH1 - G1',
        supir: 'Aji Kuntara / 02887 - PKWT',
        pengawal: 'Sumber Wono / 02887 - PKWT',
      },
      foto: [],
    },
    {
      status: 'Perjalanan',
      date: 'Jumat, 12 Februari 2022, 15:37',
      code: 'TP1-01/02-12/B.007/P2',
      detail: {
        jenis_logistik: 'Ojek - Motor (114 Kg)',
        armada: 'B 155 QPR  -  01',
        alamat: 'Gudang Induk - WH1 - G1',
        supir: 'Aji Kuntara / 02887 - PKWT',
        pengawal: 'Sumber Wono / 02887 - PKWT',
      },
      foto: [],
    },
  ]);
  const onSelectPhoto = (e) => {
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('path', 'public/logistik/kirim');
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
        `${url}upload-foto
        `,
        formData,
        config
      )
      .then((res) => {
        const data = res?.data?.data;
        setPhotos([...photos, data?.path]);
        setPayload({
          ...payload,
          path_foto: [...photos, data?.path],
        });
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

  const onCheckMaterial = (e) => {
    e.stopPropagation();
    // TODO
  };

  const handleSubmit = () => {
    //
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm font-bold">Daftar Order Sales</p>
        <DropDown option={[]} defaultValue="Jumlah Timbangan" />
      </div>
      <div className="mt-7">
        {stockData?.length > 0 ? (
          stockData?.map((res, idx) =>
            openedId[`item_${idx}`] === true ? (
              <div className="bg-white">
                <div
                  className="flex justify-between items-center transition-transform cursor-pointer pt-3 pl-3 pr-3"
                  onClick={() => onCollapse(idx)}
                >
                  <div className="flex items-center">
                    <input
                      checked={(prev) => !prev}
                      onClick={onCheckMaterial}
                      type="checkbox"
                      className="accent-flora scale-150 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 mr-3"
                    />
                    <div>
                      <p className="font-bold">{res?.code}</p>
                      <div className="flex justify-center gap-3">
                        <div className="flex gap-1">
                          <span>Wet</span>
                          <span className="text-xs text-sun font-bold">1348</span>
                        </div>
                        <div className="flex gap-1">
                          <span>Wet</span>
                          <span className="text-xs text-sun font-bold">1348</span>
                        </div>
                        <div className="flex gap-1">
                          <span>Wet</span>
                          <span className="text-xs text-sun font-bold">1348</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Button
                      isIcon
                      icon={
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5.889 2.83333H8.55566C8.55566 2.09695 7.95873 1.5 7.22233 1.5C6.48593 1.5 5.889 2.09695 5.889 2.83333ZM4.889 2.83333C4.889 1.54467 5.93366 0.5 7.22233 0.5C8.511 0.5 9.55566 1.54467 9.55566 2.83333H13.389C13.6651 2.83333 13.889 3.05719 13.889 3.33333C13.889 3.60947 13.6651 3.83333 13.389 3.83333H12.5096L11.7283 11.9075C11.6043 13.1889 10.5273 14.1667 9.23986 14.1667H5.20479C3.91736 14.1667 2.84043 13.1889 2.71642 11.9075L1.93505 3.83333H1.05566C0.779524 3.83333 0.555664 3.60947 0.555664 3.33333C0.555664 3.05719 0.779524 2.83333 1.05566 2.83333H4.889ZM6.22233 6C6.22233 5.72386 5.99846 5.5 5.72233 5.5C5.44619 5.5 5.22233 5.72386 5.22233 6V11C5.22233 11.2761 5.44619 11.5 5.72233 11.5C5.99846 11.5 6.22233 11.2761 6.22233 11V6ZM8.72233 5.5C8.99846 5.5 9.22233 5.72386 9.22233 6V11C9.22233 11.2761 8.99846 11.5 8.72233 11.5C8.4462 11.5 8.22233 11.2761 8.22233 11V6C8.22233 5.72386 8.4462 5.5 8.72233 5.5ZM3.71177 11.8111C3.78618 12.58 4.43233 13.1667 5.20479 13.1667H9.23986C10.0123 13.1667 10.6585 12.58 10.7329 11.8111L11.5049 3.83333H2.93972L3.71177 11.8111Z"
                            fill="#332919"
                          />
                        </svg>
                      }
                      isText={false}
                      className="bg-white text-black shadow m-0"
                      onClick={() => navigate(`scan`)}
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
                  <div className="table-check-out">
                    <div className="flex justify-between items-center my-2">
                      <div className="w-4/12" />
                      <div className="w-1/12">Wet</div>
                      <div className="w-1/12">DRC</div>
                      <div className="w-1/12">Dry</div>
                      <div className="w-1/12 " />
                    </div>
                    <div className="flex justify-between items-center my-2">
                      <div className="w-4/12">
                        P1 - <b>Slab</b>
                      </div>
                      <div className="w-1/12">100</div>
                      <div className="w-1/12">92%</div>
                      <div className="w-1/12">8</div>
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
                          onClick={() => navigate(`scan`)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center my-2">
                      <div className="w-4/12">
                        P1 - <b>Slab</b>
                      </div>
                      <div className="w-1/12">100</div>
                      <div className="w-1/12">92%</div>
                      <div className="w-1/12">8</div>
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
                          onClick={() => navigate(`scan`)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center my-2">
                      <div className="w-4/12">
                        P1 - <b>Slab</b>
                      </div>
                      <div className="w-1/12">100</div>
                      <div className="w-1/12">92%</div>
                      <div className="w-1/12">8</div>
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
                          onClick={() => navigate(`scan`)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center my-2">
                      <div className="w-4/12">
                        P1 - <b>Slab</b>
                      </div>
                      <div className="w-1/12">100</div>
                      <div className="w-1/12">92%</div>
                      <div className="w-1/12">8</div>
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
                          onClick={() => navigate(`scan`)}
                        />
                      </div>
                    </div>
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
                      checked={(prev) => !prev}
                      onClick={onCheckMaterial}
                      type="checkbox"
                      className="accent-flora scale-150 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 mr-3"
                    />
                    <div>
                      <p className="font-bold">{res?.code}</p>
                      <div className="flex justify-center gap-3">
                        <div className="flex gap-1">
                          <span>Wet</span>
                          <span className="text-xs text-sun font-bold">1348</span>
                        </div>
                        <div className="flex gap-1">
                          <span>Wet</span>
                          <span className="text-xs text-sun font-bold">1348</span>
                        </div>
                        <div className="flex gap-1">
                          <span>Wet</span>
                          <span className="text-xs text-sun font-bold">1348</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Button
                      isIcon
                      icon={
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5.889 2.83333H8.55566C8.55566 2.09695 7.95873 1.5 7.22233 1.5C6.48593 1.5 5.889 2.09695 5.889 2.83333ZM4.889 2.83333C4.889 1.54467 5.93366 0.5 7.22233 0.5C8.511 0.5 9.55566 1.54467 9.55566 2.83333H13.389C13.6651 2.83333 13.889 3.05719 13.889 3.33333C13.889 3.60947 13.6651 3.83333 13.389 3.83333H12.5096L11.7283 11.9075C11.6043 13.1889 10.5273 14.1667 9.23986 14.1667H5.20479C3.91736 14.1667 2.84043 13.1889 2.71642 11.9075L1.93505 3.83333H1.05566C0.779524 3.83333 0.555664 3.60947 0.555664 3.33333C0.555664 3.05719 0.779524 2.83333 1.05566 2.83333H4.889ZM6.22233 6C6.22233 5.72386 5.99846 5.5 5.72233 5.5C5.44619 5.5 5.22233 5.72386 5.22233 6V11C5.22233 11.2761 5.44619 11.5 5.72233 11.5C5.99846 11.5 6.22233 11.2761 6.22233 11V6ZM8.72233 5.5C8.99846 5.5 9.22233 5.72386 9.22233 6V11C9.22233 11.2761 8.99846 11.5 8.72233 11.5C8.4462 11.5 8.22233 11.2761 8.22233 11V6C8.22233 5.72386 8.4462 5.5 8.72233 5.5ZM3.71177 11.8111C3.78618 12.58 4.43233 13.1667 5.20479 13.1667H9.23986C10.0123 13.1667 10.6585 12.58 10.7329 11.8111L11.5049 3.83333H2.93972L3.71177 11.8111Z"
                            fill="#332919"
                          />
                        </svg>
                      }
                      isText={false}
                      className="bg-white text-black shadow m-0"
                      onClick={() => navigate(`scan`)}
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
        <Button isText text="Check-Out" className="w-full font-bold" onClick={() => navigate('check-in/join')} />
      </div>
    </div>
  );
}

export default CheckOut;
