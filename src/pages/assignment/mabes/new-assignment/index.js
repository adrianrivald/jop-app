import React from 'react';
import Header from '../../../../components/ui/Header';
import DropDown from '../../../../components/forms/Dropdown';
import DatePicker from '../../../../components/forms/DatePicker';
import FlatButton from '../../../../components/button/flat';
import TimePicker from '../../../../components/forms/TimePicker';
import axios from '../../../../services/axios';

const url = process.env.REACT_APP_API_URL;

function Dropdown (props) {
    return (
        <div className={`mt-5 ${props.customClass}`}>
            <h2 className='text-left mb-1 font-bold'>{props.title}</h2>
            <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
        </div>
    )
}

function MabesAssignment() {
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
        // getList(); will run every time filter has selected
        getEstate();
        getTask();
        getArea();
        getDivisi();
        getHancak();
        getMandor();
        getSistem();
    },[])

    const getTask = () => {
        try {
            axios.get('https://jop.dudyali.com/api/v1/jenis-tugas/list').then((res) => {
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
        axios.get(`${url}penugasan/list-mandor`).then((res) => {
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

    const onChangeHandler = (e, input_id) => {
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
        axios.post(`${url}penugasan/store`, addInput, config).then((res) => {
            console.log(res)
        })
    }

    return (
        <>
            <div class="header">
                <Header title="Penugasan" isWithBack/>
            </div>
            <div className="container">
                <div>                 
                    <Dropdown title="Wilayah tugas" defaultValue="Pilih wilayah tugas" customClass={'mt-0'} option={estateList} onChange={(e) => onChangeHandler(e, "wilayah_tugas_id")} />
                    <Dropdown title="Divisi" defaultValue="Pilih divisi" option={divisiList} onChange={(e) => onChangeHandler(e, "divisi_id")} />
                    <Dropdown title="Hancak" defaultValue="Pilih hancak" option={hancakList} onChange={(e) => onChangeHandler(e, "hancak_id")} />
                    <Dropdown title="Area/block"  defaultValue="Pilih area" option={areaList} onChange={(e) => onChangeHandler(e, "field_id")} />
                    <Dropdown title="Jenis tugas"  defaultValue="Pilih jenis tugas" option={taskList} onChange={(e) => onChangeHandler(e, "jenis_tugas_id")} />
                    <Dropdown title="Penanggung jawab tugas / Mandor" defaultValue="Pilih penanggung jawab" option={mandorList} onChange={(e) => onChangeHandler(e, "mandor_id")} />
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Clone</h2>
                            <p className='font-bold mt-2.5'>PB 366</p>
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Sistem</h2>
                            <DropDown  defaultValue="Pilih sistem" onChange={(e) => onChangeHandler(e, "sistem_id")} option={sistemList} />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Clone</h2>
                            <DatePicker onChange={(e) => onChangeHandler(e, "tanggal_tugas")} />
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Sistem</h2>
                            <TimePicker onChange={(e) => onChangeHandler(e, "waktu_tugas")} />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Ulangi Tugas</h2>
                            <DropDown defaultValue="Pilih ulangi tugas" onChange={(e) => onChangeHandler(e, "tipe_recurring")} option={recurringList} />
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Batas Pengulangan</h2>
                            <DatePicker onChange={(e) => onChangeHandler(e, "batas_recurring")} />
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

export default MabesAssignment;