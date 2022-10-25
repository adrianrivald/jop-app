import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../../../../../components/ui/Header';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { QrReader } from 'react-qr-reader';
import Overlay from './components/overlay';
import Toast from '../../../../../components/ui/Toast';

const url = process.env.REACT_APP_API_URL;

function WeighingScan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [alertMessage, setAlertMessage] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const onResult = async (result, error) => {
    try {
      if (result) {
        navigate(`/weighing/detail/${id}/tapper/${result?.text}`);
        localStorage.setItem('scanned_tapper', result?.text);
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
        <Header title="Penimbangan" isWithBack />
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

export default WeighingScan;
