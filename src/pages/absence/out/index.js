import axios from 'axios';
import moment from 'moment';
import Header from '../../../components/ui/Header';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { QrReader } from 'react-qr-reader';

const url = process.env.REACT_APP_API_URL;



function AbsenceOut() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');
    const [data, setData] = React.useState('No result');


    return (
        <>
            <div className="header">
                <Header title="Absensi" isWithBack  />
            </div>
            <div className="container">
                <div className='qr-area'>
                    <QrReader
                        onResult={(result, error) => {
                        if (!!result) {
                            setData(result?.text);
                        }

                        if (!!error) {
                            console.info(error);
                        }
                        }}
                        style={{ width: '100%', position: 'relative' }}
                        constraints={ {facingMode: 'environment'} }
                    >
                        <div style={{
                            position: 'absolute',
                            left: 'calc(50% - 360px/2)',
                            color: 'white',
                            fontSize: '40px'
                        }}>
                            testt
                        </div>
                    </QrReader>
                    <p>{data}</p>
                </div>
            </div>
        </>
    )
}

export default AbsenceOut;