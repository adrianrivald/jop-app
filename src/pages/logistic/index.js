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
    <div className={`${props.customClass} w-full mt-2`}>
      <h2 className="text-left mb-1">{props.title}</h2>
      <DropDown
        selected={props.selected}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        option={props.option}
      />
    </div>
  );
}

function FilledCircle() {
  return (
    <div className="w-8">
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12.2227" cy="12" r="12" fill="#E96E1D" />
      </svg>
    </div>
  );
}

function OutlinedCircle() {
  return (
    <div className="w-8">
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
  const [gudangList, setGudangList] = React.useState([]);
  const [input, setInput] = React.useState({});
  const [isTphMode, setIsTphMode] = React.useState(true);
  const [batchGudang, setBatchGudang] = React.useState([]);
  const [batchReadyToDeliver, setBatchReadyToDeliver] = React.useState([]);
  const [batchOnDelivery, setBatchOnDelivery] = React.useState([]);
  const [batchDelivered, setBatchDelivered] = React.useState([]);
  const logistic_payload = JSON.parse(localStorage.getItem('logistic_payload'));
  React.useEffect(() => {
    localStorage.removeItem('delivered');
    localStorage.setItem(
      'logistic_payload',
      JSON.stringify({
        ...logistic_payload,
        lokasi: 'tph',
      })
    );
    // if (logistic_payload?.lokasi === 'tph') {
    getTPH();
    // }
    // if (logistic_payload?.from !== null && logistic_payload?.to !== null) {
    //   getBatchReadyToDeliver();
    //   getBatchOnDelivery();
    //   getBatchDelivered();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTPH = () => {
    axios
      .get(`${url}/tph/list?include=wilayah_tugas,divisi&sort=kode,nama`, {
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

  const getGudang = (val) => {
    axios
      .get(`${url}/gudang/list`, {
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

  const onChangeHandler = (e, id) => {
    localStorage.setItem(
      'logistic_payload',
      JSON.stringify({
        ...logistic_payload,
        [id]: e.target.value,
      })
    );

    setInput({
      ...input,
      [id]: e.target.value,
    });

    if (id === 'lokasi' && e.target.value === 'tph') {
      getTPH();
      setIsTphMode(true);
      localStorage.setItem('mode', 'tph');
    }
    if (id === 'lokasi' && e.target.value === 'wh') {
      getGudang();
      setIsTphMode(false);
      localStorage.setItem('mode', 'wh');
    }
    // setSelectedTph(e.target.value);
  };

  React.useEffect(() => {
    if (logistic_payload) {
      if (
        'lokasi' in logistic_payload &&
        'kode_lokasi' in logistic_payload &&
        'from' in logistic_payload &&
        'to' in logistic_payload
      ) {
        if (isTphMode) {
          getBatchReadyToDeliver();
          getBatchOnDelivery();
          getBatchDelivered();
        } else {
          getBatchGudang();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const getBatchGudang = () => {
    axios
      .get(
        `${url}/pengiriman/stock-selesai-checkout?filter[gudang]=${
          logistic_payload?.kode_lokasi
        }&filter[status_kirim]=null|dalam-pengiriman|selesai-terkirim&filter[periode]=${logistic_payload?.from.concat(
          ',',
          logistic_payload?.to
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
        setBatchGudang(data);
        console.log(data, 'data');
      });
  };

  const getBatchReadyToDeliver = () => {
    axios
      .get(
        `${url}/pengiriman/batch-siap-kirim?filter[tph]=${
          logistic_payload?.kode_lokasi
        }&filter[periode]=${logistic_payload?.from.concat(',', logistic_payload?.to)}`,
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
        `${url}/pengiriman/batch-dalam-pengiriman?filter[tph]=${
          logistic_payload?.kode_lokasi
        }&filter[periode]=${logistic_payload?.from.concat(',', logistic_payload?.to)}`,
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
        `${url}/pengiriman/batch-selesai-kirim?filter[tph]=${
          logistic_payload?.kode_lokasi
        }&filter[periode]=${logistic_payload?.from.concat(',', logistic_payload?.to)}`,
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

  const handleBack = () => {
    localStorage.removeItem('logistic_payload');
    localStorage.removeItem('shipment_index');
    localStorage.removeItem('loaded_data');
  };

  return (
    <>
      <div className="header">
        <Header title="Logistik" to={'/homepage'} isWithBack moreAction={handleBack} />
      </div>
      <div className="container">
        <Dropdown
          title="Masukkan lokasi"
          // defaultValue={!shipment_payload?.gudang_id ? 'Pilih kode lokasi gudang' : ''}
          selected={logistic_payload?.lokasi !== null ? logistic_payload?.lokasi : 'Pilih kode lokasi'}
          option={[
            {
              value: 'tph',
              label: 'Tempat Penimbangan',
            },
            {
              value: 'wh',
              label: 'Gudang',
            },
          ]}
          onChange={(e) => onChangeHandler(e, 'lokasi')}
        />
        <Dropdown
          title="Masukan kode lokasi awal"
          defaultValue={!logistic_payload?.kode_lokasi ? 'Pilih kode lokasi awal' : ''}
          option={isTphMode ? tphList : gudangList}
          selected={
            logistic_payload?.kode_lokasi !== null && tphList !== []
              ? logistic_payload?.kode_lokasi
              : 'Pilih kode lokasi'
          }
          onChange={(e) => onChangeHandler(e, 'kode_lokasi')}
        />
        <div>
          <h2 className="text-left mt-5 mb-1">Atur Periode</h2>
          <div className="flex justify-between gap-2">
            <div className="flex-auto w-64">
              <DatePicker
                defaultValue={logistic_payload?.from !== null ? logistic_payload?.from : ''}
                onChange={(e) => onChangeHandler(e, 'from')}
              />
            </div>
            <div className="flex-auto w-64">
              <DatePicker
                defaultValue={logistic_payload?.to !== null ? logistic_payload?.to : ''}
                onChange={(e) => onChangeHandler(e, 'to')}
              />
            </div>
          </div>
        </div>
        <Divider />
        {isTphMode ? (
          <>
            <div className="batch mt-5">
              <div className="flex justify-between items-center">
                <div className="w-2/4">
                  <p className="font-bold text-xs">Batch siap kirim</p>
                </div>
                {batchReadyToDeliver?.length > 0 && (
                  <div className="w-2/4 ml-2">
                    <div className="flex gap-6">
                      <p className="w-8">P1</p>
                      <p className="w-8">P2</p>
                      <p className="w-8">P3</p>
                      <p className="w-8">P4</p>
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
                          } else if (
                            res?.kode !== 'P1' ||
                            res?.kode !== 'P2' ||
                            res?.kode !== 'P3' ||
                            res?.kode !== 'P4'
                          ) {
                            return null;
                          }
                          return <OutlinedCircle />;
                        })}
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
                      <p className="w-8">P1</p>
                      <p className="w-8">P2</p>
                      <p className="w-8">P3</p>
                      <p className="w-8">P4</p>
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
                          } else if (
                            res?.kode !== 'P1' ||
                            res?.kode !== 'P2' ||
                            res?.kode !== 'P3' ||
                            res?.kode !== 'P4'
                          ) {
                            return null;
                          }
                          return <OutlinedCircle />;
                        })}
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
                      <p className="w-8">P1</p>
                      <p className="w-8">P2</p>
                      <p className="w-8">P3</p>
                      <p className="w-8">P4</p>
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
                          } else if (
                            res?.kode !== 'P1' ||
                            res?.kode !== 'P2' ||
                            res?.kode !== 'P3' ||
                            res?.kode !== 'P4'
                          ) {
                            return null;
                          }
                          return <OutlinedCircle />;
                        })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span className="flex justify-center mt-3">No Data</span>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="batch mt-5">
              <div className="flex justify-between items-center">
                <div className="w-2/4">
                  <p className="font-bold text-xs">Batch siap kirim</p>
                </div>
                {batchGudang?.filter((val) => val?.status_kirim === null)?.length > 0 && (
                  <div className="w-2/4 ml-2">
                    <div className="flex gap-6">
                      <p className="w-8">P1</p>
                      <p className="w-8">P2</p>
                      <p className="w-8">P3</p>
                      <p className="w-8">P4</p>
                    </div>
                  </div>
                )}
              </div>
              {batchGudang?.filter((val) => val?.status_kirim === null)?.length > 0 ? (
                batchGudang
                  .filter((val) => val?.status_kirim === null)
                  ?.map((res, idx) => (
                    <div className="flex justify-between items-center mt-3">
                      <div className="w-2/4 cursor-pointer" onClick={() => onClickBatch(res?.id)}>
                        <div className="flex items-center">
                          <span className="font-bold">{res?.kode.split('-')[0]}</span>
                          <div className="cursor-pointer ml-2 rounded-lg p-2 text-xs bg-white shadow focus:outline-none focus:shadow-outline font-bold">
                            {res?.kode.split('/')[1]}
                          </div>
                        </div>
                      </div>
                      <div className="w-2/4">
                        <div className="flex gap-6">
                          {res?.detail?.map((res, idx) => {
                            if (res?.kode === 'P1' || res?.kode === 'P2' || res?.kode === 'P3' || res?.kode === 'P4') {
                              return <FilledCircle />;
                            } else if (
                              res?.kode !== 'P1' ||
                              res?.kode !== 'P2' ||
                              res?.kode !== 'P3' ||
                              res?.kode !== 'P4'
                            ) {
                              return null;
                            }
                            return <OutlinedCircle />;
                          })}
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
                {batchGudang?.filter((val) => val?.status_kirim === 'dalam-pengiriman')?.length > 0 && (
                  <div className="w-2/4 ml-2">
                    <div className="flex gap-6">
                      <p className="w-8">P1</p>
                      <p className="w-8">P2</p>
                      <p className="w-8">P3</p>
                      <p className="w-8">P4</p>
                    </div>
                  </div>
                )}
              </div>
              {batchGudang?.filter((val) => val?.status_kirim === 'dalam-pengiriman')?.length > 0 ? (
                batchGudang
                  ?.filter((val) => val?.status_kirim === 'dalam-pengiriman')
                  ?.map((res, idx) => (
                    <div className="flex justify-between items-center mt-3">
                      <div className="w-2/4 cursor-pointer" onClick={() => onClickBatch(res?.id)}>
                        <div className="flex items-center">
                          <span>{res?.kode.split('-')[0]}</span>
                          <div className="cursor-pointer ml-2 rounded-lg p-2 text-xs bg-white shadow focus:outline-none focus:shadow-outline font-bold">
                            {res?.kode.split('/')[1]}
                          </div>
                        </div>
                      </div>
                      <div className="w-2/4">
                        <div className="flex gap-6">
                          {res?.detail?.map((res, idx) => {
                            if (res?.kode === 'P1' || res?.kode === 'P2' || res?.kode === 'P3' || res?.kode === 'P4') {
                              return <FilledCircle />;
                            } else if (
                              res?.kode !== 'P1' ||
                              res?.kode !== 'P2' ||
                              res?.kode !== 'P3' ||
                              res?.kode !== 'P4'
                            ) {
                              return null;
                            }
                            return <OutlinedCircle />;
                          })}
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
                {batchGudang.filter((val) => val?.status_kirim === 'selesai-terkirim')?.length > 0 && (
                  <div className="w-2/4 ml-2">
                    <div className="flex gap-6">
                      <p className="w-8">P1</p>
                      <p className="w-8">P2</p>
                      <p className="w-8">P3</p>
                      <p className="w-8">P4</p>
                    </div>
                  </div>
                )}
              </div>
              {batchGudang?.filter((val) => val?.status_kirim === 'selesai-terkirim').length > 0 ? (
                batchGudang
                  ?.filter((val) => val?.status_kirim === 'selesai-terkirim')
                  .map((res, idx) => (
                    <div className="flex justify-between items-center mt-3">
                      <div className="w-2/4 cursor-pointer" onClick={() => onClickBatch(res?.id, 'delivered')}>
                        <div className="flex items-center">
                          <span>{res?.kode.split('-')[0]}</span>
                          <div className="cursor-pointer ml-2 rounded-lg p-2 text-xs bg-white shadow focus:outline-none focus:shadow-outline font-bold">
                            {res?.kode.split('/')[1]}
                          </div>
                        </div>
                      </div>
                      <div className="w-2/4">
                        <div className="flex gap-6">
                          {res?.detail?.map((res, idx) => {
                            if (res?.kode === 'P1' || res?.kode === 'P2' || res?.kode === 'P3' || res?.kode === 'P4') {
                              return <FilledCircle />;
                            } else if (
                              res?.kode !== 'P1' ||
                              res?.kode !== 'P2' ||
                              res?.kode !== 'P3' ||
                              res?.kode !== 'P4'
                            ) {
                              return null;
                            }
                            return <OutlinedCircle />;
                          })}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <span className="flex justify-center mt-3">No Data</span>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Logistic;
