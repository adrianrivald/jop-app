import React from 'react';
import Header from '../../../../components/ui/Header';
import DropDown from '../../../../components/forms/Dropdown';
import DatePicker from '../../../../components/forms/DatePicker';
import FlatButton from '../../../../components/button/flat';
import TimePicker from '../../../../components/forms/TimePicker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Toast from '../../../../components/ui/Toast';

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
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token')
    const [estateList, setEstateList] = React.useState([])
    const [taskList, setTaskList] = React.useState([])
    const [sistemList, setSistemList] = React.useState([])
    const [divisiList, setDivisiList] = React.useState([])
    const [hancakList, setHancakList] = React.useState([])
    const [areaList, setAreaList] = React.useState([])
    const [mandorList, setMandorList] = React.useState([])
    const [addInput, setAddInput] = React.useState({})
    const [dateTimeInput, setDateTimeInput] = React.useState({})
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [isRecurring, setIsRecurring] = React.useState(false)
    const [clone, setClone] = React.useState("")

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
        getEstate();
        getTask();
        getArea();
        // // getDivisi();
        // // getHancak();
        getMandor();
        getSistem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    React.useEffect(() => {
        if(addInput.wilayah_tugas_id){
            getDivisi();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addInput.wilayah_tugas_id])


    React.useEffect(() => {
        if(addInput.divisi_id){
            getHancak();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addInput.divisi_id])

    React.useEffect(() => {
        if(addInput.wilayah_tugas_id){
            getDivisi();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addInput.wilayah_tugas_id])


    React.useEffect(() => {
        if(addInput.divisi_id){
            getHancak();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addInput.divisi_id])

    const getTask = () => {
        try {
            axios.get('https://jop.dudyali.com/api/v1/jenis-tugas/list', {
                url: process.env.REACT_APP_API_URL,
                headers: {
                    Authorization: `Bearer ${token}`,
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
        axios.get('https://jop.dudyali.com/api/v1/wilayah-tugas/list', {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
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
        axios.get(`${url}divisi/by-wilayah-tugas/${addInput.wilayah_tugas_id}?include=wilayah_tugas`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
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
        axios.get(`${url}hancak/by-divisi/${addInput.divisi_id}?include=divisi`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
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
        axios.get('https://jop.dudyali.com/api/v1/field/list', {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
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
        axios.get(`${url}penugasan/list-mandor`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
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

    const getSistem = () => {
        axios.get(`${url}sistem/list`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
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

    const getClone = (id) => {
        axios.get(`${url}field/by-uuid/${id}?include=clone`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data
            setClone(data.clone.nama)
        })
    }

    const onChangeHandler = (e, input_id) => {
        setAddInput((prev) => ({
            ...prev ,
            "is_recurring" : isRecurring ? 1 : 0,
            [input_id]: e.target.value
        }))
        if (input_id === "field_id") {
            getClone(e.target.value)
        }
    }

    const handleSubmit = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }
        axios.post(`${url}penugasan/store`, addInput, config).then((res) => {
            setIsSubmitted(true)
            setTimeout(() => {
                setIsSubmitted(false)
            }, 3000);
        })
    }
    const onChangeDate = (e) => {
        setDateTimeInput({
            ...dateTimeInput,
            'date' : e.target.value
        })
        setAddInput({
           ...addInput, 
            'tanggal_tugas' : Object.values(dateTimeInput).join(' ')}
        )
    }

    const onChangeTime = (e) => {
        setDateTimeInput({
            ...dateTimeInput,
            'time' : e.target.value
        })
        setAddInput({
            ...addInput, 
             'tanggal_tugas' : Object.values(dateTimeInput).join(' ')}
         )
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
                            <p className='font-bold mt-2.5'>{clone}</p>
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Sistem</h2>
                            <DropDown  defaultValue="Pilih sistem" onChange={(e) => onChangeHandler(e, "sistem_id")} option={sistemList} />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Tanggal Tugas</h2>
                            <DatePicker onChange={(e) => onChangeDate(e)} />
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Waktu Tugas</h2>
                            <TimePicker onChange={(e) => onChangeTime(e)} />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1 flex items-center gap-2'>
                                Ulangi Tugas
                                <input checked={isRecurring} onClick={() => setIsRecurring(!isRecurring)} type="checkbox" value="" class="accent-flora w-4 h-4 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600"/>
                            </h2>
                            <DropDown defaultValue="Pilih ulangi tugas" onChange={(e) => onChangeHandler(e, "tipe_recurring")} option={recurringList} />
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Batas Pengulangan</h2>
                            <DatePicker onChange={(e) => onChangeHandler(e, "batas_recurring")} />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-11'>
                        <FlatButton className='w-6/12 rounded-xl' role='white' text='Kembali' onClick={() =>  navigate(-1)} />
                        <FlatButton className='w-6/12 rounded-xl' role='green' text='Buat' onClick={handleSubmit} />
                    </div>
                    <Toast text="Sukses menambahkan data !" onClose={() => setIsSubmitted(false)} isShow={isSubmitted} />
                    <Toast text="Sukses menambahkan data !" onClose={() => setIsSubmitted(false)} isShow={isSubmitted} />
                </div>
            </div>
        </>
    )
}

export default MabesAssignment;