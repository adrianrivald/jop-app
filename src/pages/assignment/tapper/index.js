import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/ui/Header";

const url = process.env.REACT_APP_API_URL;

const DetailTapper = () =>{
    const { id } = useParams();

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
        })
    }
    return (
        <>
            <div className="header">
                <Header title="Detail Tapper" isWithBack />
            </div>
            <div className="container">
                tapper
            </div>
        </>
    )
}

export default DetailTapper;