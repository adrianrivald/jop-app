import axios from 'axios';
import { useParams } from "react-router-dom";
import Header from '../../../../components/ui/Header';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { QrReader } from 'react-qr-reader';
import Overlay from '../components/overlay';
import Toast from '../../../../components/ui/Toast';

const url = process.env.REACT_APP_API_URL;


function AbsenceIn() {
    const { id_tugas } = useParams();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [alertMessage, setAlertMessage] = React.useState("");
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const onResult = (result, error) => {
        try {
            if (result) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: 'application/json'
                        }
                    }
                    axios.post(`${url}absensi/store`, {
                        "pekerja_id": userData?.id,
                        "penugasan_id": id_tugas,
                        "tipe_absen": "masuk"
                    }, config).then((res) => {
                        navigate('/absence/tapper/46020822-5409-4011-8658-3dcd06c3e256')
                    })
                } 
        } catch (error) {
            alert('error')
            console.error(error.message)
            setIsSubmitted(true)
            setAlertMessage('Gagal scan QR code')
            setTimeout(() => {
                setIsSubmitted(false)
            }, 3000);
        }
    }
    
    return (
        <>
            <div className="header" style={{position: 'relative', zIndex: '9999'}}>
                <Header title="Absensi" isWithBack  />
            </div>
            <div className='qr-area' style={{marginTop: '-10px'}}>
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
                    constraints={ {facingMode: 'environment'} }
                />
            </div>
            <Toast text={alertMessage} onClose={() => setIsSubmitted(false)} isShow={isSubmitted} isSuccess={false} />
        </>
    )
}

export default AbsenceIn;