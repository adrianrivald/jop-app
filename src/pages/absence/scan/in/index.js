import axios from 'axios';
import moment from 'moment';
import Header from '../../../../components/ui/Header';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const url = process.env.REACT_APP_API_URL;



function AbsenceIn() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');
    

    return (
        <>
            <div className="header">
                <Header title="Absensi" isWithBack  />
            </div>
            <div className="container">
               
            </div>
        </>
    )
}

export default AbsenceIn;