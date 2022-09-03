import axios from "axios";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import DropDown from "../../../components/forms/Dropdown";
import Title from "../../../components/title/Title";
import Header from "../../../components/ui/Header";
import Fallback from "../../../assets/images/fallback-ava.png"
import FlatButton from "../../../components/button/flat";

const url = process.env.REACT_APP_API_URL;

const DetailTapper = () =>{
    const { id } = useParams();
    const [tapperDetail, setTapperDetail] = React.useState({})
    const [openedId, setOpenedId] = React.useState({})
    const riwayatPenugasan = [
        {
            "id": "abf5e6a3-84d0-4c32-a83c-25794de50080",
            "kode": "T63518",
            "tanggal_tugas": "2022-08-12 10:00:00",
            "mandor": "Bambang",
            "absensi_masuk": null,
            "absensi_keluar": null,
            "wilayah_tugas": {
                "estate": "SEBAYUR",
                "divisi": "DIVISI 1",
                "hancak": "HANCAK A",
                "field": "R.03459",
                "clone": "RRIC 100"
            }
        },
        {
            "id": "abf5e6a3-84d0-4c32-a83c-25794de50080",
            "kode": "T63518",
            "tanggal_tugas": "2022-08-13 10:00:00",
            "mandor": "Adi",
            "absensi_masuk": null,
            "absensi_keluar": null,
            "wilayah_tugas": {
                "estate": "GEMBUNG",
                "divisi": "DIVISI 5",
                "hancak": "HANCAK A",
                "field": "R.03459",
                "clone": "RRIC 100"
            }
        },
        {
            "id": "abf5e6a3-84d0-4c32-a83c-25794de50080",
            "kode": "T63518",
            "tanggal_tugas": "2022-08-14 10:00:00",
            "mandor": "Bayu",
            "absensi_masuk": null,
            "absensi_keluar": null,
            "wilayah_tugas": {
                "estate": "Gembung",
                "divisi": "DIVISI 2",
                "hancak": "HANCAK A",
                "field": "R.02459",
                "clone": "R3xC 100"
            }
        }
    ]
    React.useEffect(() => {
        getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getDetail = async() => {
        await axios.get(`${url}absensi/scan-by-tapper-uuid/${id}`,
        {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer 5|T45hz7TdtCoEHVbaxBhtx4tN6exZunEqHGWEILrc`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data
            setTapperDetail(data)
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
                        <DropDown option={[{label: '30 Hari Terakhir'}]} />
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
                        <DropDown option={[{label: '30 Hari Terakhir'}]} />
                    </div>
                    <div className={`accordion divide-y divide-cloud`}>
                        {
                            riwayatPenugasan.map((res, idx) => {
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
                                                <div className='flex justify-between items-center mt-3 w-3/5'>
                                                    <p>Mandor Absensi</p>
                                                    <p className="font-bold">Aang Ginanjar</p>
                                                </div>
                                                <div className='flex justify-between items-center mt-3 w-3/5'>
                                                    <p>Waktu Absensi</p>
                                                    <p className="font-bold">05:22</p>
                                                </div>
                                                <div className='flex justify-between items-center mt-3 w-3/5'>
                                                    <p>Wilayah Kerja</p>
                                                    <div>
                                                        <p className="font-bold">Divisi 4</p>
                                                        <p className="font-bold">Hancak B</p>
                                                        <p className="font-bold">Blok R.0298</p>
                                                        <p className="font-bold">Clone PB366</p>
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
                <div className="button-area">
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
            </div>
        </>
    )
}

export default DetailTapper;