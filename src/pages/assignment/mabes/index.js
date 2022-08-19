import Header from '../../../components/ui/Header';
import Button from '../../../components/button/Button';
import Table from '../../../components/ui/Table';
import React from 'react';
import DropDown from '../../../components/forms/Dropdown';
import DatePicker from '../../../components/forms/DatePicker';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;


function Dropdown (props)  {
    return (
        <div className='mt-1 w-3/6'>
            <h2 className='text-left mb-1 font-bold'>{props.title}</h2>
            <DropDown onChange={props.onChange} option={props.option} />
        </div>
    )
}


function Mabes() {
    const navigate = useNavigate()
    const [listData, setListData] = React.useState([]);
    const [estateList, setEstateList] = React.useState([])
    const [taskList, setTaskList] = React.useState([])
    const [selectedDate, setSelectedDate] = React.useState("");
    const [selectedEstate, setSelectedEstate] = React.useState("")
    const [selectedTask, setSelectedTask] = React.useState("")


    React.useEffect(() => {
        // getList(); will run every time filter has selected
        getEstate();
        getTask();
    },[])

    React.useEffect(() => {
        getList()
    },[selectedDate, selectedEstate, selectedTask])

    const getList = async() => {
        await axios.get(`${url}penugasan/by-mabes?filter[tanggal_tugas]=${selectedDate}&filter[wilayah_tugas]=${selectedEstate}&filter[jenis_tugas]=${selectedTask}&sort=-tanggal_tugas&include=divisi,hancak,field,clone,sistem`,
        {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer 5|T45hz7TdtCoEHVbaxBhtx4tN6exZunEqHGWEILrc`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data.data
            setListData(data)
        })
    }

    const getTask = async() => {
        await axios.get(`${url}jenis-tugas/list`,
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

    const getEstate = async() => {
        await axios.get(`${url}wilayah-tugas/list`,
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

    const onListClick = (id) => {
        navigate(`/assignment/mabes/detail/${id}`)
    }

    return (
        <>
            <div class="header">
                <Header title="Penugasan" isWithBack  />
            </div>
            <div className="container">
                <p className='text-xs'>Penugasan</p>
                <div className='flex justify-between items-center'>
                    <p className='text-md font-bold'>Wilayah & Kerja</p>
                    <Button 
                        isIcon 
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        }
                        onClick={()=> navigate('/assignment/mabes/new-assignment')}
                    />
                </div>
                <div>
                    <div className='flex justify-between items-center gap-2'>
                        <Dropdown title="Estate" option={estateList} onChange={onChangeEstate} />
                        <Dropdown title="Jenis Tugas" option={taskList} onChange={onChangeTask} />
                    </div>
                    <div className='flex justify-between items-center gap-2 mt-2'>
                        <div className='flex-auto w-64'>
                            <DatePicker onChange={onChangeDate} />
                        </div>
                        <div className='flex-auto'>
                            <Button isFilter={true} text='Filter'/>
                        </div>
                    </div>
                </div>
                {
                    listData.map((result) => {
                        return (
                            <div className='my-4'>
                                <Table  
                                    onClick={() => onListClick(result.id)}
                                    isWithFooter
                                    divisi_item={result.divisi.kode}
                                    hancak_item={result.hancak.kode}
                                    block_item={result.field.nama}
                                    clone_item={result.clone.nama}
                                    sistem_item={result.sistem.nama}
                                    // tbListFooter={tbListFooter}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Mabes;