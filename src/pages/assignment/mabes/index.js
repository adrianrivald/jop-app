import axios from '../../../services/axios';
import moment from 'moment';
import Header from '../../../components/ui/Header';
import Button from '../../../components/button/Button';
import Table from '../../../components/ui/Table';
import React from 'react';
import DropDown from '../../../components/forms/Dropdown';
import DatePicker from '../../../components/forms/DatePicker';
import { useNavigate } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL;


function Dropdown (props)  {
    return (
        <div className='mt-1 w-3/6'>
            <h2 className='text-left text-xs mb-1'>{props.title}</h2>
            <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
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
    const [filterCount, setFilterCount] = React.useState(0)
    const [isEmpty, setIsEmpty] = React.useState(false)
    const [isNoFilter, setIsNoFilter] = React.useState(false)
    const [selectedFilter, setSelectedFilter] = React.useState({})
    const sortOption = [
        {
            value: 'asc',
            label: 'Latest'
        },
        {
            value: 'desc',
            label: 'Oldest'
        }
    ]

    React.useEffect(() => {
        getEstate();
        getTask();
    },[])

    React.useEffect(() => {
        setFilterCount(Object.keys(selectedFilter).length)
    }, [selectedDate, selectedEstate, selectedFilter, selectedTask])


    const getList = (sort) => {
        if (!selectedTask && !selectedEstate && !selectedDate) {
            setIsNoFilter(true)
        } else if (selectedTask || selectedDate || selectedEstate) {
            axios.get(`${url}penugasan/by-mabes?filter[tanggal_tugas]=${selectedDate}&filter[wilayah_tugas]=${selectedEstate}&filter[jenis_tugas]=${selectedTask}&sort=${sort === 'asc' ? '-' : ''}tanggal_tugas&include=divisi,hancak,field,clone,sistem,mandor,pekerja`)
            .then((res) => {
               const data = res.data.data.data
               setListData(data)
               setIsEmpty(false)
               setIsNoFilter(false)
               if (data.length === 0 ) {
                    setIsEmpty(true)
               }
           })
        }
    }

    const getTask = () => {
        axios.get(`${url}jenis-tugas/list`)
        .then((res) => {
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
        axios.get(`${url}wilayah-tugas/list`)
        .then((res) => {
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
        setSelectedFilter({
            ...selectedFilter,
            selected_date: true
        })
    }

    const onChangeEstate = (e) => {
        setSelectedEstate(e.target.value)
        setSelectedFilter({
            ...selectedFilter,
            selected_estate: true
        })
    }

    const onChangeTask = (e) => {
        setSelectedTask(e.target.value)
        setSelectedFilter({
            ...selectedFilter,
            selected_task: true
        })
    }

    const onListClick = (id) => {
        navigate(`/assignment/mabes/detail/${id}`)
    }

    const onFilter = () => {
        getList()
    }

    const onChangeSort = (e) => {
        console.log(e.target.value)
        const sort = e.target.value
        getList(sort)
    }

    return (
        <>
            <div class="header">
                <Header title="Penugasan" isWithBack  />
            </div>
            <div className="container">
                <p className='text-xs'>Penugasan</p>
                <div className='flex justify-between items-center'>
                    <p className='text-sm font-bold'>Wilayah & Kerja</p>
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
                        <Dropdown title="Estate" defaultValue="Pilih estate" option={estateList} onChange={onChangeEstate} />
                        <Dropdown title="Jenis Tugas" defaultValue="Pilih jenis tugas" option={taskList} onChange={onChangeTask} />
                    </div>
                    <div className='flex justify-between items-center gap-2 mt-2'>
                        <div className='flex-auto w-64'>
                            <DatePicker onChange={onChangeDate} />
                        </div>
                        <div className='flex-auto'>
                            <Button filterCount={filterCount} isFilter={true} onClick={onFilter} text='Filter'/>
                        </div>
                        <DropDown defaultValue="Urutkan" option={sortOption} onChange={onChangeSort} />
                    </div>
                </div>
                {
                    !isNoFilter && !isEmpty ? listData.map((result) => {
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
                                    mandor_item={result.mandor.nama}
                                    status_tugas_item={result.status_tugas === 'menunggu-persetujuan' ? 'menunggu' : result.status_tugas}
                                    tapper_item={result.hancak.jumlah_rekomendasi_tapper}
                                    tanggal_tugas_item={moment(result.tanggal_tugas, 'YYYY-MM-DD hhm:ss').format('hh:mm')}
                                    worker_total={result.pekerja.length}
                                />
                            </div>
                        )
                    }) : isNoFilter && !isEmpty ?
                    <div className='flex my-4 justify-center'> Please select filter first </div>
                    :
                    <div className='flex my-4 justify-center'> No Data </div>
                }
            </div>
        </>
    )
}

export default Mabes;