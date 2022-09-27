import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Button from "../../../components/button/Button";
import Divider from "../../../components/ui/Divider";
import Header from "../../../components/ui/Header"

const url = process.env.REACT_APP_API_URL;

function LogisticDetail () {
    const { id } = useParams();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');
    const [batchDetail, setBatchDetail] = React.useState({});

    React.useEffect(() => {
        getBatchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    const getBatchDetail = () => {
        axios.get(`${url}pengiriman/detail-batch/${id}`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            console.log(res,'res')
            const data = res.data.data
            setBatchDetail(data)
        })
    }

    return (
        <>
            <div className="header">
                <Header title="Logistik" isWithBack/>
            </div>
            <div className="container">
               <div className="flex justify-between">
                    <div>
                        <p>Kode Kelompok Barang</p>
                        <p className="font-bold">TP1-01/02-12-B.007</p>
                    </div>
                    <div>
                        <p>Total Berat Barang</p>
                        <p className="font-bold">1255 Kg</p>
                    </div>
               </div>
               <Divider />
               <div className="my-5">
                    {
                        batchDetail?.detail?.map((res, idx) => {
                            return (
                                <div className="detail my-3">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span>Slab</span> - <span>{res?.berat} kg</span>
                                            <p>TP1-01/02-12-B.007/P1</p>
                                        </div>
                                        <div>
                                            <Button isText text="Load" />
                                        </div>
                                    </div>
                                    {
                                        idx === 0 && (
                                            <>
                                                <div className="flex justify-between items-center gap-3 mt-4">
                                                    <div className="flex rounded-xl bg-white p-1 gap-1 w-2/4 h-8">
                                                        <div className="rounded-l-xl bg-sun w-1/5 h-6" />
                                                        <div className="rounded-r-xl bg-earth w-4/5 h-6" />
                                                    </div>
                                                    <div>
                                                        <p>14:19</p>
                                                        <p className="text-md font-bold">Ojek 01-1</p>
                                                    </div>
                                                    <p className='flex-auto text-right text-sun font-bold'>Perjalanan</p>
                                                </div>
                                                <div className="flex justify-between items-center gap-3 mt-4">
                                                    <div className="flex rounded-xl bg-white p-1 gap-1 w-2/4 h-8">
                                                        <div className="rounded-l-xl bg-seed w-1/5 h-6" />
                                                        <div className="bg-sun w-2/4 h-6" />
                                                        <div className="rounded-r-xl bg-earth w-1/3 h-6" />
                                                    </div>
                                                    <div>
                                                        <p>14:19</p>
                                                        <p className="text-md font-bold">Ojek 01-1</p>
                                                    </div>
                                                    <p className='flex-auto text-right text-flora font-bold'>Sampai</p>
                                                </div>
                                                <div className="flex justify-between items-center gap-3 mt-4">
                                                    <div className="flex rounded-xl bg-white p-1 gap-1 w-2/4 h-8">
                                                        <div className="rounded-l-xl bg-seed w-3/4 h-6" />
                                                        <div className="rounded-r-xl bg-sun w-1/4 h-6" />
                                                    </div>
                                                    <div>
                                                        <p>14:19</p>
                                                        <p className="text-md font-bold">Ojek 01-1</p>
                                                    </div>
                                                    <p className='flex-auto text-right text-flora font-bold'>Sampai</p>
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        idx === 1 && (
                                            <>
                                                <div className="flex justify-between items-center gap-3 mt-4">
                                                    <div className="flex rounded-xl bg-white p-1 gap-1 w-2/4 h-8">
                                                        <div className="rounded-l-xl bg-sun w-1/5 h-6" />
                                                        <div className="rounded-r-xl bg-earth w-4/5 h-6" />
                                                    </div>
                                                    <div>
                                                        <p>14:19</p>
                                                        <p className="text-md font-bold">Ojek 01-1</p>
                                                    </div>
                                                    <p className='flex-auto text-right text-sun font-bold'>Perjalanan</p>
                                                </div>
                                            </>
                                        )
                                    }
                                    <div className="view-detail my-5">
                                        <p className="text-flora underline underline-offset-2">Lihat Detail Pengiriman</p>
                                    </div>
                                    <Divider /> 
                                </div>
                            )
                        })
                    }
               </div>
               <div className="batch-delivered">
                    <p className="font-bold">Batch selesai dikirim</p>
                    <div className="flex justify-between mt-5 relative">
                        <div>
                            <p>LOAD 1: Slab - 105 Kg</p>
                            <p className="font-bold">TP1-01/02-12-B.007/P1</p>
                        </div>
                        <p className="font-bold absolute right-0 bottom-0">Slab</p>
                    </div>
                    <div className="flex justify-between mt-5 relative">
                        <div>
                            <p>LOAD 1: Slab - 105 Kg</p>
                            <p className="font-bold">TP1-01/02-12-B.007/P1</p>
                        </div>
                        <p className="font-bold absolute right-0 bottom-0">Cup Lump</p>
                    </div>
               </div>
               <div className="submit-area mt-11">
                    <Button isText text="Deliver" className="w-full text-xl" />
               </div>
            </div>
        </>
        
    )
}

export default LogisticDetail