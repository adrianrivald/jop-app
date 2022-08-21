import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/button/Button';
import FlatButton from '../../../../components/button/flat';
import Subtitle from '../../../../components/title/Subtitle';
import Title from '../../../../components/title/Title';
import Header from '../../../../components/ui/Header';
import Table from '../../../../components/ui/Table';


const url = process.env.REACT_APP_API_URL;

function WorkerList (props) {
    return (
        <div className='flex justify-between items-center mt-3 pt-3'>
            <p className='text-xs mx-4'>SKU</p>
            <div>
                <p className='font-bold text-lg'>{props.name}</p>
                <p className='text-xs'>{props.id}</p>
            </div>
            <p className='text-xl text-flora font-bold'>{props.status}</p>
            <div>
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002" stroke="#A7A29A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <hr />
        </div>
    )
}

function MabesDetail() {
    const {id} = useParams()
    const navigate = useNavigate();
    const [detailData, setDetailData] = React.useState({})
    const [workerList, setWorkerList] = React.useState([])
    
    React.useEffect(() => {
        getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getDetail = async() => {
        await axios.get(`${url}penugasan/detail/${id}?include=wilayah_tugas,jenis_tugas,divisi,hancak,field,clone,sistem,mandor,pekerja.skema_kerja`,
        {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer 5|T45hz7TdtCoEHVbaxBhtx4tN6exZunEqHGWEILrc`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data;
            setDetailData(data)
            setWorkerList(data.pekerja)
            console.log(data,'data')
        })
    }

    return (
        <>
            <div className="header">
                <Header title="Penugasan" isWithBack />
            </div>
            <div className="container">
                <div className='flex justify-between items-center'>
                    <Title text={detailData?.wilayah_tugas?.nama} />
                    <Button onClick={() => navigate(`/assignment/mabes/detail/${id}/edit`)} isText={true} text={"Edit"}/>
                </div>
                <div className='mt-6'>
                    <Subtitle text='Informasi Wilayah & Cuaca' />
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
                        <p className='text-l'>{detailData?.mandor?.nama}</p>
                    </div>
                    <div>
                        <p className='text-xs'>{moment(detailData?.tanggal_tugas, 'YYYY-MM-DD hh:mm:ss').format('D MMMM, YYYY')}</p>
                        <p className='text-xs'>{moment(detailData?.tanggal_tugas, 'YYYY-MM-DD hh:mm:ss').format('hh:mm')} - selesai</p>
                    </div>
                </div>   
                <div className='divide-y divide-cloud'>
                    {
                        workerList?.length > 0 ? workerList.map((res, idx) => {
                            return (
                                <WorkerList 
                                    name={res.name}
                                    id={res.id}
                                    status={res.status}
                                />
                            )
                        }) : (
                            <div className=" mt-3 pt-3 text-center">
                                No data
                            </div>
                        )
                    }
                </div> 
                <div className='mt-11'>
                    <FlatButton className='w-full rounded-xl' text='Izinkan'/>
                </div>        
            </div>
        </>
    )
}

export default MabesDetail;