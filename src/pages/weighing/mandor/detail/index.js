import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/button/Button';
import Title from '../../../../components/title/Title';
import Header from '../../../../components/ui/Header';
import Cookies from 'universal-cookie';
import Toast from '../../../../components/ui/Toast';
import DropDown from '../../../../components/forms/Dropdown';
// import FlatButton from '../../../../components/button/flat';


const url = process.env.REACT_APP_API_URL;

function DetailWeighing() {
    const {id} = useParams()
    const cookies = new Cookies();
    const token = cookies.get('token');
    const [weighingDetail, setWeighingDetail] = React.useState([]);
    const [tapperList, setTapperList] = React.useState([])
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [openedId, setOpenedId] = React.useState({})
    const [alertMessage, setAlertMessage] = React.useState("")
    const [sortedTapper, setSortedTapper] = React.useState("")
    const [rawWeight, setRawWeight] = React.useState()
    const stored_data = JSON.parse(localStorage.getItem('selected_material'));
    const navigate = useNavigate();

    const data = {
        "id": "a0c533a1-ab6d-40e1-ac65-3d25f498578e",
        "petugas_penimbang_id": 10,
        "created_by": 10,
        "kode": "TPH1-01/08-22",
        "batch": "B.001",
        "tanggal_penimbangan": "2022-08-22 23:04:10",
        "status": "berlangsung",
        "curah_hujan": 0,
        "hari_hujan": null,
        "waktu_hujan": null,
        "total_weight": 143,
        "detail": [
          {
            "kode": "P1",
            "nama": "SLAB",
            "berat_total": 107
          },
          {
            "kode": "P2",
            "nama": "CUP LUMP",
            "berat_total": 20
          },
          {
            "kode": "P3",
            "nama": "Latek",
            "berat_total": 16
          }
        ],
        "transaction": [
          {
            "nama": "Wirda Riyanti M.M.",
            "kode": "P6673",
            "skema_kerja": "SKU",
            "berat_total": 68,
            "detail": [
              {
                "kode": "P1",
                "nama": "SLAB",
                "berat_wet": 67
              },
              {
                "kode": "P2",
                "nama": "CUP LUMP",
                "berat_wet": 0
              },
              {
                "kode": "P3",
                "nama": "Latek",
                "berat_wet": 1
              }
            ],
            "foto": []
          },
          {
            "nama": "Jane Suartini S.Ked",
            "kode": "P3185",
            "skema_kerja": "Bulanan",
            "berat_total": 75,
            "detail": [
              {
                "kode": "P1",
                "nama": "SLAB",
                "berat_wet": 40
              },
              {
                "kode": "P2",
                "nama": "CUP LUMP",
                "berat_wet": 20
              },
              {
                "kode": "P3",
                "nama": "Latek",
                "berat_wet": 15
              }
            ],
            "foto": [
              {
                "id": 1,
                "path": "transaksi/timbang/ulYAN8NDPn5JsoPeN4CvwidBWg1XFwsCnHjHwW0y.png"
              }
            ]
          }
        ]
      }
    
    React.useEffect(() => {
        getWeighingDetail();

        localStorage.removeItem('transaction_id')
        localStorage.removeItem('scanned_tapper')
        localStorage.removeItem('weighing_data')
        localStorage.removeItem('weighing_transaction')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const getWeighingDetail = (sort) => {
        // setWeighingDetail(data)

        axios.get(`${url}penimbangan/detail/${id}?include=petugas_timbang`,
        {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data
            setWeighingDetail(data)
            localStorage.setItem('weighing_code', data?.kode)
            setRawWeight(data?.detail?.find((_, idx) => idx === 0).berat_total)
            const tappers = data?.transaction.map((res) => {
                return {
                    value: res?.tapper?.kode,
                    label: res?.tapper?.nama
                }
            })
            setTapperList(tappers)
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
        setSortedTapper(e.target.value)
    }
    
    const [selectedRaw, setSelectedRaw] = React.useState('P1')
    const onChangeRaw = (e) => {
        setSelectedRaw(e.target.value)
        setRawWeight(weighingDetail?.detail?.find((res) => res.kode === e.target.value).berat_total)
    }

    const onClickDetail = (tapper_id, transaction_id, detail, transaction) => {
        localStorage.setItem('transaction_id', transaction_id)
        localStorage.setItem('scanned_tapper', tapper_id)
        localStorage.setItem('weighing_data', JSON.stringify(detail))
        localStorage.setItem('weighing_transaction', JSON.stringify(transaction))
        navigate(`tapper/${tapper_id}`)
    }

    return (
        <>
            <div className="header">
                <Header title="Penimbangan TPH" isWithBack />
            </div>
            <div className="container">
                <p className='text-sm font-bold'>{weighingDetail?.kode}</p>
                <div className="flex justify-between my-3 gap-3">
                        <div className="p-3 rounded-xl border border-cloud w-full">
                            <p className="text-xxs mb-1">Jumlah Penimbangan</p>        
                            <DropDown 
                                option={weighingDetail?.detail?.map((res) => {
                                    return {
                                        value: res.kode,
                                        label: res.nama
                                    }
                                })}
                                onChange={onChangeRaw}
                                defaultValue={weighingDetail?.detail?.[0]?.nama}
                            />
                            <p className="text-4xl font-bold">{rawWeight} kg</p>  
                            <p className="text-xxs">Terakhir penimbangan:</p>        
                            <p className="text-xxs font-bold">
                                {   weighingDetail?.transaction?.length > 0 ?
                                    <>
                                        {weighingDetail?.transaction[0].tapper?.nama}, &nbsp;
                                        {weighingDetail?.transaction[0].detail?.find(res => res.kode === selectedRaw)?.nama}&nbsp; 
                                        {weighingDetail?.transaction[0].detail?.find(res => res.kode === selectedRaw)?.berat_wet} kg 
                                    </>
                                    : null
                                }
                            </p>        

                        </div>
                        <div className="p-3 rounded-xl border border-cloud w-full">
                            <p className="text-xxs mb-10">Total Berat Timbang (WET)</p>        
                            <p className="text-4xl font-bold">{weighingDetail?.total_weight}kg</p>
                        </div>
                    </div>
                    { 
                        weighingDetail?.detail?.map((res, id) => {
                            return (
                                <div className={`flex justify-between items-center text-lg my-1 ${stored_data.find(val => val.id === id) ? '' : 'opacity-50'}`}>
                                    <p>{res.kode} - <span className='font-bold'>{res.nama}</span></p>
                                    <p className='font-bold'>{res.berat_total}<span className='font-normal'> kg</span></p>
                                </div> 
                            )
                        })
                    }

                    <div className="flex justify-between items-center text-lg mt-3">
                        <p>Subtotal</p>
                        <p className='font-bold'>{weighingDetail?.total_weight}<span className='font-normal'> kg</span></p>
                    </div> 
                    <div className="scan mt-3">
                        <Button 
                            isIcon 
                            icon={
                                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0555 0C11.2521 0 12.2222 0.970047 12.2222 2.16667V3.5C12.2222 3.77614 11.9983 4 11.7222 4C11.446 4 11.2222 3.77614 11.2222 3.5V2.16667C11.2222 1.52233 10.6998 1 10.0555 1H8.72217C8.44603 1 8.22217 0.77614 8.22217 0.5C8.22217 0.22386 8.44603 0 8.72217 0H10.0555ZM3.72217 0C3.9983 0 4.22217 0.22386 4.22217 0.5C4.22217 0.77614 3.9983 1 3.72217 1H2.38883C1.7445 1 1.22217 1.52233 1.22217 2.16667V3.5C1.22217 3.77614 0.998301 4 0.722168 4C0.446034 4 0.222168 3.77614 0.222168 3.5V2.16667C0.222168 0.970047 1.19223 0 2.38883 0H3.72217ZM11.2222 8.5C11.2222 8.22387 11.446 8 11.7222 8C11.9983 8 12.2222 8.22387 12.2222 8.5V9.83333C12.2222 11.0299 11.2521 12 10.0555 12H8.72217C8.44603 12 8.22217 11.7761 8.22217 11.5C8.22217 11.2239 8.44603 11 8.72217 11H10.0555C10.6998 11 11.2222 10.4777 11.2222 9.83333V8.5ZM0.222168 8.5C0.222168 8.22387 0.446034 8 0.722168 8C0.998301 8 1.22217 8.22387 1.22217 8.5V9.83333C1.22217 10.4777 1.7445 11 2.38883 11H3.72217C3.9983 11 4.22217 11.2239 4.22217 11.5C4.22217 11.7761 3.9983 12 3.72217 12H2.38883C1.19223 12 0.222168 11.0299 0.222168 9.83333V8.5ZM9.22217 5.5C9.49831 5.5 9.72217 5.72387 9.72217 6C9.72217 6.27613 9.49831 6.5 9.22217 6.5H3.22217C2.94603 6.5 2.72217 6.27613 2.72217 6C2.72217 5.72387 2.94603 5.5 3.22217 5.5H9.22217Z" fill="white"/>
                                </svg>
                            }
                            text="Scan Timbang"
                            className="w-full mt-2"
                            onClick={()=> navigate(`scan`)}
                        />
                    </div>
                <div className="history mt-5">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <Title text={'Daftar timbang'} className="text-sm" />
                            <p className='text-xxs'>{''}</p>
                        </div>
                        <div>
                            <p className='text-xxs'>Tapper</p>
                            <DropDown onChange={onSort} option={tapperList} />
                        </div>
                    </div>
                    <div className={`accordion divide-y divide-cloud`}>
                        {
                            weighingDetail?.transaction?.length > 0 ? weighingDetail?.transaction?.map((res, idx) => {
                                return (
                                    openedId[`item_${idx}`] === true ? (
                                        <div className="bg-white divide-y divide-cloud">
                                            <div className='flex justify-between items-center p-3 transition-transform cursor-pointer' onClick={() => onCollapse(idx)}>
                                                <p className='text-xs'>Bulanan</p>
                                                <div className='w-40'>
                                                    <p className='font-bold text-sm truncate'>{res?.tapper?.nama}</p>
                                                    <p className='text-xxs'>{res?.tapper?.kode}</p>
                                                </div>
                                                <div className=''>
                                                    <p className='text-xxs'>Sub Total</p>
                                                    <p className='font-bold text-sm truncate'>{res.berat_total} Kg</p>
                                                </div>
                                                <div className="cursor-pointer">
                                                    <svg className="rotate-90" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002" stroke="#A7A29A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>   
                                            <div className=" p-3 ">
                                                {
                                                    res?.detail?.map((res, idx) => {
                                                        return (
                                                            <>
                                                                <div className='flex justify-between items-center mt-3 w-full'>
                                                                    <p className="w-2/4">{res?.kode} - <span className="font-bold">{res?.nama}</span></p>
                                                                    <p className="w-2/4 font-bold text-right">{res?.berat_wet} kg</p>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                                <div className='flex justify-center mt-3'>
                                                    <Button isText text="Lihat Detail" onClick={() => onClickDetail(res?.tapper?.id, res?.id, res?.detail, weighingDetail?.transaction[idx])}/>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='flex justify-between items-center p-3 transition-transform cursor-pointer' onClick={() => onExpand(idx)} >
                                            <p className='text-xs'>Bulanan</p>
                                            <div className='w-40'>
                                                <p className='font-bold text-sm truncate'>{res?.tapper?.nama}</p>
                                                <p className='text-xxs'>{res?.tapper?.kode}</p>
                                            </div>
                                            <div className=''>
                                                <p className='text-xxs'>Sub Total</p>
                                                <p className='font-bold text-sm truncate'>{res.berat_total} Kg</p>
                                            </div>
                                            <div className="cursor-pointer">
                                                <svg  width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002" stroke="#A7A29A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>    
                                    )
                                )
                            }) : (
                                <div className='flex justify-center'>No Data</div>
                            )
                        }
                    </div>
                </div>
                <Toast text={alertMessage} onClose={() => setIsSubmitted(false)} isShow={isSubmitted}/> 
            </div>
        </>
    )
}

export default DetailWeighing;