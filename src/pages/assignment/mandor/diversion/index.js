import React, { useEffect, useState } from 'react';
import Header from '../../../../components/ui/Header';
import FlatButton from '../../../../components/button/flat';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getDateTime } from '../../../../utils/getDateTime';
import { getLocaleDateString } from '../../../../utils/getDate';
import { toSentenceCase } from '../../../../utils/strings';
import { getStatusColor } from '../../../../utils/getStatusColor';
import listReason from '../../../../utils/listReason';

const MandorDiversionAssignment = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [detail, setDetail] = useState({});
  const [reason, setReason] = useState(listReason[0].value);
  const [additional, setAdditional] = useState('');

  const getDetailMandorAssignment = async () => {
    await axios
      .get(
        `/penugasan/detail/${id}?sort=-tanggal_tugas&include=hancak,wilayah_tugas,jenis_tugas,divisi,hancak,field,clone,sistem,mandor,pekerja.skema_kerja`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      )
      .then((result) => {
        if (result.data.code === 200) {
          const data = result.data.data;
          setDetail(data);
        }
      });
  };

  useEffect(() => {
    getDetailMandorAssignment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDiversionAssignment = async () => {
    await axios
      .post(
        `/penugasan/pengajuan-pengalihan/${id}
        `,
        {
          alasan: reason,
          pesan_tugas: additional,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.data.code === 200) {
          return navigate(`/assignment`);
        }
      });
  };

  return (
    <div className="App min-h-screen h-full">
      <Header title="Pengalihan Penugasan" isWithBack />
      <section className="container p-4 flex flex-col justify-between" style={{ height: 'calc(100vh - 70px)' }}>
        <div className="flex flex-col" key={detail.id}>
          <div className="flex flex-col justify-between items-start mb-4">
            <div className="text-xs text-black mb-1">Tugas Kerja :</div>
            <div className="text-xs font-bold text-black">{getLocaleDateString(detail?.tanggal_tugas)}</div>
          </div>
          <div className="grid grid-cols-5 bg-white rounded-lg mb-4 w-full">
            <div className="col-span-5 flex justify-between text-xs py-3 px-2 border-b-2 border-bgrey">
              <span>
                Estate: <b>{detail?.wilayah_tugas?.nama}</b>
              </span>{' '}
              <b>{detail.kode}</b>
            </div>
            <div className="flex flex-col text-left text-xs py-3 px-2 border-r-2 border-bgrey">
              <h1 className="mb-2">Divisi</h1>
              <div className="font-bold">{detail?.divisi?.kode}</div>
            </div>
            <div className="flex flex-col text-left text-xs py-3 px-2 border-r-2 border-bgrey">
              <h1 className="mb-2">Hancak</h1>
              <div className="font-bold">{detail?.hancak?.kode}</div>
            </div>
            <div className="flex flex-col text-left text-xs py-3 px-2 border-r-2 border-bgrey">
              <h1 className="mb-2">Block</h1>
              <div className="font-bold">{detail?.field?.nama}</div>
            </div>
            <div className="flex flex-col text-left text-xs py-3 px-2 border-r-2 border-bgrey">
              <h1 className="mb-2">Clone</h1>
              <div className="font-bold">{detail?.clone?.nama}</div>
            </div>
            <div className="flex flex-col text-left text-xs py-3 px-2">
              <h1 className="mb-2">Sistem</h1>
              <div className="font-bold">{detail?.sistem?.nama}</div>
            </div>
            <div className="col-span-2 flex flex-col items-start justify-start text-xs py-3 px-2 border-t-2 border-bgrey">
              <h1 className="mb-2">Mandor</h1>
              <div className="font-bold">{detail?.mandor?.nama}</div>
            </div>
            <div className="flex flex-col items-start justify-start text-xs py-3 px-2 border-t-2 border-bgrey">
              <h1 className="mb-2">Tapper</h1>
              <div className="font-bold">
                {detail?.pekerja?.length}/{detail?.hancak?.jumlah_rekomendasi_tapper}
              </div>
            </div>
            <div className="col-span-2 flex flex-col items-end justify-start text-xs py-3 px-2 border-t-2 border-bgrey">
              <h1 className="mb-2">Waktu Kerja</h1>
              <div className="font-bold">{getDateTime(detail?.tanggal_tugas)} - Selesai</div>
            </div>
            <div className="col-span-5 flex justify-between text-xs py-3 px-2 border-b-2 border-bgrey bg-white border-t-2 rounded-b-lg">
              <span className="text-xs">Status Tugas:</span>{' '}
              <b className={`text-sm text-${getStatusColor(detail?.status_tugas)}`}>
                {toSentenceCase(detail?.status_tugas || '')}
              </b>
            </div>
          </div>
          <div className="flex flex-col justify-between items-start">
            <div className="text-xs text-black mb-1">Tugas Diterima :</div>
            <div className="flex justify-between items-center w-full mb-5">
              <div className="text-xs text-left font-bold text-black w-4/5">
                {detail.tanggal_status ? getLocaleDateString(detail.tanggal_status) : '-'}
              </div>
              <div className="text-xs font-bold text-black">
                {detail.tanggal_status ? getDateTime(detail.tanggal_status) : '-'}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start w-full mb-4">
            <label htmlFor="reason" className="text-xs text-black mb-2">
              Alasan Pengalihan:
            </label>
            {detail.status_tugas === 'dialihkan' ? (
              <div className="text-xs font-bold text-black">{toSentenceCase(detail.alasan_pengalihan)}</div>
            ) : (
              <select
                id="reason"
                className="flex justify-between w-full font-bold bg-white dark:bg-white shadow border-none text-xs rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-3"
                defaultValue={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                }}
              >
                {listReason.map((reason, idx) => (
                  <option key={idx} value={reason.value} className="block w-full">
                    {reason.label}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex flex-col items-start w-full mb-4">
            <label htmlFor="additionalMessage" className="text-xs text-black mb-2">
              Pesan Tambahan (optional):
            </label>
            <textarea
              id="additionalMessage"
              rows="4"
              className="flex justify-between w-full font-bold bg-white dark:bg-white shadow border-none text-xs rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-3 resize-none"
              placeholder="Masukkan pesan disini..."
              value={detail.pesan_tugas ? detail.pesan_tugas : additional}
              onChange={(e) => {
                setAdditional(e.target.value);
              }}
              disabled={detail.status_tugas === 'dialihkan' ? true : false}
            ></textarea>
          </div>
        </div>
        {detail.status_tugas !== 'dialihkan' ? (
          <FlatButton className={'w-full mb-2 text-sm font-bold'} text={'Ajukan'} onClick={handleDiversionAssignment} />
        ) : null}
      </section>
    </div>
  );
};

export default MandorDiversionAssignment;
