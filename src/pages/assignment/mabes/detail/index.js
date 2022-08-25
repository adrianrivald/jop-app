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
import Cookies from 'universal-cookie';
import Toast from '../../../../components/ui/Toast';


const url = process.env.REACT_APP_API_URL;

function WorkerList (props) {
    return (
        <div className='flex justify-between items-center mt-3 pt-3'>
            <p className='w-8 text-xxs mx-4'>SKU</p>
            <div className='w-40'>
                <p className='font-bold text-sm truncate'>{props.name}</p>
                <p className='text-xxs'>{props.code}</p>
            </div>
            <p className='w-20 text-sm text-flora font-bold'>{props.status}Kerja</p>
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
    const cookies = new Cookies();
    const token = cookies.get('token');
    const navigate = useNavigate();
    const [detailData, setDetailData] = React.useState({})
    const [workerList, setWorkerList] = React.useState([])
    const [isSubmitted, setIsSubmitted] = React.useState(false)

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

    const onSubmitAssignment = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }
        axios.post(`${url}penugasan/izinkan-tapper`, {
            penugasan_id: detailData.id
        }, config).then((res) => {
            setIsSubmitted(true)
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
                        <p className='text-sm font-bold'>{detailData?.mandor?.nama}</p>
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
                                    name={res.nama}
                                    code={res.kode}
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
                    <FlatButton className='w-full rounded-xl text-sm' text='Izinkan' onClick={onSubmitAssignment}/>
                </div>
                <Toast text='Sukses izinkan tugas' onClose={() => setIsSubmitted(false)} isShow={isSubmitted}/> 
            </div>
        </>
    )
}

export default MabesDetail;