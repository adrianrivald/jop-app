import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Button from '../../../../components/button/Button';
import './overlay.css';

const url = process.env.REACT_APP_API_URL;

const Overlay = () => {
  const [code, setCode] = React.useState('');
  const [tapperDetail, setTapperDetail] = React.useState({});
  const { id_tugas } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const absenceType = window.location.pathname.split('/')[3];

  const onChange = (e) => {
    setCode(e.target.value);
  };

  const getDetail = async () => {
    await axios
      .get(`${url}absensi/scan-by-tapper-kode/${code}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        const data = res.data.data;
        setTapperDetail(data);
      });
  };

  const onSubmit = async () => {
    getDetail();
  };

  React.useEffect(() => {
    const submit = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      };
      await axios
        .post(
          `${url}absensi/store`,
          {
            pekerja_id: tapperDetail?.id,
            penugasan_id: id_tugas,
            tipe_absen: absenceType === 'in' ? 'masuk' : 'keluar',
          },
          config
        )
        .then(() => {
          navigate(`/absence/tapper/${tapperDetail?.id}`);
        });
    };

    if (tapperDetail?.id) {
      submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tapperDetail?.id]);

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
          <Button isText text="Submit" className="h-9 py-0 ml-2" onClick={onSubmit} />
        </div>
      </div>
    </>
  );
};

export default Overlay;
