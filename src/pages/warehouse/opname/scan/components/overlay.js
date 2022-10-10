import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Button from '../../../../../components/button/Button';
import './overlay.css';

const url = process.env.REACT_APP_API_URL;

const Overlay = () => {
  const [code, setCode] = React.useState('');
  const [tapperDetail, setTapperDetail] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const scan_type = localStorage.getItem('scan_type');
  const shipment_payload = JSON.parse(localStorage.getItem('shipment_payload'));

  const onChange = (e) => {
    setCode(e.target.value);
  };

  const onSubmit = () => {
    navigate('/warehouse/check-in/detail/new');
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
          <Button isText text="Submit" className="h-9 py-0 ml-2" onClick={onSubmit} />
        </div>
      </div>
    </>
  );
};

export default Overlay;
