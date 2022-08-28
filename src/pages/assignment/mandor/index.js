import React, { Fragment, useEffect, useState } from 'react';
import Header from '../../../components/ui/Header';
import DatePicker from '../../../components/forms/DatePicker';
import FlatButton from '../../../components/button/flat';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { getDateTime } from '../../../utils/getDateTime';
import { getDate } from '../../../utils/getDate';
import { useNavigate } from 'react-router-dom';
import { toSentenceCase } from '../../../utils/strings';

const url = process.env.REACT_APP_API_URL;

const Mandor = () => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    const navigate = useNavigate();
    const defaultDate = getDate(new Date());
    const [selectedDate, setSelectedDate] = useState(defaultDate);
    const [listData, setListData] = useState([]);
    
    const onChangeDate = (e) => {
        setSelectedDate(e.target.value)
    }
    
    useEffect(() => {
        getLIst()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate])
    
    const getLIst = async() => {
        await axios.get(`${url}penugasan/by-mandor?filter[tanggal_tugas]=${selectedDate}&include=divisi,hancak,clone,sistem,mandor,field`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data.data
            console.log('data', data)
            setListData(data)
        })
    }

    const handleAcceptAssignment = async (id) => {
        console.log('id', id)
        await axios.get(`${url}penugasan/terima-tugas/${id}`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((response) => {
            const data = response.data.data
            console.log('data', response)
            return navigate(`/assignment/mandor/detail/${data.id}/accept`)
        })
    }

    const handleDetailAssignment = (id) => {
        return navigate(`/assignment/mandor/detail/${id}/accept`)
    }

    const handleDiversionAssignment = (id) => {
        // balikin ke halaman alihkan tugas tanpa edit
        return navigate(`/assignment/mandor/detail/${id}/accept`)
    }

    return(
        <div className="App">
            <Header title="Penugasan" isWithBack />
            <section className="container p-4">
               <div className="flex justify-between items-center mb-4">
                    <div className='text-xs font-bold text-black'>Tugas Kerja</div>
                    <DatePicker defaultValue={selectedDate} onChange={onChangeDate} />
               </div>
               {/* table */}
                {listData.length ? listData.map((data) => (
                    <div className="flex flex-col justify-center items-center mb-3" key={data.id}>
                        <div className="grid grid-cols-5 bg-white rounded-lg mb-4 w-full">
                            <div className="col-span-5 flex justify-between text-xs py-3 px-2 border-b-2 border-bgrey">
                                <span>Estate: <b>{data.mandor.wilayah_tugas}</b></span> <b>{data.kode}</b>
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
                                <div className='font-bold'>{data.field.nama}</div>
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
                                <div className="font-bold">{getDateTime(data.tanggal_tugas)} - Selesai</div>
                            </div>
                            <div className="col-span-5 flex justify-between text-xs py-3 px-2 border-b-2 border-bgrey bg-sun rounded-b-lg">
                            <span className="text-xs text-white">Status Tugas:</span> <b className="text-sm text-white">{toSentenceCase(data.status_tugas)}</b>
                        </div>
                        </div>
                        {data.status_tugas === "menunggu-persetujuan" ?
                            <Fragment>
                                <FlatButton className={'w-full mb-2 text-sm'} text={'Terima Tugas'} onClick={() => handleAcceptAssignment(data.id)}/>
                                <FlatButton className={'w-full text-sm'} role="white"  text={'Alihkan Tugas'}/>
                            </Fragment> : data.status_tugas === "dialihkan" ?
                            <FlatButton className={'w-full text-sm'}  text={'Detail Tugas'} onClick={() => handleDiversionAssignment(data.id)} /> : 
                            <FlatButton className={'w-full mb-2 text-sm'} text={'Detail Tugas'} onClick={() => handleDetailAssignment(data.id)}/>}
                    </div>
                )) : <div className="flex items-center justify-center" style={{ height: '60vh'}}>Tidak ada tugas di tanggal ini</div>}
            </section>
        </div>
    )
}

export default Mandor