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

    const onResult = (result, error) => {
        alert(result)
    }
    
    return (
        <>
            <div className="header">
                <Header title="Absensi" isWithBack  />
            </div>
            <div className='qr-area'>
                <QrReader
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