import axios from "axios";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import DropDown from "../../../components/forms/Dropdown";
import Title from "../../../components/title/Title";
import Header from "../../../components/ui/Header";
import Fallback from "../../../assets/images/fallback-ava.png"
import FlatButton from "../../../components/button/flat";
import Cookies from "universal-cookie";

const url = process.env.REACT_APP_API_URL;

const DetailTapper = () =>{
    const { id } = useParams();
    const cookies = new Cookies();
    const token = cookies.get('token');
    const [tapperDetail, setTapperDetail] = React.useState({})
    const [openedId, setOpenedId] = React.useState({})
    const [absenceHistory, setAbsenceHistory] = React.useState([])

    React.useEffect(() => {
        getDetail();
        getAbsenceHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getDetail = async() => {
        await axios.get(`${url}absensi/scan-by-tapper-uuid/${id}`,
        {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data
            setTapperDetail(data)
        })
    }

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

    const avaImage = () => {
        if (tapperDetail?.foto && tapperDetail?.foto !== null){
            return tapperDetail?.foto
        }
        return Fallback
    }

    const onSort = (e) => {
        const sort = e.target.value
        getAbsenceHistory(sort);
    }

    return (
        <>
            <div className="header">
                <Header title="Detail Tapper" isWithBack />
            </div>
            <div className="container">
                <div className="bio flex">
                    <div className="flex-auto w-2/5 mr-5 shadow">
                        <div className="rounded-lg bg-white p-1">
                            <img src={avaImage()}
                                className="rounded-lg"
                                alt="ava-tapper" 
                            />
                        </div>
                    </div>
                    <div className="flex-auto w-3/5 ...">
                        <h2 className="font-bold text-sm">{tapperDetail?.nama}</h2>
                        <p className="text-xs">{tapperDetail?.tipe}</p>
                        <div className="w-4/5">
                            <div className="mt-5 flex justify-between justify-items-start">
                                <p>NIK</p>
                                <p className="font-bold">{tapperDetail?.kode}</p>
                            </div>
                            <div className="mt-1 flex justify-between justify-items-start">
                                <p>Status</p>
                                <p className="font-bold">{tapperDetail?.skema_kerja}</p>
                            </div>
                            <div className="mt-1 flex justify-between justify-items-start">
                                <p>Tahun Masuk</p>
                                <p className="font-bold">{tapperDetail?.tahun_masuk}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="performance mt-5">
                    <div className="flex justify-between items-center">
                        <Title text={'Performa'} className="text-sm" />
                        <DropDown option={[{label: '30 Hari Terakhir'},{label: '7 Hari Terakhir'}]} />
                    </div>
                    <div className="flex justify-between mt-3 gap-3">
                        <div className="p-3 rounded-xl border border-cloud w-full">
                            <p className="text-xxs">Total Kerja</p>
                            <p className="text-4xl font-bold">{tapperDetail?.stat_absensi?.masuk}</p>
                        </div>
                        <div className="p-3 rounded-xl border border-cloud w-full">
                            <p className="text-xxs">Total Izin</p>
                            <p className="text-4xl font-bold">{tapperDetail?.stat_absensi?.izin}</p>
                        </div>
                        <div className="p-3 rounded-xl border border-cloud w-full">
                            <p className="text-xxs">Total Mangkir</p>
                            <p className="text-4xl font-bold">{tapperDetail?.stat_absensi?.mangkir}</p>
                        </div>
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
            </div>
                <div className="button-area p-3" 
                    // style={{
                    //     background: 'linear-gradient(180deg, rgba(242, 245, 247, 0) 0%, #F2F5F7 31.25%)',
                    //     display: 'flex',
                    //     flexDirection: 'row',
                    //     justifyContent: 'center',
                    //     alignItems: 'flex-end',
                    //     padding: '12px 20px',
                    //     gap: '12px',
                    //     position: 'fixed',
                    //     width: '480px',
                    //     bottom: '0'
                    //     }
                    // }
                >
                    <FlatButton 
                        className='w-full rounded-xl' 
                        role='white' text='Kembali ke atas' 
                        onClick={() => window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                            })
                        }
                    />
                </div>
        </>
    )
}

export default DetailTapper;