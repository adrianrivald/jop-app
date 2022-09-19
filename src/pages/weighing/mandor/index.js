import React from 'react';
import Header from '../../../components/ui/Header';
import DropDown from '../../../components/forms/Dropdown';
import DatePicker from '../../../components/forms/DatePicker';
import FlatButton from '../../../components/button/flat';
import TimePicker from '../../../components/forms/TimePicker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Toast from '../../../components/ui/Toast';
import Button from '../../../components/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../../../store/actions';
import Divider from '../../../components/ui/Divider';

const url = process.env.REACT_APP_API_URL;

function Dropdown (props) {
    return (
        <div className={`mt-5 ${props.customClass}`}>
            <h2 className='text-left mb-1'>{props.title}</h2>
            <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
        </div>
    )
}

function CheckIsRecurring (props) {
    return (
        <input checked={props.checked} onClick={props.onChange} type="checkbox" className="accent-flora w-4 h-4 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600"/>

    )
}

function MandorWeighing() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token')
    const [divisiList, setDivisiList] = React.useState([])
    const [divisi, setDivisi] = React.useState('');
    const [tphList, setTphList] = React.useState([])
    const [tph, setTph] = React.useState('');
    const [weighingList, setWeighingList] = React.useState([])
    const [weighing, setWeighing] = React.useState('');
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false)
    const [weighingDetail, setWeighingDetail] = React.useState([]);
    const [selectedMaterial, setSelectedMaterial] = React.useState([]);
    const dispatch = useDispatch()


    React.useEffect(() => {
        getDivisi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
    
    const getTph = (divisi) => {
        axios.get(`${url}tph/list?filter[divisi]=${divisi}&include=wilayah_tugas,divisi&sort=kode,nama`, {
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

    const getWeighing = (tph) => {
        axios.get(`${url}penimbangan/list?include=tph,divisi,petugas_penimbang`, {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data.data
            const weighingData = data.map((res) => {
                return {
                    value: res.id,
                    label: res.kode
                }
            })
            setWeighingList(weighingData)
        })
    }

    const onChangeDivisi = (e) => {
        const value = e.target.value;
        setDivisi(value);
        getTph(value);
    }

    const onChangeTph = (e) => {
        const value = e.target.value;
        setTph(value);
        getWeighing(value);
    }

    const onChangeWeighing = (e) => {
        const value = e.target.value;
        setWeighing(value);
        getWeighingDetail(value)
    }

    const getWeighingDetail = async(id) => {

        await axios.get(`${url}penimbangan/detail/${id}`,
        {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data
            setWeighingDetail(data?.detail)
        })
    } 

    const state = useSelector((state) => state);
    const onCheckMaterial = (code, name, id, id_bahan_baku) => {
        if (!selectedMaterial.find(val => val.id === id)) {
            setSelectedMaterial([
                ...selectedMaterial,
                {
                    id,
                    name,
                    code,
                    id_bahan_baku
                }
            ])
        dispatch(allActions.addMaterialCode([
            ...selectedMaterial,
            {
                id,
                name,
                code,
                id_bahan_baku
            }
        ]));
        localStorage.setItem('selected_material', JSON.stringify([
            ...selectedMaterial,
            {
                id,
                name,
                code,
                id_bahan_baku
            }
        ]))
        } else {
            setSelectedMaterial(selectedMaterial.filter(val => {
                return val.id !== id
            }))
            dispatch(allActions.addMaterialCode(selectedMaterial.filter(val => {
                return val.id !== id
            })))
            localStorage.setItem('selected_material',JSON.stringify(selectedMaterial.filter(val => {
                return val.id !== id
            })))
        }
        // dispatch(allActions.addMaterialCode(selectedMaterial));
    }

    const handleSubmit = () => {
        if (weighing.length > 0) {
            navigate(`/weighing/mandor/detail/${weighing}`);
            localStorage.setItem('weighing_id', weighing)
        }
    }
    
    return (
        <>
            <div className="header">
                <Header title="Penimbangan TPH" isWithBack/>
            </div>
            <div className="container">
                <div>                 
                    <Dropdown title="Divisi" defaultValue="Pilih divisi" option={divisiList} onChange={(e) => onChangeDivisi(e)} customClass={'mt-0'}/>
                    <Dropdown title="Tempat Penimbangan" defaultValue="Pilih Tempat Penimbangan" option={tphList} onChange={(e) => onChangeTph(e)} />
                    <Dropdown title="Kode Batch Penimbangan" defaultValue="Pilih Kode Batch Penimbangan" option={weighingList} onChange={(e) => onChangeWeighing(e)} />
                    <Divider className='mt-5'/>
                    {
                        weighing && (
                            <>
                                <div className='mt-5'>
                                    <p>Jenis Bahan Baku</p>
                                    {
                                        weighingDetail?.map((res, idx) => {
                                            return (
                                                <div className='flex justify-between gap-2 mt-4'>
                                                    <h2 className='text-left mb-1 font-bold'>{res.nama}</h2>
                                                    <input checked={selectedMaterial.find(val => val.id === idx)} onClick={() => onCheckMaterial(res.kode, res.nama, idx, res?.id) } type="checkbox" className="accent-flora w-4 h-4 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600"/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <Divider />
                            </>
                        )
                    }
                    <div>
                        <p className='mb-2'>Mulai Penimbangan</p>
                        <Button
                            disabled={weighing.length === 0}
                            role="white"
                            className="w-full"
                            isIcon 
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            }
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MandorWeighing;