import axios from 'axios';
import moment from 'moment';
import { useParams } from "react-router-dom";
import Header from '../../../components/ui/Header';
import Button from '../../../components/button/Button';
import React from 'react';
import DropDown from '../../../components/forms/Dropdown';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Subtitle from '../../../components/title/Subtitle';
import Title from '../../../components/title/Title';

const url = process.env.REACT_APP_API_URL;

function WorkerList(props) {
    return (
        props.workerList.map((result, idx) => {
            const modified_date = moment(result.absensi_masuk, 'YYYY-MM-DD hh:mm:ss').format('hh:mm')
            return (
                <div className='flex justify-between items-center mt-3 pt-3' key={idx}>
                    <p className='w-8 text-xxs mx-4'>{result?.kode}</p>
                    <div className='w-40'>
                        <p className={`font-bold text-sm truncate ${modified_date !== 'Invalid date' ? '' : 'text-earth'}`}>{result?.nama}</p>
                    </div>
                    <p className={`w-20 text-sm text-flora font-bold ${modified_date !== 'Invalid date' ? '' : 'text-earth'}`}>{modified_date !== 'Invalid date' ? modified_date : '-'}</p>
                    <div onClick={() => props.onClickWorker(result?.id)} className="cursor-pointer">
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002" stroke="#A7A29A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <hr />
                </div>
            )
        })
    )
}

function Dropdown (props)  {
    return (
        <div className='mt-1'>
            <h2 className='text-left text-xs mb-1'>{props.title}</h2>
            <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
        </div>
    )
}


function AbsenceList() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');
    const { id_tugas } = useParams();
    const [absenceList, setAbsenceList] = React.useState({});
    const [workerList, setWorkerList] = React.useState([]);

    React.useEffect(() => {
        getAbsence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getAbsence = () => {
        try {
            axios.get(`${url}absensi/by-penugasan/${id_tugas}`,
            {
                url: process.env.REACT_APP_API_URL,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            }).then((res) => {
                const data = res.data.data;
                setAbsenceList(data)
                setWorkerList(data?.pekerja?.seluruh?.list)
            })
        } catch(error) {
            console.error(error.message)
        }
    }

    const onClickWorker = (id_tapper) => {
        navigate(`/absence/tapper/${id_tapper}`)   
    }


    return (
        <>
            <div className="header">
                <Header title="Absensi" isWithBack  />
            </div>
            <div className="container">
                <p className='text-xs'>Nomor Tugas</p>
                <div className='flex justify-between items-center'>
                    <p className='text-sm font-bold'>{absenceList?.kode}</p>
                    <Button
                        isText
                        text="Detail Tugas"
                        onClick={() => navigate(`/assignment/mandor/detail/${id_tugas}/accept`)}
                    />
                </div>
                <div>
                    <Dropdown title="Pilih jenis pekerjaan karyawan" defaultValue="Tapper" option={[{label: 'Tapper'}]} onChange={()=>console.log('')} />
                    <div className="flex justify-between mt-3 gap-3">
                        <div className="p-3 rounded-xl border border-cloud w-full">
                            <p className="text-4xl font-bold">{absenceList?.pekerja?.masuk?.total}</p>
                            {
                                absenceList?.pekerja?.masuk?.list?.length > 0 ? 
                                    <div>
                                        <p className="text-xxs">Terakhir masuk:</p>
                                        <p className="text-xxs font-bold">
                                            {absenceList?.pekerja?.masuk?.list[0]?.nama ?? ""}, &nbsp;
                                            {`${moment(absenceList?.pekerja?.masuk?.list[0]?.absensi_masuk, 'YYYY-MM-DD hh:mm:ss').format('hh:mm')} WIB` ?? "-"} 
                                        </p>      
                                    </div>
                                 : 
                                 <div className="h-7" />
                            }                      
                            <Button 
                                isIcon 
                                icon={
                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0555 0C11.2521 0 12.2222 0.970047 12.2222 2.16667V3.5C12.2222 3.77614 11.9983 4 11.7222 4C11.446 4 11.2222 3.77614 11.2222 3.5V2.16667C11.2222 1.52233 10.6998 1 10.0555 1H8.72217C8.44603 1 8.22217 0.77614 8.22217 0.5C8.22217 0.22386 8.44603 0 8.72217 0H10.0555ZM3.72217 0C3.9983 0 4.22217 0.22386 4.22217 0.5C4.22217 0.77614 3.9983 1 3.72217 1H2.38883C1.7445 1 1.22217 1.52233 1.22217 2.16667V3.5C1.22217 3.77614 0.998301 4 0.722168 4C0.446034 4 0.222168 3.77614 0.222168 3.5V2.16667C0.222168 0.970047 1.19223 0 2.38883 0H3.72217ZM11.2222 8.5C11.2222 8.22387 11.446 8 11.7222 8C11.9983 8 12.2222 8.22387 12.2222 8.5V9.83333C12.2222 11.0299 11.2521 12 10.0555 12H8.72217C8.44603 12 8.22217 11.7761 8.22217 11.5C8.22217 11.2239 8.44603 11 8.72217 11H10.0555C10.6998 11 11.2222 10.4777 11.2222 9.83333V8.5ZM0.222168 8.5C0.222168 8.22387 0.446034 8 0.722168 8C0.998301 8 1.22217 8.22387 1.22217 8.5V9.83333C1.22217 10.4777 1.7445 11 2.38883 11H3.72217C3.9983 11 4.22217 11.2239 4.22217 11.5C4.22217 11.7761 3.9983 12 3.72217 12H2.38883C1.19223 12 0.222168 11.0299 0.222168 9.83333V8.5ZM9.22217 5.5C9.49831 5.5 9.72217 5.72387 9.72217 6C9.72217 6.27613 9.49831 6.5 9.22217 6.5H3.22217C2.94603 6.5 2.72217 6.27613 2.72217 6C2.72217 5.72387 2.94603 5.5 3.22217 5.5H9.22217Z" fill="white"/>
                                    </svg>
                                }
                                text="Scan Masuk"
                                className="w-full mt-2"
                                onClick={()=> navigate(`/absence/${id_tugas}/in`)}
                            />
                        </div>
                        <div className="p-3 rounded-xl border border-cloud w-full">
                            <p className="text-4xl font-bold">{absenceList?.pekerja?.keluar?.total}</p>
                            {absenceList?.pekerja?.keluar?.list?.length > 0 ? 
                                <div>
                                    <p className="text-xxs">Terakhir keluar:</p>
                                    <p className="text-xxs font-bold">
                                        {absenceList?.pekerja?.keluar?.list[0]?.nama}, &nbsp;
                                        {moment(absenceList?.pekerja?.keluar?.list[0]?.absensi_keluar, 'YYYY-MM-DD hh:mm:ss').format('hh:mm')} WIB
                                    </p>
                                </div> : 
                                <div className="h-7" />
                            }
                            <Button 
                                isIcon 
                                icon={
                                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0555 0C11.2521 0 12.2222 0.970047 12.2222 2.16667V3.5C12.2222 3.77614 11.9983 4 11.7222 4C11.446 4 11.2222 3.77614 11.2222 3.5V2.16667C11.2222 1.52233 10.6998 1 10.0555 1H8.72217C8.44603 1 8.22217 0.77614 8.22217 0.5C8.22217 0.22386 8.44603 0 8.72217 0H10.0555ZM3.72217 0C3.9983 0 4.22217 0.22386 4.22217 0.5C4.22217 0.77614 3.9983 1 3.72217 1H2.38883C1.7445 1 1.22217 1.52233 1.22217 2.16667V3.5C1.22217 3.77614 0.998301 4 0.722168 4C0.446034 4 0.222168 3.77614 0.222168 3.5V2.16667C0.222168 0.970047 1.19223 0 2.38883 0H3.72217ZM11.2222 8.5C11.2222 8.22387 11.446 8 11.7222 8C11.9983 8 12.2222 8.22387 12.2222 8.5V9.83333C12.2222 11.0299 11.2521 12 10.0555 12H8.72217C8.44603 12 8.22217 11.7761 8.22217 11.5C8.22217 11.2239 8.44603 11 8.72217 11H10.0555C10.6998 11 11.2222 10.4777 11.2222 9.83333V8.5ZM0.222168 8.5C0.222168 8.22387 0.446034 8 0.722168 8C0.998301 8 1.22217 8.22387 1.22217 8.5V9.83333C1.22217 10.4777 1.7445 11 2.38883 11H3.72217C3.9983 11 4.22217 11.2239 4.22217 11.5C4.22217 11.7761 3.9983 12 3.72217 12H2.38883C1.19223 12 0.222168 11.0299 0.222168 9.83333V8.5ZM9.22217 5.5C9.49831 5.5 9.72217 5.72387 9.72217 6C9.72217 6.27613 9.49831 6.5 9.22217 6.5H3.22217C2.94603 6.5 2.72217 6.27613 2.72217 6C2.72217 5.72387 2.94603 5.5 3.22217 5.5H9.22217Z" fill="white"/>
                                    </svg>
                                }
                                text="Scan Keluar"
                                className="w-full mt-2"
                                onClick={()=> navigate(`/absence/${id_tugas}/out`)}
                            />
                        </div>
                    </div>
                    <div className='flex items-center justify-between mt-8'>
                        <div className='flex-1'>
                            <Subtitle text="Daftar Pekerja" />
                            <Title text="Masuk" />
                        </div>
                        <div className='flex-none'>
                            <DropDown option={[{label: 'Terbaru'},{label: 'Terlama'}]} />
                        </div>
                    </div>
                    <div className='divide-y divide-cloud'>
                        {
                            workerList.length > 0 ? 
                                <WorkerList 
                                    workerList={workerList}
                                    onClickWorker={onClickWorker}
                                /> : <div className='flex justify-center p-5'>No data</div>

                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AbsenceList;