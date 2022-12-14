import React, { useEffect, useState } from 'react';
import Header from '../../../../components/ui/Header';
import FlatButton from '../../../../components/button/flat';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getDateTime } from '../../../../utils/getDateTime';
import { getLocaleDateString } from '../../../../utils/getDate';
import { toSentenceCase } from '../../../../utils/strings';
import { getStatusColor } from '../../../../utils/getStatusColor';

const MandorAcceptAssignment = () => {
  let { id } = useParams();
  const [detail, setDetail] = useState({});
  const navigate = useNavigate();

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

  const handleEnterTapper = () => {
    navigate(`/assignment/tapper/${id}`);
  };

  return (
    <div className="App min-h-screen h-full">
      <Header title="Terima Penugasan" isWithBack to="/assignment" />
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
          <div className="flex flex-col justify-between items-start mb-4">
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
          <div className="flex flex-col items-center">
            <div className="text-md text-black mb-1">Tapper:</div>
            <div className="text-4xl text-black font-black">
              {detail?.pekerja?.length}/{detail?.hancak?.jumlah_rekomendasi_tapper}
            </div>
          </div>
        </div>
        {/* button with condition */}
        {detail.status_tugas === 'dibatalkan' ? null : !detail.approved_by_mabes_at ? (
          <FlatButton
            className={'w-full mb-2 text-sm font-bold'}
            text={'Masukkan Tapper'}
            onClick={handleEnterTapper}
          />
        ) : (
          <FlatButton className={'w-full mb-2 text-sm font-bold'} text={'Lihat Tapper'} onClick={handleEnterTapper} />
        )}
      </section>
    </div>
  );
};

export default MandorAcceptAssignment;
