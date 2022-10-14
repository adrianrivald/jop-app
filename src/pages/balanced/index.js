import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import FlatButton from '../../components/button/flat';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import moment from 'moment';
import Toast from '../../components/ui/Toast';
import DropDown from '../../components/forms/Dropdown';

const url = process.env.REACT_APP_API_URL;

const Balanced = () => {
  const [showDetail, setShowDetail] = useState(false);
  const user = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [weighingList, setWeighingList] = React.useState([]);
  const [weighingHistory, setWeighingHistory] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [toastText, setToastText] = React.useState('');
  const [openedId, setOpenedId] = React.useState({});

  React.useEffect(() => {
    getWeighing();
    getWeighingHistory();
  }, []);

  const getWeighing = () => {
    axios
      .get(`${url}penimbangan/list?include=tph,divisi,petugas_penimbang`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        setWeighingList(data);
      });
  };

  const getWeighingHistory = (sort) => {
    axios
      .get(
        `${url}penimbangan/riwayat/by-penimbang?include=tph,divisi,petugas_penimbang&sort=${
          !sort || sort === 'asc' ? '-' : ''
        }tanggal_penimbangan&filter[penimbang]=${user?.id}`,
        {
          url: process.env.REACT_APP_API_URL,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      )
      .then((res) => {
        const data = res.data.data.data;
        setWeighingHistory(data);
      });
  };

  const onDoneWeighing = (id) => {
    axios
      .get(`${url}penimbangan/selesai/${id}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        setToastText(res?.data?.message);
        setIsSubmitted(true);
        setIsButtonDisabled(true);
        setTimeout(() => {
          setIsButtonDisabled(false);
          setIsSubmitted(false);
        }, 3000);
      });
  };

  const chevronDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-3 h-3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );

  const chevronRight = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );

  const iconAdd = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );

  const handleAddBalanced = () => {
    navigate(`/weighing/add`);
  };

  const onCopyCode = (weighing_code) => {
    navigator.clipboard.writeText(weighing_code);
    setToastText('Text disalin');
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
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

  const onSort = (e) => {
    getWeighingHistory(e.target.value);
  };

  return (
    <div className="App">
      <Header title="Penimbangan TPH" isWithBack to="/homepage" />
      <section className="container p-4">
        <h1 className="text-left mb-2">Mulai Penimbangan Baru</h1>
        <FlatButton
          role="white"
          className={'w-full mb-4 text-sm flex justify-center'}
          text={iconAdd}
          onClick={handleAddBalanced}
        />
        <h1 className="font-bold text-left mb-2">Penimbangan yang berlangsung</h1>
        {weighingList.map((res, idx) =>
          res?.detail?.length > 0 ? (
            <>
              <div className="flex justify-between mb-6">
                <div className="flex flex-col items-start">
                  <p className="text-xs">
                    {moment(res?.tanggal_penimbangan, 'YYYY-MM-DD hh:mm:ss').format('DD MMMM YYYY, hh:mm')}
                  </p>
                  <p className="text-sm font-bold">{res?.kode}</p>
                </div>
                <button
                  className="text-xs font-bold px-4 py-1 text-flora drop-shadow-md bg-white rounded-xl"
                  onClick={() => onCopyCode(res?.kode)}
                >
                  Salin Kode
                </button>
              </div>
              <div className="flex flex-col">
                {res?.detail?.map((res, idx) => (
                  <div className="flex justify-between items-center">
                    <div className="flex-1 text-left">
                      {' '}
                      {res?.kode} - <b>{res?.nama}</b>{' '}
                    </div>
                    <div className="flex-1 text-right">
                      {' '}
                      <b>{res?.berat_total}</b> kg{' '}
                    </div>
                  </div>
                ))}
              </div>
              <FlatButton
                className={'w-full mb-4 text-sm flex justify-center mt-6'}
                text="Selesai"
                onClick={() => onDoneWeighing(res?.id)}
                disabled={isButtonDisabled}
              />
            </>
          ) : null
        )}
        <div className="border-b border-flora" />
        <div className="flex justify-between my-5">
          <h1 className="font-black">Riwayat</h1>
          <DropDown
            onChange={onSort}
            option={[
              { label: 'Terbaru', value: 'asc' },
              { label: 'Terlama', value: 'desc' },
            ]}
          />
        </div>
        {/* <div className="flex flex-col justify-center items-center">
                    <div className="w-full flex justify-between items-center py-3 border-b border-flora cursor-pointer" onClick={() => { setShowDetail(!showDetail) }}>
                        <div className="flex flex-col justify-start">
                            <div className="text-xs">10 Februari 2023, 15:00</div>
                            <h1 className="text-sm font-bold text-left">TP1-01/02-12</h1>
                        </div>
                        {showDetail ? chevronDown : chevronRight}
                    </div>
                    <div className={`flex flex-col w-full p-2 ${showDetail ? 'block' : 'hidden'} transition ease-in-out`}>
                        <div className="flex justify-between items-center">
                            <div className="flex-1 text-left"> P1 - <b>Slab</b> </div>
                            <div className="flex-1"> <b>0</b> kg </div>
                            <div className="flex-1 font-bold text-right"> Menimbang </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex-1 text-left"> P2 - <b>Cup Lump</b> </div>
                            <div className="flex-1"> <b>31</b> kg </div>
                            <div className="flex-1 font-bold text-right"> Menimbang </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex-1 text-left"> P3 - <b>Latek</b> </div>
                            <div className="flex-1"> <b>4</b> kg </div>
                            <div className="flex-1 font-bold text-right"> Menimbang </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex-1 text-left"> P4 - <b>Tree Leace</b> </div>
                            <div className="flex-1"> <b>12</b> kg </div>
                            <div className="flex-1 font-bold text-right"> Selesai </div>
                        </div>
                    </div>
                </div> */}
        <div className={`accordion divide-y divide-cloud`}>
          {weighingHistory?.length > 0 ? (
            weighingHistory?.map((res, idx) =>
              openedId[`item_${idx}`] === true ? (
                <div className="bg-white divide-y divide-cloud">
                  <div
                    className="flex justify-between items-center p-3 transition-transform cursor-pointer"
                    onClick={() => onCollapse(idx)}
                  >
                    <div className="flex flex-col justify-start">
                      <div className="text-xs">
                        {moment(res?.tanggal_penimbangan, 'YYYY-MM-DD hh:mm:ss').format('DD MMMM YYYY, hh:mm')}
                      </div>
                      <h1 className="text-sm font-bold text-left">{res?.kode}</h1>
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
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className=" p-3 ">
                    {res?.detail?.length > 0 ? (
                      res?.detail?.map((res, idx) => (
                        <>
                          <div className="flex justify-between items-center mt-3 w-full">
                            <p>
                              {res?.kode} - <span className="font-bold">{res?.nama}</span>
                            </p>
                            <p className="font-bold text-right">{res?.berat_total} kg</p>
                          </div>
                        </>
                      ))
                    ) : (
                      <div className="flex justify-center">No Data</div>
                    )}
                    {/* <div className='flex justify-center mt-3'>
                                                    <Button isText text="Lihat Detail" onClick={() => onClickDetail(res?.tapper?.id, res?.id, res?.detail, weighingDetail?.transaction[idx])}/>
                                                </div> */}
                  </div>
                </div>
              ) : (
                <div
                  className="flex justify-between items-center p-3 transition-transform cursor-pointer"
                  onClick={() => onExpand(idx)}
                >
                  <div className="flex flex-col justify-start">
                    <div className="text-xs">
                      {moment(res?.tanggal_penimbangan, 'YYYY-MM-DD hh:mm:ss').format('DD MMMM YYYY, hh:mm')}
                    </div>
                    <h1 className="text-sm font-bold text-left">{res?.kode}</h1>
                  </div>
                  <div className="cursor-pointer">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002"
                        stroke="#A7A29A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="flex justify-center">No Data</div>
          )}
        </div>
        <FlatButton
          role="white"
          className="mt-10 mb-3 w-full"
          text="Kembali ke atas"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        />
      </section>
      <Toast text={toastText} onClose={() => setIsSubmitted(false)} isShow={isSubmitted} />
    </div>
  );
};

export default Balanced;
