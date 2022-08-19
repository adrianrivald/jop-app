import React from 'react';
import Header from '../../../../components/ui/Header';
import Button from '../../../../components/button/Button';
import DropDown from '../../../../components/forms/Dropdown';
import DatePicker from '../../../../components/forms/DatePicker';
import FlatButton from '../../../../components/button/flat';
import TimePicker from '../../../../components/forms/TimePicker';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Dropdown (props) {
    return (
        <div className='mt-5'>
            <h2 className='text-left mb-1 font-bold'>{props.title}</h2>
            <DropDown onChange={props.onChange} option={props.option} />
        </div>
    )
}

function MabesAssignment() {
    const navigate = useNavigate()
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
        // getList(); will run every time filter has selected
        getEstate();
        getTask();
        getArea();
        getDivisi();
        getHancak();
        getMandor();
    },[])

    const getTask = () => {
        try {
            axios.get('https://jop.dudyali.com/api/v1/jenis-tugas/list',
            {
                url: process.env.REACT_APP_API_URL,
                headers: {
                    Authorization: `Bearer 5|T45hz7TdtCoEHVbaxBhtx4tN6exZunEqHGWEILrc`,
                    Accept: 'application/json'
                }
            }).then((res) => {
                const data = res?.data?.data?.data
                const taskData = data?.map((res) => {
                    return {
                        value: res.id,
                        label: res.nama
                    }
                })
                setTaskList(taskData)
            })
        } catch (error) {
            console.error(error.message)
        }
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

    const onChangeHandler = () => {
        console.log('')
    }

    return (
        <>
            <div class="header">
                <Header title="Penugasan" isWithBack isWithNotification isWithBurgerMenu />
            </div>
            <div className="container">
                <div>                 
                    <Dropdown title="Pilih wilayah tugas" option={estateList} onChange={onChangeHandler} />
                    <Dropdown title="Divisi" option={divisiList} onChange={onChangeHandler} />
                    <Dropdown title="Hancak" option={hancakList} onChange={onChangeHandler} />
                    <Dropdown title="Area/block" option={areaList} onChange={onChangeHandler} />
                    <Dropdown title="Pilih jenis tugas" option={taskList} onChange={onChangeHandler} />
                    <Dropdown title="Pilih penanggung jawab tugas / Mandor" option={mandorList} onChange={onChangeHandler} />
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Clone</h2>
                            <p className='font-bold mt-2.5'>PB 366</p>
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Sistem</h2>
                            <DropDown onChange={onChangeHandler} option={[{label: '1/2SD/3'}]} />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Clone</h2>
                            <DatePicker onChange={onChangeHandler} />
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Sistem</h2>
                            <TimePicker onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Ulangi Tugas</h2>
                            <DropDown onChange={onChangeHandler} option={recurringList} />
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Batas Pengulangan</h2>
                            <DatePicker onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-11'>
                        <FlatButton className='w-6/12 rounded-xl' role='white' text='Kembali' onClick={() => console.log()} />
                        <FlatButton className='w-6/12 rounded-xl' role='green' text='Buat' onClick={() => console.log()} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MabesAssignment;