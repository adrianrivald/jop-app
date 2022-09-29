import React, { useEffect, useState } from 'react';
import Header from '../../../components/ui/Header';
import FlatButton from '../../../components/button/flat'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import DropDown from '../../../components/forms/Dropdown';
import Toast from '../../../components/ui/Toast';

const url = process.env.REACT_APP_API_URL;

function Dropdown (props) {
    return (
        <div className={`mt-5 ${props.customClass} w-full`}>
            <h2 className='text-left mb-1'>{props.title}</h2>
            <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
        </div>
    )
}

const AddBalanced = () => {
    const [reason, setReason] = useState('');
    const [divisiList, setDivisiList] = React.useState([]);
    const [weigherList, setWeigherList] = React.useState([]);
    const [tphList, setTphList] = React.useState([]);
    const [materialList, setMaterialList] = React.useState([]);
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');
    const [addInput, setAddInput] = React.useState({bahan_baku_id: []})

    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false)
    const [toastText, setToastText] = React.useState("")
    const raindayList = [
        {
            value: 'senin',
            label: 'Senin'
        },{
            value: 'selasa',
            label: 'Selasa'
        },
        {
            value: 'rabu',
            label: 'Rabu'
        },
        {
            value: 'kamis',
            label: 'Kamis'
        },
        {
            value: 'jumat',
            label: 'Jumat'
        },
        {
            value: 'sabtu',
            label: 'Sabtu'
        },
        {
            value: 'minggu',
            label: 'Minggu'
        },
    ]

    const raintimeList = [
        {
            value: 'pagi',
            label: 'Pagi'
        },
        {
            value: 'siang',
            label: 'Siang'
        },
        {
            value: 'sore',
            label: 'Sore'
        },
        {
            value: 'malam',
            label: 'Malam'
        },
    ]

    useEffect(() => {
        getDivisi();
        getWeigher();
        getMaterial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getDivisi = () => {
        axios.get(`${url}divisi/list?sort=nama&include=wilayah_tugas`, {
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

    const getWeigher = () => {
        axios.get(`${url}petugas-timbang/list?sort=nama`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data.data
            const weigherData = data.map((res) => {
                return {
                    value: res.id,
                    label: res.nama
                }
            })
            setWeigherList(weigherData)
        })
    }

    const getMaterial = () => {
        axios.get(`${url}bahan-baku/list?sort=nama`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data.data
            setMaterialList(data)
        })
    }

    const getTPH = (divisi_id) => {
        axios.get(`${url}tph/list?filter[divisi]=${divisi_id}&include=wilayah_tugas,divisi&sort=kode,nama`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data.data
            const tphData = data.map((res) => {
                return {
                    value: res.id,
                    label: res.nama
                }
            })
            setTphList(tphData)
        })
    }




    const onChangeHandler = (e, input_id) => {
        console.log(e.target.value)
        
        if (input_id === "bahan_baku_id") {
            setAddInput({
                ...addInput,
                "bahan_baku_id": [
                    ...addInput["bahan_baku_id"],
                    e.target.value
                ]
            })
        } else {
            setAddInput((prev) => ({
                ...prev ,
                [input_id]: e.target.value
            }))
        }
        if (input_id === "divisi_id") {
            getTPH(e.target.value)
        }
    }


    const handleSubmit = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }
        axios.post(`${url}penimbangan/store`, addInput, config).then((res) => {
            setIsSubmitted(true)
            setIsButtonDisabled(true)
            setTimeout(() => {
                setIsButtonDisabled(false)
                setIsSubmitted(false)
                navigate('/balanced')
            }, 3000);
        })
    }

    React.useEffect(() => {
        console.log(addInput, 'addInput')
        console.log(addInput["bahan_baku_id"], 'bahanbaku')
    },[addInput])


    return(
       <div className="App min-h-screen h-full" >
            <Header title="Penimbangan Baru" isWithBack/>
            <section className="container p-4 flex flex-col justify-start items-start" style={{ height: 'calc(100vh - 70px)'}}>
                <Dropdown title="Divisi" defaultValue="Pilih divisi" option={divisiList} onChange={(e) => onChangeHandler(e, "divisi_id")} />
                <Dropdown title="Tempat Penimbangan" defaultValue="Pilih tempat penimbangan" option={tphList} onChange={(e) => onChangeHandler(e, "tph_id")} />
                <div className="w-full border-b border-flora my-6"/>
                <h1 className="mb-4">Jenis Bahan Baku</h1>
                <ul className="flex flex-col w-full">
                    {
                        materialList?.map((res, idx) => {
                            return (
                                <li className="flex justify-between items-center my-2">
                                    <label>{res?.nama}</label>
                                    <input type="checkbox" value={res?.id} className="w-6 h-6 border-2 rounded-lg mr-2" onChange={(e) => onChangeHandler(e, "bahan_baku_id")} defaultChecked={false} />
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="w-full border-b border-flora my-6"/>
                <h1>Informasi Cuaca Pengambilan</h1>
                <div className="my-4 flex justify-between w-full">
                    <div className="flex-1 flex flex-col mr-4">
                        <div className='mt-5'>
                            <h2 className='text-left mb-1'>Curah hujan</h2>
                            <div className='w-full relative'>
                                <span className='absolute inset-y-2 right-1'>mm</span>
                                <input className="p-2 rounded-lg shadow flex justify-start w-full font-bold"  type="text" pattern="\d*" onChange={(e) => onChangeHandler(e, "curah_hujan")} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col mr-4">
                        <Dropdown title="Hari Hujan" defaultValue="Pilih hari hujan" option={raindayList} onChange={(e) => onChangeHandler(e, "hari_hujan")} />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <Dropdown title="Waktu Hujan" defaultValue="Pilih waktu hujan" option={raintimeList} onChange={(e) => onChangeHandler(e, "waktu_hujan")} />
                    </div>
                </div>
                <div className="w-full border-b border-flora my-6"/>
                    <Dropdown title="Petugas Timbang" defaultValue="Pilih petugas timbang" option={weigherList} onChange={(e) => onChangeHandler(e, "petugas_penimbang_id")} />
                <div className="flex justify-between items-center my-7 w-full">
                    <FlatButton role='white' className={'w-full text-sm font-bold mr-4 mb-7'} text={'Kembali'} onClick={() => navigate(-1)}/>
                    <FlatButton role="green" className={'w-full text-sm font-bold mb-7'} text={'Buat'} onClick={handleSubmit}/>
                </div>
                <Toast text="Sukses menambahkan data !" onClose={() => setIsSubmitted(false)} isShow={isSubmitted} />
            </section>
       </div>
    )
}

export default AddBalanced