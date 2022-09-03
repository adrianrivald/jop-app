import axios from 'axios';
import Header from '../../../../components/ui/Header';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { QrReader } from 'react-qr-reader';
import Overlay from '../components/overlay';

const url = process.env.REACT_APP_API_URL;


function AbsenceOut() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');

    const onResult = (result, error) => {
        if (result) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            }
            axios.post(`${url}absensi/store`, {
                "pekerja_id": "46020822-5409-4011-8658-3dcd06c3e256",
                "penugasan_id": "abf5e6a3-84d0-4c32-a83c-25794de50080",
                "tipe_absen": "keluar"
            }, config).then((res) => {
                navigate('/absence/tapper/46020822-5409-4011-8658-3dcd06c3e256')
            })
        }
    }
    
    return (
        <>
            <div className="header">
                <Header title="Absensi" isWithBack  />
            </div>
            <div className='qr-area'>
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
        </>
    )
}

export default AbsenceOut;