import React, { useEffect, useState } from 'react';
import Header from '../../../components/ui/Header';
import DatePicker from '../../../components/forms/DatePicker';
import FlatButton from '../../../components/button/flat';
import axios from 'axios';
import Cookies from 'universal-cookie';

const url = process.env.REACT_APP_API_URL;

const getDateTime = (date) => {
    const newDate = new Date(date)
    const hh = ('0'+newDate.getHours()).slice(-2)
    const mm = ('0'+newDate.getMinutes()).slice(-2)
    return `${hh}:${mm}`
}

const Mandor = () => {
    const cookies = new Cookies();
    const token = cookies.get('token')
    const [selectedDate, setSelectedDate] = useState("");
    const [listData, setListData] = useState([]);
    
    const onChangeDate = (e) => {
        setSelectedDate(e.target.value)
    }
    
    useEffect(() => {
        getLIst()
    }, [selectedDate])
    
    const getLIst = async() => {
        await axios.get(`${url}penugasan/by-mandor?filter[tanggal_tugas]=${selectedDate}&include=divisi,hancak,clone,sistem,mandor`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data.data
            setListData(data)
        })
    }

    return(
        <div className="App">
            <Header title="Penugasan" isWithBack />
            <section className="container p-4">
               <div className="flex justify-between items-center mb-4">
                    <div className='text-xs font-bold text-black'>Tugas Kerja</div>
                    <DatePicker onChange={onChangeDate} />
               </div>
               {/* table */}
               {listData.map((data) => (
                <div className="flex flex-col justify-center items-center mb-3" key={data.id}>
                    <grid className="grid grid-cols-5 bg-white rounded-lg mb-4 w-full">
                            <div className="col-span-5 flex justify-between text-xs py-3 px-2 border-b-2 border-bgrey">
                                <span>Estate: <b>Gembung</b></span> <b>{data.kode}</b>
                            </div>
                            <div className="flex flex-col text-left text-xs py-3 px-2 border-r-2 border-bgrey">
                                <h1 className="mb-2">Divisi</h1>
                                <div className='font-bold'>{data.divisi.kode}</div>
                            </div>
                            <div className="flex flex-col text-left text-xs py-3 px-2 border-r-2 border-bgrey">
                                <h1 className="mb-2">Hancak</h1>
                                <div className='font-bold'>{data.hancak.kode}</div>
                            </div>
                            <div className="flex flex-col text-left text-xs py-3 px-2 border-r-2 border-bgrey">
                                <h1 className="mb-2">Block</h1>
                                <div className='font-bold'>R.08401</div>
                            </div>
                            <div className="flex flex-col text-left text-xs py-3 px-2 border-r-2 border-bgrey">
                                <h1 className="mb-2">Clone</h1>
                                <div className='font-bold'>{data.clone.nama}</div>
                            </div>
                            <div className="flex flex-col text-left text-xs py-3 px-2">
                                <h1 className="mb-2">Sistem</h1>
                                <div className='font-bold'>{data.sistem.nama}</div>
                            </div>
                            <div className="col-span-2 flex flex-col items-start justify-start text-xs py-3 px-2 border-t-2 border-bgrey">
                                <h1 className="mb-2">Mandor</h1>
                                <div className='font-bold'>{data.mandor.nama}</div>
                            </div>
                            <div className="flex flex-col items-start justify-start text-xs py-3 px-2 border-t-2 border-bgrey">
                                <h1 className="mb-2">Tapper</h1>
                                <div className='font-bold'>{data.hancak.jumlah_rekomendasi_tapper}</div>
                            </div>
                            <div className="col-span-2 flex flex-col items-end justify-start text-xs py-3 px-2 border-t-2 border-bgrey">
                                <h1 className="mb-2">Waktu Kerja</h1>
                                <div className=' font-bold'>{getDateTime(data.tanggal_tugas)} - Selesai</div>
                            </div>
                    </grid>
                    <FlatButton className={'w-full mb-2 text-sm'} text={'Terima Tugas'}/>
                    <FlatButton className={'w-full text-sm'} role="white"  text={'Alihkan Tugas'}/>
                </div>
               ))}
            </section>
        </div>
    )
}

export default Mandor