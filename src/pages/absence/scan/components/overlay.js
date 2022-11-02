import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/button/Button';
import './overlay.css';
import Joi from 'joi';
import { showToast } from '../../../../store/actions/uiAction';
import moment from 'moment';
import { ACCEPTED_STATUS_CODE } from 'fetch-queue/lib/CONSTANTS';

const SCHEMA = Joi.object({
  pekerja_kode: Joi.string().label('Pekerja kode').required(),
  penugasan_id: Joi.string().uuid().label('Penugasan ID').required(),
});

const Overlay = () => {
  const [code, setCode] = React.useState('');
  const [tapperDetail, setTapperDetail] = React.useState({});
  const { id_tugas } = useParams();
  const navigate = useNavigate();
  const absenceType = window.location.pathname.split('/')[3];

  const onChange = (e) => {
    setCode(e.target.value);
  };

  const navigateToTapperDetail = async () => {
    const res = await axios.get(`/absensi/scan-by-tapper-kode/${code}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    const { id } = res.data.data;
    navigate(`/absence/tapper/${id}`);
  };

  const handleSubmit = async () => {
    try {
      await SCHEMA.validateAsync({
        pekerja_kode: code,
        penugasan_id: id_tugas,
      });

      const config = {
        headers: {
          Accept: 'application/json',
        },
      };
      const res = await axios.post(
        `/absensi/store/offline`,
        {
          pekerja_kode: code,
          penugasan_id: id_tugas,
          tipe_absen: absenceType === 'in' ? 'masuk' : 'keluar',
          timestamp: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        },
        config
      );

      if (res.status === ACCEPTED_STATUS_CODE) {
        showToast({
          message: 'koneksi anda bermasalah, data sudah dalam antrian!',
        });
        return navigate(-1);
      }

      return navigateToTapperDetail();
    } catch (err) {
      if (err.isAxiosError) {
        return showToast({
          message: err.response?.data?.error?.message,
          isError: true,
        });
      }

      showToast({
        message: err.message,
        isError: true,
      });
    }
  };

  return (
    <>
      <div className="scan-area">{/* <p className='font-sm'>Tempatkan QR Code dalam kotak</p> */}</div>
      <div className="overlay">
        <p>
          Jika scan barcode gagal, ketik dan masukan <span className="font-bold">nomor induk karyawan</span> kedalam
          kotak dibawah:
        </p>
        <div className="flex items-center mt-2 justify-center">
          <input
            className="text-coal font-bold w-3/4 h-9 rounded-lg py-2.5 px-2.5 text-xs leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            onChange={(e) => onChange(e)}
          />
          <Button isText text="Submit" className="h-9 py-0 ml-2" onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default Overlay;
