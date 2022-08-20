import React from 'react';
import axios from '../../../../services/axios';
import moment from 'moment';
import Header from '../../../../components/ui/Header';
import Button from '../../../../components/button/Button';
import DropDown from '../../../../components/forms/Dropdown';
import DatePicker from '../../../../components/forms/DatePicker';
import FlatButton from '../../../../components/button/flat';
import TimePicker from '../../../../components/forms/TimePicker';
import { useNavigate, useParams } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL;

function Dropdown (props) {
    return (
        <div className={`mt-5 ${props.style}`}>
            <h2 className='text-left mb-1'>{props.title}</h2>
            <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
        </div>
    )
}

function MabesEdit() {
    const {id} = useParams()
    const navigate = useNavigate();
    const [detailData, setDetailData] = React.useState({})
    const [workerList, setWorkerList] = React.useState([])
    const [listData, setListData] = React.useState([]);
    const [estateList, setEstateList] = React.useState([])
    const [taskList, setTaskList] = React.useState([])
    const [sistemList, setSistemList] = React.useState([])
    const [divisiList, setDivisiList] = React.useState([])
    const [hancakList, setHancakList] = React.useState([])
    const [areaList, setAreaList] = React.useState([])
    const [mandorList, setMandorList] = React.useState([])
    const [addInput, setAddInput] = React.useState({})
    const recurringList = [
        {
            value: "harian",
            label: "Harian"
        },
        {
            value: "mingguan",
            label: "Mingguan"
        },
        {
            value: "bulanan",
            label: "Bulanan"
        }
    ]

    React.useEffect(() => {
        getDetail();
        getEstate();
        getTask();
        getArea();
        getDivisi();
        getHancak();
        getMandor();
        getSistem();

    },[])
    
    
    const getDetail = () => {
        axios.get(`${url}penugasan/detail/${id}?include=wilayah_tugas,jenis_tugas,divisi,hancak,field,clone,sistem,mandor,pekerja.skema_kerja`)
        .then((res) => {
            const data = res.data.data;
            setDetailData(data)
            setWorkerList(data.pekerja)
            
        setAddInput({
            "wilayah_tugas_id": data?.wilayah_tugas?.id,
            "divisi_id": data?.divisi?.id,
            "hancak_id": data?.hancak?.id,
            "field_id": data?.field?.id,
            "jenis_tugas_id": data?.jenis_tugas?.id,
            "mandor_id": data?.mandor?.id,
            "sistem_id": data?.sistem?.id,
            "tanggal_tugas": moment(data?.tanggal_tugas, 'YYYY-MM-DD hh:mm').format('YYYY-MM-DD'),
            "is_recurring": 1,
            // "tipe_recurring": detailData?.wilayah_tugas?.id,
            // "batas_recurring": detailData?.wilayah_tugas?.id
        })
        })
    }
    
    const getSistem = () => {
        axios.get(`${url}sistem/list`).then((res) => {
            const data = res.data.data.data
            const sistemData = data.map((res) => {
                return {
                    value: res.id,
                    label: res.nama
                }
            })
            setSistemList(sistemData)
        })
    }

    const getTask = () => {
        axios.get('https://jop.dudyali.com/api/v1/jenis-tugas/list').then((res) => {
            const data = res.data.data.data
            const taskData = data.map((res) => {
                return {
                    value: res.id,
                    label: res.nama
                }
            })
            setTaskList(taskData)
        })

    }

    const getEstate = () => {
        axios.get('https://jop.dudyali.com/api/v1/wilayah-tugas/list').then((res) => {
            const data = res.data.data.data
            const estateData = data.map((res) => {
                return {
                    value: res.id,
                    label: res.nama
                }
            })
            setEstateList(estateData)
        })
    }
    
    const getDivisi = () => {
        axios.get('https://jop.dudyali.com/api/v1/divisi/list').then((res) => {
            const data = res.data.data.data
            const divisiData = data.map((res) => {
                return {
                    value: res.id,
                    label: res.nama
                }
            })
            setDivisiList(divisiData)
        })
    }
    
    const getHancak = () => {
        axios.get('https://jop.dudyali.com/api/v1/hancak/list').then((res) => {
            const data = res.data.data.data
            const hancakData = data.map((res) => {
                return {
                    value: res.id,
                    label: res.nama
                }
            })
            setHancakList(hancakData)
        })
    }
    
    const getArea = () => {
        axios.get('https://jop.dudyali.com/api/v1/field/list').then((res) => {
            const data = res.data.data.data
            const areaData = data.map((res) => {
                return {
                    value: res.id,
                    label: res.nama
                }
            })
            setAreaList(areaData)
        })
    }
    
    const getMandor = () => {
        axios.get('https://jop.dudyali.com/api/v1/penugasan/list-mandor').then((res) => {
            const data = res.data.data.data
            const mandorData = data.map((res) => {
                return {
                    value: res.id,
                    label: res.nama
                }
            })
            setMandorList(mandorData)
        })
    }
    
    const onChangeHandler = (e, input_id) => {
        console.log(e.target.value)
        setAddInput((prev) => ({
            ...prev ,
            "is_recurring" : 1,
            [input_id]: e.target.value
        }))
        console.log(addInput, 'addinput')
    }

    
    const handleSubmit = () => {
        const config = {
            headers: {
                Authorization: `Bearer 5|T45hz7TdtCoEHVbaxBhtx4tN6exZunEqHGWEILrc`,
                Accept: 'application/json'
            }
        }
        axios.put(`${url}penugasan/update/${id}`, addInput, config).then((res) => {
            console.log(res)
        })
    }


    return (
        <>
            <div class="header">
                <Header title="Penugasan" isWithBack isWithNotification isWithBurgerMenu />
            </div>
            <div className="container">
                <div>                 
                    <Dropdown style="mt-0" title="Pilih wilayah tugas" option={estateList} onChange={(e) => onChangeHandler(e, "wilayah_tugas_id")} defaultValue={detailData?.wilayah_tugas?.nama} />
                    <Dropdown title="Divisi" option={divisiList} onChange={(e) => onChangeHandler(e, "divisi_id")} defaultValue={detailData?.divisi?.nama}/>
                    <Dropdown title="Hancak" option={hancakList} onChange={(e) => onChangeHandler(e, "hancak_id")} defaultValue={detailData?.hancak?.nama}/>
                    <Dropdown title="Area/block" option={areaList} onChange={(e) => onChangeHandler(e, "field_id")} defaultValue={detailData?.field?.nama}/>
                    <Dropdown title="Pilih jenis tugas" option={taskList} onChange={(e) => onChangeHandler(e, "jenis_tugas_id")} defaultValue={detailData?.jenis_tugas?.nama} />
                    <Dropdown title="Pilih penanggung jawab tugas / Mandor" option={mandorList} onChange={(e) => onChangeHandler(e, "mandor_id")} defaultValue={detailData?.mandor?.nama} />
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Clone</h2>
                            <p className='font-bold mt-2.5'>{detailData?.kode}</p>
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Sistem</h2>
                            <DropDown onChange={(e) => onChangeHandler(e, "sistem_id")} option={sistemList} defaultValue={detailData?.sistem?.nama} />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Clone</h2>
                            <DatePicker defaultValue={moment(detailData?.tanggal_tugas, 'YYYY-MM-DD hh:mm').format('YYYY-MM-DD')} onChange={(e) => onChangeHandler(e, "tanggal_tugas")} />
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Sistem</h2>
                            <TimePicker />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Ulangi Tugas</h2>
                            <DropDown onChange={(e) => onChangeHandler(e, "tipe_recurring")} option={recurringList} />
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Batas Pengulangan</h2>
                            <DatePicker onChange={(e) => onChangeHandler(e, "batas_recurring")}/>
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-11'>
                        <FlatButton className='w-6/12 rounded-xl' role='white' text='Kembali' onClick={() => console.log()} />
                        <FlatButton className='w-6/12 rounded-xl' role='green' text='Buat' onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MabesEdit;