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
                                            <span>{res?.kode}</span> - <span>{res?.berat} kg</span>
                                        </div>
                                        <div>
                                            <Button isText text="Load" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
               </div>

            </div>
        </>
        
    )
}

export default LogisticDetail