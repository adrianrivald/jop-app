import axios from 'axios';
import moment from 'moment';
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
    const [data, setData] = React.useState('No result');

    const onChange = () => {
        console.log('')
    }

    return (
        <>
            <div className="header">
                <Header title="Absensi" isWithBack  />
            </div>
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
            </div>
        </>
    )
}

export default AbsenceOut;