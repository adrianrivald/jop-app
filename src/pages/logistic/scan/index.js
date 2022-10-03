import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../../../components/ui/Header';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { QrReader } from 'react-qr-reader';
import Overlay from './components/overlay';
import Toast from '../../../components/ui/Toast';

const url = process.env.REACT_APP_API_URL;

function LogisticScan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [alertMessage, setAlertMessage] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const saved_payload = JSON.parse(localStorage.getItem('saved_payload'));
  const scan_type = localStorage.getItem('scan_type');

  const onResult = (result) => {
    try {
      if (result) {
        localStorage.setItem('scanned_driver', result?.text);

        if (scan_type === 'supir') {
          localStorage.setItem(
            'saved_payload',
            JSON.stringify({
              ...saved_payload,
              supir_id: result?.text,
            })
          );
        } else {
          localStorage.setItem(
            'saved_payload',
            JSON.stringify({
              ...saved_payload,
              pengawal_id: result?.text,
            })
          );
        }
        navigate(-1);
        // await axios.get(`${url}absensi/scan-by-tapper-uuid/${result?.text}`,
        // {
        //     url: process.env.REACT_APP_API_URL,
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //         Accept: 'application/json'
        //     }
        // }).then((res) => {
        //     const data = res.data.data
        //     console.log(data, 'resssdata')
        //     if (data) {
        //       navigate(-1)
        //     }
        // })
      }
    } catch (error) {
      setIsSubmitted(true);
      setAlertMessage(error?.response?.data?.error?.message);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className="header" style={{ position: 'relative', zIndex: '99' }}>
        <Header title="Logistik" isWithBack />
      </div>
      <div className="qr-area" style={{ marginTop: '-10px' }}>
        <QrReader
          scanDelay={1000}
          onResult={onResult}
          videoContainerStyle={{
            padding: 0,
            height: '100%',
            width: '100%',
          }}
          videoStyle={{
            height: 'auto',
            position: 'relative',
            // filter: 'brightness(60%)'
          }}
          ViewFinder={Overlay}
          constraints={{ facingMode: 'environment' }}
        />
      </div>
      <Toast text={alertMessage} onClose={() => setIsSubmitted(false)} isShow={isSubmitted} isSuccess={false} />
    </>
  );
}

export default LogisticScan;
