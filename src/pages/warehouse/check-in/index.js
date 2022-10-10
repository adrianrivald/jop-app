import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import DropDown from '../../../components/forms/Dropdown';
import Divider from '../../../components/ui/Divider';

function CheckIn(props) {
  const navigate = useNavigate();
  const [openedId, setOpenedId] = React.useState({});
  const [checkInData, setCheckInData] = React.useState([
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

  return (
    <div>
      <div className="scan mt-3">
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
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm font-bold">Daftar Barang Sampai</p>
        <DropDown option={[]} defaultValue="Slab(P1)" />
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
                      checked={false}
                      onClick={onCheckMaterial}
                      type="checkbox"
                      className="accent-flora scale-150 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 mr-3"
                    />
                    <p className="font-bold">{res?.code}</p>
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
                        checked={false}
                        onClick={onCheckMaterial}
                        type="checkbox"
                        className="accent-flora scale-150 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 mr-3"
                      />
                      <div
                        onClick={() => navigate('/warehouse/check-in/detail/arrived')}
                        className="cursor-pointer ml-2 rounded-lg p-2 text-xs bg-white shadow focus:outline-none focus:shadow-outline font-bold"
                      >
                        OJ.01-1
                      </div>
                    </div>
                    <p>100</p>
                    <p>92</p>
                    <p>8</p>
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
                    <p className="font-bold">{res?.code}</p>
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
        <Button isText text="Gabungkan" className="w-full font-bold" onClick={() => navigate('check-in/join')} />
      </div>
    </div>
  );
}

export default CheckIn;
