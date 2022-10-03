import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Button from "../../../../components/button/Button";
import DatePicker from "../../../../components/forms/DatePicker";
import DropDown from "../../../../components/forms/Dropdown";
import Divider from "../../../../components/ui/Divider";
import Header from "../../../../components/ui/Header"



const url = process.env.REACT_APP_API_URL;

function LogisticShipmentDetail () {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');
    const [shipmentData, setShipmentData] = React.useState([
        {
            status: 'Perjalanan',
            date: 'Rabu, 12 Februari 2022, 15:37',
            code: 'TP1-01/02-12/B.007/P1',
            detail: {
                jenis_logistik: 'Ojek - Motor (120 Kg)',
                armada: 'B 3355 QPR  -  01',
                alamat: 'Gudang Induk - WH1 - G1',
                supir: 'Aji Kuntara / 02887 - PKWT',
                pengawal: 'Sumber Wono / 02887 - PKWT'
            },
            foto : []
        },
        {
            status: 'Perjalanan',
            date: 'Kamis, 12 Februari 2022, 15:37',
            code: 'TP1-01/02-12/B.007/P2',
            detail: {
                jenis_logistik: 'Ojek - Motor (114 Kg)',
                armada: 'B 155 QPR  -  01',
                alamat: 'Gudang Induk - WH1 - G1',
                supir: 'Aji Kuntara / 02887 - PKWT',
                pengawal: 'Sumber Wono / 02887 - PKWT'
            },
            foto : []
        },
        {
            status: 'Perjalanan',
            date: 'Jumat, 12 Februari 2022, 15:37',
            code: 'TP1-01/02-12/B.007/P2',
            detail: {
                jenis_logistik: 'Ojek - Motor (114 Kg)',
                armada: 'B 155 QPR  -  01',
                alamat: 'Gudang Induk - WH1 - G1',
                supir: 'Aji Kuntara / 02887 - PKWT',
                pengawal: 'Sumber Wono / 02887 - PKWT'
            },
            foto : []
        }
    ]);
    const [openedId, setOpenedId] = React.useState({})

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

    return (
        <>
            <div className="header">
                <Header title="Detail Pengiriman" isWithBack/>
            </div>
            <div className="container">
                <div>
                    <p>Pengiriman ke- 3</p>
                    <p className="font-bold">TP1-01/02-12/B.007/P1 (Slab)</p>
                </div>
                <div className="load-detail">
                    <div className="flex justify-between mt-3 gap-3">
                        <div className="p-3 rounded-xl border border-cloud w-full">
                            <p className="text-xxs">Jumlah pengiriman</p>
                            <span className="text-4xl font-bold">335</span>
                        </div>
                        <div className="p-3 rounded-xl border border-cloud w-full">
                            <p className="text-xxs">Total berat produk</p>
                            <span className="text-4xl font-bold">105</span><span> kg</span>
                        </div>
                        <div className="p-3 rounded-xl border border-cloud w-full">
                            <p className="text-xxs">Berat produk sisa</p>
                            <span className="text-4xl font-bold">20</span><span> kg</span>
                        </div>
                    </div>
                    <Divider />
                    <div className=''>
                        {
                            shipmentData?.length > 0 ? shipmentData?.map((res, idx) => {
                                return (
                                    openedId[`item_${idx}`] === true ? (
                                        <div className="bg-white p-3">
                                            <div className="flex justify-between items-center text-sun">
                                                    <p>Pengiriman ke - {idx+1}</p>
                                                    <p>{res?.status}</p>
                                            </div>
                                            <p className="text-xs">{res?.date}</p>

                                            <div className='flex justify-between items-center mt-2 transition-transform cursor-pointer' onClick={() => onCollapse(idx)} >
                                                <div>
                                                    <p className="font-bold">{res?.code}</p>
                                                    <span>Slab – 105 kg (wet)</span>
                                                </div>
                                                <div className="cursor-pointer">
                                                    <svg className="rotate-90"  width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002" stroke="#A7A29A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>  
                                            <div className=" p-3 ">
                                                <div className="flex gap-3 my-1">
                                                    <p className="w-2/4">Jenis Logistik</p>
                                                    <p className="w-2/4 font-bold">{res?.detail?.jenis_logistik}</p>
                                                </div>
                                                <div className="flex gap-3 my-1">
                                                    <p className="w-2/4">Armada</p>
                                                    <p className="w-2/4 font-bold">{res?.detail?.armada}</p>
                                                </div>
                                                <div className="flex gap-3 my-1">
                                                    <p className="w-2/4">Alamat / fasilitas tujuan</p>
                                                    <div className="w-2/4 ">
                                                        <p className="font-bold">{res?.detail?.alamat.split("-")[0]}</p>
                                                        <p className="font-bold">{res?.detail?.alamat.split("-")[1]}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 my-1">
                                                    <p className="w-2/4">Supir / pengendara</p>
                                                    <div className="w-2/4 ">
                                                        <p className="font-bold">{res?.detail?.supir.split("-")[0]}</p>
                                                        <p className="font-bold">{res?.detail?.supir.split("-")[1]}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 my-1">
                                                    <p className="w-2/4">Pengawal</p>
                                                    <div className="w-2/4 ">
                                                        <p className="font-bold">{res?.detail?.pengawal.split("-")[0]}</p>
                                                        <p className="font-bold">{res?.detail?.pengawal.split("-")[1]}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider/>
                                        </div>
                                    ) : (
                                        <div className="p-3">
                                            <div className="flex justify-between items-center text-sun">
                                                    <p>Pengiriman ke - {idx+1}</p>
                                                    <p>{res?.status}</p>
                                            </div>
                                            <p className="text-xs">{res?.date}</p>

                                            <div className='flex justify-between items-center mt-2 transition-transform cursor-pointer' onClick={() => onExpand(idx)} >
                                                <div>
                                                    <p className="font-bold">{res?.code}</p>
                                                    <span>Slab – 105 kg (wet)</span>
                                                </div>
                                                <div className="cursor-pointer">
                                                    <svg  width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002" stroke="#A7A29A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>  
                                            <Divider />
                                        </div>
                                    )
                                )
                            }) : (
                                <div className='flex justify-center'>No Data</div>
                            )
                        }
                    </div>
                </div>
               <div className="submit-area mt-11 pb-5">
                    <Button isText text="Selesai" className="w-full text-md" />
               </div>
            </div>
        </>
        
    )
}

export default LogisticShipmentDetail