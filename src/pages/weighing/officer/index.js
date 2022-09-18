import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams, createSearchParams } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Subtitle from '../../../components/title/Subtitle';
import Title from '../../../components/title/Title';
import Header from '../../../components/ui/Header';
import Table from '../../../components/ui/Table';
import Cookies from 'universal-cookie';
import Toast from '../../../components/ui/Toast';
import warning from '../../../assets/icons/warning.svg'
import FlatButton from '../../../components/button/flat';
import DropDown from '../../../components/forms/Dropdown';
// import FlatButton from '../../../../components/button/flat';


const url = process.env.REACT_APP_API_URL;

function WorkerList (props) {
    return (
        <div className='flex justify-between items-center mt-3 pt-3'>
            <p className='w-8 text-xxs mx-4'>{props.scheme}</p>
            <div className='w-40'>
                <p className='font-bold text-sm truncate'>{props.name}</p>
                <p className='text-xxs'>{props.code}</p>
            </div>
            <p className='w-20 text-sm text-flora font-bold'>{props.status}</p>
            <div onClick={props.onClick} className="cursor-pointer">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002" stroke="#A7A29A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <hr />
        </div>
    )
}

function Officer() {
    const {id} = useParams()
    const cookies = new Cookies();
    const token = cookies.get('token');
    const navigate = useNavigate();
    const [absenceHistory, setAbsenceHistory] = React.useState([])
    const [detailData, setDetailData] = React.useState({})
    const [workerList, setWorkerList] = React.useState([])
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [openedId, setOpenedId] = React.useState({})
    const [alertMessage, setAlertMessage] = React.useState("")
    React.useEffect(() => {
        getAbsenceHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getAbsenceHistory = async(sort) => {
        await axios.get(`${url}absensi/riwayat-by-tapper/${id}?sort=${!sort || sort === 'asc' ? '-' : ''}tanggal_tugas`,
        {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data
            console.log(data)
            setAbsenceHistory(data.data)
        })
    }



    const onExpand = (idx) => {
        setOpenedId({
            ...openedId,
            [`item_${idx}`] : true
        })
    }

    const onCollapse = (idx) => {
        setOpenedId({
            ...openedId,
            [`item_${idx}`] : false
        })        
    }
    
    const onSort = (e) => {
        const sort = e.target.value
    }

    return (
        <>
            <div className="header">
                <Header title="Penimbangan TPH" isWithBack />
            </div>
            <div className="container">
                <p className='text-xs'>Mulai Penimbangan Baru</p>
                <Button
                        role="white"
                        className="w-full"
                        isIcon 
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        }
                        onClick={()=> navigate('/assignment/mabes/new-assignment')}
                    />
                <div className='mt-6'>
                    <Title text="Penimbangan yang berlangsung"/>
                    <span>-</span>
                </div>
                <Table  
                    divisi_item={detailData?.divisi?.kode}
                    hancak_item={detailData?.hancak?.kode}
                    block_item={detailData?.field?.nama}
                    clone_item={detailData?.clone?.nama}
                    sistem_item={detailData?.sistem?.nama}
                    borderColor='border border-cloud'
                    backgroundColor='bg-bgrey'
                    cellBorder='border border-cloud'
                    // tbListFooter={tbListFooter}
                />
                <div className='flex justify-between items-center mt-3'>
                    <div>
                        <p className='text-xs'>{detailData?.mandor?.level}</p>
                        <p className='text-sm font-bold'>{detailData?.mandor?.nama}</p>
                    </div>
                    <div>
                        <p className='text-xs'>{moment(detailData?.tanggal_tugas, 'YYYY-MM-DD hh:mm:ss').format('D MMMM, YYYY')}</p>
                        <p className='text-xs'>{moment(detailData?.tanggal_tugas, 'YYYY-MM-DD hh:mm:ss').format('hh:mm')} - selesai</p>
                    </div>
                </div>   
                <div className="history mt-5">
                    <div className="flex justify-between items-center mb-4">
                        <Title text={'Riwayat Absensi'} className="text-sm" />
                        <DropDown onChange={onSort} option={[{label: 'Terbaru', value: 'asc'},{label: 'Terlama', value: 'desc'}]} />
                    </div>
                    <div className={`accordion divide-y divide-cloud`}>
                        {
                            absenceHistory.map((res, idx) => {
                                return (
                                    openedId[`item_${idx}`] === true ? (
                                        <div className="bg-white divide-y divide-cloud">
                                            <div className='flex justify-between items-center transition-transform  p-3 '>
                                                <div>
                                                    <p className='w-full text-xs mb-1'><span className="font-bold">Kartu Absensi</span> {res?.kode}</p>
                                                    <p className='w-full text-xs'>{moment(res?.tanggal_tugas, 'YYYY-MM-DD hh:mm:ss').format('DD MMMM YYYY')}</p>
                                                </div>
                                                <div onClick={() => onCollapse(idx)} className="cursor-pointer">
                                                    <svg className="rotate-90" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002" stroke="#A7A29A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>  
                                            <div className=" p-3 ">
                                                <div className='flex justify-between items-center mt-3 w-full'>
                                                    <p className="w-2/4">Mandor Absensi</p>
                                                    <p className="w-2/4">{res?.mandor}</p>
                                                </div>
                                                <div className='flex justify-between items-center mt-3 w-full'>
                                                    <p className="w-2/4">Waktu Absensi</p>
                                                    <p className="w-2/4 font-bold">{moment(res?.tanggal_tugas, 'YYYY-MM-DD hh:mm:ss').format('hh:mm')}</p>
                                                </div>
                                                <div className='flex justify-between items-center mt-3 w-full'>
                                                    <p className="w-2/4">Wilayah Kerja</p>
                                                    <div className="w-2/4">
                                                        <p className="font-bold">{res?.wilayah_tugas?.divisi}</p>
                                                        <p className="font-bold">{res?.wilayah_tugas?.hancak}</p>
                                                        <p className="font-bold">Block {res?.wilayah_tugas?.field}</p>
                                                        <p className="font-bold">Clone {res?.wilayah_tugas?.clone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='flex justify-between items-center p-3 transition-transform'>
                                            <p className='w-full text-xs'>{moment(res.tanggal_tugas, 'YYYY-MM-DD hh:mm:ss').format('DD MMMM YYYY')}</p>
                                            <div onClick={() => onExpand(idx)} className="cursor-pointer">
                                                <svg  width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002" stroke="#A7A29A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>    
                                    )
                                )
                            })
                        }
                    </div>
                </div>
                <Toast text={alertMessage} onClose={() => setIsSubmitted(false)} isShow={isSubmitted}/> 
            </div>
        </>
    )
}

export default Officer;