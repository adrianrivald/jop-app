import React, { useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import DatePicker from '../../components/forms/DatePicker';
import { getDateTime } from '../../utils/getDateTime';
import { getDate } from '../../utils/getDate';
import { useNavigate } from 'react-router-dom';
import { toSentenceCase } from '../../utils/strings';
import { getStatusColor } from '../../utils/getStatusColor';
import { useSelector } from 'react-redux';
import { getAssignmentByMandor } from '../../store/actions/assignmentAction';

const Absence = () => {
  const { data: listData, fetching: listDataFetching } = useSelector(({ assignment_mandor }) => assignment_mandor);

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

  const onClickTask = (id) => {
    navigate(`/absence/${id}`);
  };

  useEffect(getList, [selectedDate]);

  return (
    <div className="App">
      <Header title="Absensi" isWithBack />
      <section className="container p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs font-bold text-black">Tugas Kerja</div>
          <DatePicker defaultValue={selectedDate} onChange={onChangeDate} />
        </div>
        {/* table */}
        {listData.length ? (
          listData
            .filter((res) => res.status_tugas === 'diterima')
            .map((data) => (
              <div
                className="flex flex-col justify-center items-center mb-3"
                key={data.id}
                onClick={() => onClickTask(data.id)}
              >
                <div className="grid grid-cols-5 bg-white rounded-lg mb-4 w-full">
                  <div className="col-span-5 flex justify-between text-xs py-3 px-2 border-b-2 border-bgrey">
                    <span>
                      Estate: <b>{data.mandor.wilayah_tugas}</b>
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
              </div>
            ))
        ) : (
          <div className="flex items-center justify-center" style={{ height: '60vh' }}>
            <span>Tidak ada tugas di tanggal ini</span>
          </div>
        )}
      </section>
    </div>
  );
};

export default Absence;
