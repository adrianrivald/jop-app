import React, { Fragment, useEffect, useState } from 'react';
import Header from '../../../components/ui/Header';
import DatePicker from '../../../components/forms/DatePicker';
import FlatButton from '../../../components/button/flat';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { getDateTime } from '../../../utils/getDateTime';
import { getDate } from '../../../utils/getDate';
import { useNavigate } from 'react-router-dom';
import { toSentenceCase } from '../../../utils/strings';
import { getStatusColor } from '../../../utils/getStatusColor';
import { useSelector } from 'react-redux';
import { getAssignmentByMandor } from '../../../store/actions/assignmentAction';

const url = process.env.REACT_APP_API_URL;

const Mandor = () => {
  const { data: listData, fetching: listDataFetching } = useSelector(({ assignment_mandor }) => assignment_mandor);

  const cookies = new Cookies();
  const token = cookies.get('token');
  const navigate = useNavigate();
  const defaultDate = getDate(new Date());
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const onChangeDate = (e) => {
    setSelectedDate(e.target.value);
  };

  const getList = () => {
    if (listDataFetching) {
      return;
    }

    getAssignmentByMandor({ tanggalTugas: selectedDate });
  };

  const handleAcceptAssignment = async (id) => {
    await axios
      .get(`${url}penugasan/terima-tugas/${id}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((response) => {
        const data = response.data.data;
        return navigate(`/assignment/detail/${data.id}/accept`);
      });
  };

  const handleDetailAssignment = (id) => navigate(`/assignment/detail/${id}/accept`);

  const handleDiversionAssignment = (id) => navigate(`/assignment/detail/${id}/diversion`);

  useEffect(getList, [selectedDate]);

  return (
    <div className="App">
      <Header title="Penugasan" isWithBack />
      <section className="container p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs font-bold text-black">Tugas Kerja</div>
          <DatePicker defaultValue={selectedDate} onChange={onChangeDate} />
        </div>
        {/* table */}
        {listDataFetching ? (
          <div className="flex items-center justify-center" style={{ height: '60vh' }}>
            Sedang meminta data...
          </div>
        ) : listData.length ? (
          listData.map((data) => (
            <div className="flex flex-col justify-center items-center mb-3" key={data.id}>
              <div className="grid grid-cols-5 bg-white rounded-lg mb-4 w-full">
                <div className="col-span-5 flex justify-between text-xs py-3 px-2 border-b-2 border-bgrey">
                  <span>
                    Estate: <b>{data.wilayah_tugas.nama}</b>
                  </span>{' '}
                  <b>{data.kode}</b>
                </div>
                <div className="flex flex-col text-left text-xs py-3 px-2 border-r-2 border-bgrey">
                  <h1 className="mb-2">Divisi</h1>
                  <div className="font-bold">{data.divisi.kode}</div>
                </div>
                <div className="flex flex-col text-left text-xs py-3 px-2 border-r-2 border-bgrey">
                  <h1 className="mb-2">Hancak</h1>
                  <div className="font-bold">{data.hancak.kode}</div>
                </div>
                <div className="flex flex-col text-left text-xs py-3 px-2 border-r-2 border-bgrey">
                  <h1 className="mb-2">Block</h1>
                  <div className="font-bold">{data.field.nama}</div>
                </div>
                <div className="flex flex-col text-left text-xs py-3 px-2 border-r-2 border-bgrey">
                  <h1 className="mb-2">Clone</h1>
                  <div className="font-bold">{data.clone.nama}</div>
                </div>
                <div className="flex flex-col text-left text-xs py-3 px-2">
                  <h1 className="mb-2">Sistem</h1>
                  <div className="font-bold">{data.sistem.nama}</div>
                </div>
                <div className="col-span-2 flex flex-col items-start justify-start text-xs py-3 px-2 border-t-2 border-bgrey">
                  <h1 className="mb-2">Mandor</h1>
                  <div className="font-bold">{data.mandor.nama}</div>
                </div>
                <div className="flex flex-col items-start justify-start text-xs py-3 px-2 border-t-2 border-bgrey">
                  <h1 className="mb-2">Tapper</h1>
                  <div className="font-bold">{data.hancak.jumlah_rekomendasi_tapper}</div>
                </div>
                <div className="col-span-2 flex flex-col items-end justify-start text-xs py-3 px-2 border-t-2 border-bgrey">
                  <h1 className="mb-2">Waktu Kerja</h1>
                  <div className="font-bold">{getDateTime(data.tanggal_tugas)} - Selesai</div>
                </div>
                <div className="col-span-5 flex justify-between text-xs py-3 px-2 border-b-2 border-bgrey bg-white rounded-b-lg border-t-2">
                  <span className="text-xs">Status Tugas:</span>{' '}
                  <b className={`text-sm text-${getStatusColor(data.status_tugas)}`}>
                    {toSentenceCase(data.status_tugas)}
                  </b>
                </div>
              </div>
              {data.status_tugas === 'menunggu-persetujuan' ? (
                <Fragment>
                  <FlatButton
                    className={'w-full mb-2 text-sm'}
                    text={'Terima Tugas'}
                    onClick={() => handleAcceptAssignment(data.id)}
                  />
                  <FlatButton
                    className={'w-full text-sm'}
                    role="white"
                    text={'Alihkan Tugas'}
                    onClick={() => handleDiversionAssignment(data.id)}
                  />
                </Fragment>
              ) : data.status_tugas === 'dialihkan' ? (
                <FlatButton
                  className={'w-full text-sm'}
                  text={'Detail Tugas'}
                  onClick={() => handleDiversionAssignment(data.id)}
                />
              ) : (
                <FlatButton
                  className={'w-full mb-2 text-sm'}
                  text={'Detail Tugas'}
                  onClick={() => handleDetailAssignment(data.id)}
                />
              )}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center" style={{ height: '60vh' }}>
            Tidak ada tugas di tanggal ini
          </div>
        )}
      </section>
    </div>
  );
};

export default Mandor;
