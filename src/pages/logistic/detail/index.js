import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Button from "../../../components/button/Button";
import SubmitButton from "../../../components/button/submit";
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

    const onClickBatch = (id, weight, remain_weight, code, name, batchCode) => {
        localStorage.setItem('batch_item', JSON.stringify({
            weight,
            remain_weight,
            code,
            name,
            batchCode
        }))
        navigate(`/logistic/loading/${id}`)
    }

    const handleDeliver = () => {
      localStorage.setItem("loaded_data", JSON.stringify({
        detail: batchDetail?.detail,
        kode: batchDetail?.kode
      }))
      navigate(`/logistic/shipment/${id}`)
    }

    return (
        <>
            <div className="header">
                <Header title="Logistik" isWithBack/>
            </div>
            <div className="container h-screen relative">
               <div className="flex justify-between">
                    <div>
                        <p>Kode Kelompok Barang</p>
                        <p className="font-bold">{batchDetail?.kode}</p>
                    </div>
                    <div>
                        <p>Total Berat Barang</p>
                        <p className="font-bold">{batchDetail?.total_berat} kg</p>
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
                                            <span>{res?.nama}</span> - <span><b>{res?.berat_kirim} kg</b> / {res?.berat_total} kg</span>
                                            <p>{batchDetail?.kode}/{res?.kode}</p>
                                        </div>
                                        <div>
                                            <Button className="text-xs w-16" isText text="Load" onClick={() => onClickBatch(res?.id, res?.berat_total, res?.berat_sisa, res?.kode, res?.nama, batchDetail?.kode)}/>
                                        </div>
                                    </div>
                                    <Divider /> 
                                </div>
                            )
                        })
                    }
               </div>
               <div className="batch-delivered">
                    <p className="font-bold">List Pengiriman</p>
                    {
                        batchDetail?.pengiriman?.length > 0 ? (
                            <div className="flex justify-between mt-5 relative">
                                <div>
                                    <p>LOAD 1: Slab - 105 Kg</p>
                                    <p className="font-bold">TP1-01/02-12-B.007/P1</p>
                                </div>
                                <p className="font-bold absolute right-0 bottom-0">Slab</p>
                            </div>
                        ) : (
                            <div className="flex justify-center p-10">
                                Belum ada pengiriman
                            </div>
                        )
                    }
               </div>
               {/* <div className="submit-area mt-11">
                    <Button isText text="Deliver" className="w-full text-md" onClick={() => navigate(`/logistic/shipment/${id}`)}/>
               </div> */}
               <SubmitButton
                    text="Deliver"
                    onClick={handleDeliver}
               />
            </div>
        </>
        
    )
}

export default LogisticDetail