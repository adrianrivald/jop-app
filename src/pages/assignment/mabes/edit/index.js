import React from 'react';
import Header from '../../../../components/ui/Header';
import Button from '../../../../components/button/Button';
import DropDown from '../../../../components/forms/Dropdown';
import DatePicker from '../../../../components/forms/DatePicker';
import FlatButton from '../../../../components/button/flat';
import TimePicker from '../../../../components/forms/TimePicker';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

function Dropdown (props) {
    return (
        <div className='mt-5'>
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
    const [divisiList, setDivisiList] = React.useState([])
    const [hancakList, setHancakList] = React.useState([])
    const [areaList, setAreaList] = React.useState([])
    const [mandorList, setMandorList] = React.useState([])
    const [selectedDate, setSelectedDate] = React.useState("");
    const [selectedEstate, setSelectedEstate] = React.useState("")
    const [selectedTask, setSelectedTask] = React.useState("")
    const recurringList = [
        {
            label: "Harian"
        },
        {
            label: "Mingguan"
        },
        {
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

    const getTask = () => {
        axios.get('https://jop.dudyali.com/api/v1/jenis-tugas/list',
        {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer 5|T45hz7TdtCoEHVbaxBhtx4tN6exZunEqHGWEILrc`,
                Accept: 'application/json'
            }
        }).then((res) => {
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
        axios.get('https://jop.dudyali.com/api/v1/wilayah-tugas/list',
        {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer 5|T45hz7TdtCoEHVbaxBhtx4tN6exZunEqHGWEILrc`,
                Accept: 'application/json'
            }
        }).then((res) => {
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
        axios.get('https://jop.dudyali.com/api/v1/divisi/list',
        {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer 5|T45hz7TdtCoEHVbaxBhtx4tN6exZunEqHGWEILrc`,
                Accept: 'application/json'
            }
        }).then((res) => {
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
        axios.get('https://jop.dudyali.com/api/v1/hancak/list',
        {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer 5|T45hz7TdtCoEHVbaxBhtx4tN6exZunEqHGWEILrc`,
                Accept: 'application/json'
            }
        }).then((res) => {
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
        axios.get('https://jop.dudyali.com/api/v1/field/list',
        {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer 5|T45hz7TdtCoEHVbaxBhtx4tN6exZunEqHGWEILrc`,
                Accept: 'application/json'
            }
        }).then((res) => {
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
        axios.get('https://jop.dudyali.com/api/v1/penugasan/list-mandor',
        {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer 5|T45hz7TdtCoEHVbaxBhtx4tN6exZunEqHGWEILrc`,
                Accept: 'application/json'
            }
        }).then((res) => {
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

    const onChangeDate = (e) => {
        setSelectedDate(e.target.value)
    }

    const onChangeEstate = (e) => {
        console.log(e.target.value)
        setSelectedEstate(e.target.value)
    }

    const onChangeTask = (e) => {
        console.log(e.target.value)
        setSelectedTask(e.target.value)
    }

    const handleSubmit = async() => {
        // await axios.post()
    }

    return (
        <>
            <div class="header">
                <Header title="Penugasan" isWithBack isWithNotification isWithBurgerMenu />
            </div>
            <div className="container">
                <form action='' method='post'>                 
                    <Dropdown title="Pilih wilayah tugas" option={estateList} onChange={onChangeEstate} defaultValue={detailData?.wilayah_tugas?.nama} />
                    <Dropdown title="Divisi" option={divisiList} onChange={onChangeEstate} defaultValue={detailData?.divisi?.id}/>
                    <Dropdown title="Hancak" option={hancakList} onChange={onChangeEstate} defaultValue={detailData?.hancak?.id}/>
                    <Dropdown title="Area/block" option={areaList} onChange={onChangeEstate} defaultValue={detailData?.field?.id}/>
                    <Dropdown title="Pilih jenis tugas" option={taskList} onChange={onChangeEstate} defaultValue={detailData?.jenis_tugas?.id} />
                    <Dropdown title="Pilih penanggung jawab tugas / Mandor" option={mandorList} onChange={onChangeEstate} defaultValue={detailData?.mandor?.id} />
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Clone</h2>
                            <p className='font-bold mt-2.5'>{detailData?.clone?.nama}</p>
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Sistem</h2>
                            <DropDown onChange={() => console.log('')} option={[{label: '1/2SD/3'}]} defaultValue={detailData?.sistem?.id} />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Clone</h2>
                            <DatePicker />
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Sistem</h2>
                            <TimePicker />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Ulangi Tugas</h2>
                            <DropDown onChange={() => console.log('')} option={[{label: 'Harian'}]} />
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Batas Pengulangan</h2>
                            <DatePicker />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-11'>
                        <FlatButton className='w-6/12 rounded-xl' role='white' text='Kembali' onClick={() => console.log()} />
                        <FlatButton className='w-6/12 rounded-xl' role='green' text='Buat' onClick={handleSubmit} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default MabesEdit;