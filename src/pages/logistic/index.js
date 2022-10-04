import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import DatePicker from '../../components/forms/DatePicker';
import DropDown from '../../components/forms/Dropdown';
import Divider from '../../components/ui/Divider';
import Header from '../../components/ui/Header';

const url = process.env.REACT_APP_API_URL;

function Dropdown(props) {
  return (
    <div className={`${props.customClass} w-full`}>
      <h2 className="text-left mb-1">{props.title}</h2>
      <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
    </div>
  );
}

function FilledCircle() {
  return (
    <div className="w-1/4">
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12.2227" cy="12" r="12" fill="#E96E1D" />
      </svg>
    </div>
  );
}

function OutlinedCircle() {
  return (
    <div className="w-1/4">
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12.2227" cy="12" r="11" stroke="#A7A29A" strokeWidth="2" />
      </svg>
    </div>
  );
}
function Logistic() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [tphList, setTphList] = React.useState([]);
  const [selectedTph, setSelectedTph] = React.useState('');
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');
  const [batchReadyToDeliver, setBatchReadyToDeliver] = React.useState([]);
  const [batchOnDelivery, setBatchOnDelivery] = React.useState([]);
  const [batchDelivered, setBatchDelivered] = React.useState([]);

  React.useEffect(() => {
    getTPH();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTPH = () => {
    axios
      .get(`${url}tph/list?include=wilayah_tugas,divisi&sort=kode,nama`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data.data;
        const tphData = data.map((res) => ({
          value: res.id,
          label: res.nama,
        }));
        setTphList(tphData);
      });
  };

  const onChangeTph = (e) => {
    setSelectedTph(e.target.value);
  };

  const onChangePeriod = (e, type) => {
    if (type === 'from') {
      setDateFrom(e.target.value);
    } else {
      setDateTo(e.target.value);
    }
  };

  React.useEffect(() => {
    if (dateFrom && dateTo) {
      getBatchReadyToDeliver();
      getBatchOnDelivery();
      getBatchDelivered();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFrom, dateTo, selectedTph]);

  const getBatchReadyToDeliver = () => {
    axios
      .get(
        `${url}pengiriman/batch-siap-kirim?filter[tph]=${selectedTph}&filter[periode_penimbangan]=${dateFrom.concat(
          ',',
          dateTo
        )}`,
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
        setBatchReadyToDeliver(data);
      });
  };

  const getBatchOnDelivery = () => {
    axios
      .get(
        `${url}pengiriman/batch-dalam-pengiriman?filter[tph]=${selectedTph}&filter[periode_penimbangan]=${dateFrom.concat(
          ',',
          dateTo
        )}`,
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
        setBatchOnDelivery(data);
      });
  };

  const getBatchDelivered = () => {
    axios
      .get(
        `${url}pengiriman/batch-selesai-kirim?filter[tph]=${selectedTph}&filter[periode_penimbangan]=${dateFrom.concat(
          ',',
          dateTo
        )}`,
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
        setBatchDelivered(data);
      });
  };

  const onClickBatch = (id, type) => {
    if (type === 'delivered') {
      localStorage.setItem('delivered', true);
    }
    navigate(`detail/${id}`);
  };

  return (
    <>
      <div className="header">
        <Header title="Logistik" isWithBack />
      </div>
      <div className="container">
        <Dropdown
          title="Masukan kode lokasi awal"
          defaultValue="Pilih kode lokasi awal"
          option={tphList}
          onChange={(e) => onChangeTph(e)}
        />
        <div>
          <h2 className="text-left mt-5 mb-1">Atur Periode</h2>
          <div className="flex justify-between gap-2">
            <div className="flex-auto w-64">
              <DatePicker onChange={(e) => onChangePeriod(e, 'from')} />
            </div>
            <div className="flex-auto w-64">
              <DatePicker onChange={(e) => onChangePeriod(e, 'to')} />
            </div>
          </div>
        </div>
        <Divider />
        <div className="batch mt-5">
          <div className="flex justify-between items-center">
            <div className="w-2/4">
              <p className="font-bold text-xs">Batch siap kirim</p>
            </div>
            {batchReadyToDeliver?.length > 0 && (
              <div className="w-2/4 ml-2">
                <div className="flex gap-6">
                  <p className="w-1/4">P1</p>
                  <p className="w-1/4">P2</p>
                  <p className="w-1/4">P3</p>
                  <p className="w-1/4">P4</p>
                </div>
              </div>
            )}
          </div>
          {batchReadyToDeliver?.length > 0 ? (
            batchReadyToDeliver?.map((res, idx) => (
              <div className="flex justify-between items-center mt-3">
                <div className="w-2/4 cursor-pointer" onClick={() => onClickBatch(res?.id)}>
                  <div className="flex items-center">
                    <span className="font-bold">{res?.kode.split('-')[0]}</span>
                    <div className="cursor-pointer ml-2 rounded-lg p-2 text-xs bg-white shadow focus:outline-none focus:shadow-outline font-bold">
                      {res?.kode.split('/')[1]}-{res?.batch}
                    </div>
                  </div>
                </div>
                <div className="w-2/4">
                  <div className="flex gap-6">
                    {res?.detail?.map((res, idx) => {
                      if (res?.kode === 'P1' || res?.kode === 'P2' || res?.kode === 'P3' || res?.kode === 'P4') {
                        return <FilledCircle />;
                      } else if (res?.kode !== 'P1' || res?.kode !== 'P2' || res?.kode !== 'P3' || res?.kode !== 'P4') {
                        return <OutlinedCircle />;
                      }
                      return <OutlinedCircle />;
                    })}
                    {res?.detail?.length < 4 && <OutlinedCircle />}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="flex justify-center mt-3">No Data</span>
          )}
        </div>
        <Divider />
        <div className="batch mt-5">
          <div className="flex justify-between items-center">
            <div className="w-2/4">
              <p className="font-bold text-xs">Batch sedang dalam pengiriman</p>
            </div>
            {batchOnDelivery?.length > 0 && (
              <div className="w-2/4 ml-2">
                <div className="flex gap-6">
                  <p className="w-1/4">P1</p>
                  <p className="w-1/4">P2</p>
                  <p className="w-1/4">P3</p>
                  <p className="w-1/4">P4</p>
                </div>
              </div>
            )}
          </div>
          {batchOnDelivery?.length > 0 ? (
            batchOnDelivery?.map((res, idx) => (
              <div className="flex justify-between items-center mt-3">
                <div className="w-2/4 cursor-pointer" onClick={() => onClickBatch(res?.id)}>
                  <div className="flex items-center">
                    <span>{res?.kode.split('-')[0]}</span>
                    <div className="cursor-pointer ml-2 rounded-lg p-2 text-xs bg-white shadow focus:outline-none focus:shadow-outline font-bold">
                      {res?.kode.split('/')[1]}-{res?.batch}
                    </div>
                  </div>
                </div>
                <div className="w-2/4">
                  <div className="flex gap-6">
                    {res?.detail?.map((res, idx) => {
                      if (res?.kode === 'P1' || res?.kode === 'P2' || res?.kode === 'P3' || res?.kode === 'P4') {
                        return <FilledCircle />;
                      } else if (res?.kode !== 'P1' || res?.kode !== 'P2' || res?.kode !== 'P3' || res?.kode !== 'P4') {
                        return <OutlinedCircle />;
                      }
                      return <OutlinedCircle />;
                    })}
                    {res?.detail?.length < 4 && <OutlinedCircle />}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="flex justify-center mt-3">No Data</span>
          )}
          <Divider />
        </div>
        <div className="batch mt-5">
          <div className="flex justify-between items-center">
            <div className="w-2/4">
              <p className="font-bold text-xs">Batch selesai terkirim</p>
            </div>
            {batchDelivered?.length > 0 && (
              <div className="w-2/4 ml-2">
                <div className="flex gap-6">
                  <p className="w-1/4">P1</p>
                  <p className="w-1/4">P2</p>
                  <p className="w-1/4">P3</p>
                  <p className="w-1/4">P4</p>
                </div>
              </div>
            )}
          </div>
          {batchDelivered?.length > 0 ? (
            batchDelivered?.map((res, idx) => (
              <div className="flex justify-between items-center mt-3">
                <div className="w-2/4 cursor-pointer" onClick={() => onClickBatch(res?.id, 'delivered')}>
                  <div className="flex items-center">
                    <span>{res?.kode.split('-')[0]}</span>
                    <div className="cursor-pointer ml-2 rounded-lg p-2 text-xs bg-white shadow focus:outline-none focus:shadow-outline font-bold">
                      {res?.kode.split('/')[1]}-{res?.batch}
                    </div>
                  </div>
                </div>
                <div className="w-2/4">
                  <div className="flex gap-6">
                    {res?.detail?.map((res, idx) => {
                      if (res?.kode === 'P1' || res?.kode === 'P2' || res?.kode === 'P3' || res?.kode === 'P4') {
                        return <FilledCircle />;
                      } else if (res?.kode !== 'P1' || res?.kode !== 'P2' || res?.kode !== 'P3' || res?.kode !== 'P4') {
                        return <OutlinedCircle />;
                      }
                      return <OutlinedCircle />;
                    })}
                    {res?.detail?.length < 4 && <OutlinedCircle />}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="flex justify-center mt-3">No Data</span>
          )}
        </div>
      </div>
    </>
  );
}

export default Logistic;
