import axios from "axios";
import moment from "moment";
import React from "react";
import './tapper.css';
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../../../components/title/Title";
import Header from "../../../../components/ui/Header";
import Fallback from "../../../../assets/images/fallback-ava.png"
import FlatButton from "../../../../components/button/flat";
import Cookies from "universal-cookie";
import Divider from "../../../../components/ui/Divider";
import { CameraFeed } from "../detail/camera";
import Toast from "../../../../components/ui/Toast";

const url = process.env.REACT_APP_API_URL;

const WeighingTapper = () =>{
    const { id } = useParams();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');
    const [tapperDetail, setTapperDetail] = React.useState({})
    const scanned_tapper = localStorage.getItem('scanned_tapper')
    const weighing_id = localStorage.getItem('weighing_id')
    const weighing_code = localStorage.getItem('weighing_code')
    const [weighingPayload, setWeighingPayload] = React.useState({})
    const stored_data = JSON.parse(localStorage.getItem('selected_material'));
    const [inputWeight, setInputWeight] = React.useState({})
    const [photos, setPhotos] = React.useState([]);
    const [isCamera, setIsCamera] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false)
    const transaction_id = localStorage.getItem('transaction_id')
    const weighing_data = JSON.parse(localStorage.getItem('weighing_data'))
    const weighing_transaction = JSON.parse(localStorage.getItem('weighing_transaction'))
    
    React.useEffect(() => {
        getDetailTapper();
        if (scanned_tapper && scanned_tapper !== undefined) {
            setWeighingPayload({
                ...weighingPayload,
                tapper_id: scanned_tapper,
                tph_penimbangan_id: weighing_id,
                detail: stored_data.map(res => {
                    return {
                        jenis_bahan_baku_id: res.id
                    }

                })
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    React.useEffect(() => {
        if (weighing_data && weighing_data !== undefined){
            getInputWeight();
            getPhotos();
        }
    }, [])

    const getPhotos = () => {
        // setPhotos([
        //     ...photos,
        //     {
        //         blob: e.target.files[0],
        //         file: URL.createObjectURL(e.target.files[0])
        //     }
        // ])
        const photo_data = weighing_transaction?.foto?.map((res, idx) => {
            return {
                file : res?.path
            }
        })
        setPhotos(photo_data)
    }

    const getInputWeight = () => {
        const weighing_data_reduced = weighing_data.reduce((prev, next) => {
            return {
                [prev?.kode] : parseInt(prev?.berat_wet),
                [next?.kode] : parseInt(next?.berat_wet)
            }
        })
        setInputWeight(weighing_data_reduced)
    }

    const getDetailTapper = async() => {
        await axios.get(`${url}absensi/scan-by-tapper-uuid/${scanned_tapper}`,
        {
            url: process.env.REACT_APP_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            const data = res.data.data
            setTapperDetail(data)
        })
    }

    const avaImage = () => {
        if (tapperDetail?.foto && tapperDetail?.foto !== null){
            return tapperDetail?.foto
        }
        return Fallback
    }

    const onChangeWeight = (e, id, idx) => {
        setInputWeight({
            ...inputWeight,
            [id] : parseInt(e.target.value)
        })
        weighingPayload.detail[idx] = {
            ...weighingPayload.detail[idx],
            berat_wet: parseInt(e.target.value)
        }
    }

    const onSelectPhoto = (e) => {
        const blobToImage = (blob) => {
            return new Promise(resolve => {
              const url = URL.createObjectURL(blob)
              let img = new Image()
              img.onload = () => {
                URL.revokeObjectURL(url)
                resolve(img)
              }
            })
          }
        setPhotos([
            ...photos,
            {
                blob: e.target.files[0],
                file: URL.createObjectURL(e.target.files[0])
            }
        ])
        setWeighingPayload({
            ...weighingPayload,
            foto: photos.map(res => res.file)
        })
        setSelectedImage(e.target.files[0]);
    }

    const uploadImage = async file => {
        const formData = new FormData();
        formData.append('file', file);
        const captured = [
            ...photos,
            {
                file
            }
        ]
    };

    const handleSubmit = async() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        }
        await axios.post(`${url}penimbangan/transaksi/store
        `, weighingPayload, config).then(() => {
            setIsSubmitted(true)
            setIsButtonDisabled(true)
            setTimeout(() => {
                setIsButtonDisabled(false)
                setIsSubmitted(false)
                navigate(`/weighing/mandor/detail/${id}`)
            }, 3000);
        })
    }
    

    return (
        <>
            <div className="header">
                <Header title="Penimbangan" isWithBack />
            </div>
            {
                !isCamera ? (
                    <>
                        <div className="container">
                            <div className="bio flex">
                                <div className="flex-auto w-2/5 mr-5 shadow">
                                    <div className="rounded-lg bg-white p-1">
                                        <img src={avaImage()}
                                            className="rounded-lg"
                                            alt="ava-tapper" 
                                        />
                                    </div>
                                </div>
                                <div className="flex-auto w-3/5 ...">
                                    <h2 className="font-bold text-sm">{tapperDetail?.nama}</h2>
                                    <p className="text-xs">{tapperDetail?.tipe}</p>
                                    <div className="w-4/5">
                                        <div className="mt-5 flex justify-between justify-items-start">
                                            <p>NIK</p>
                                            <p className="font-bold">{tapperDetail?.kode}</p>
                                        </div>
                                        <div className="mt-1 flex justify-between justify-items-start">
                                            <p>Status</p>
                                            <p className="font-bold">{tapperDetail?.skema_kerja}</p>
                                        </div>
                                        <div className="mt-1 flex justify-between justify-items-start">
                                            <p>Tahun Masuk</p>
                                            <p className="font-bold">{tapperDetail?.tahun_masuk}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <Title text="Detail Tapping Terakhir" />
                                <div className="flex justify-between w-2/3">
                                    <div>
                                        <p>Mandor</p>
                                        {/* <p>Waktu Timbang</p> */}
                                        <p>Wilayah Kerja</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">{tapperDetail?.riwayat_penugasan && tapperDetail?.riwayat_penugasan[0]?.mandor}</p>
                                        {/* <p className="font-bold">05:22</p> */}
                                        <div className="font-bold">
                                            <p>{tapperDetail?.riwayat_penugasan && tapperDetail?.riwayat_penugasan[0]?.wilayah_tugas?.divisi}</p>
                                            <p>{tapperDetail?.riwayat_penugasan && tapperDetail?.riwayat_penugasan[0]?.wilayah_tugas?.hancak}</p>
                                            <p>Blok {tapperDetail?.riwayat_penugasan && tapperDetail?.riwayat_penugasan[0]?.wilayah_tugas?.field}</p>
                                            <p>Clone {tapperDetail?.riwayat_penugasan && tapperDetail?.riwayat_penugasan[0]?.wilayah_tugas?.clone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Divider />
                            <div className="mt-3">
                                <Title text={localStorage.getItem('weighing_code')} />
                                {
                                    // weighing_data === undefined || !weighing_data ? 
                                    stored_data?.map((res, idx) => {
                                        return (
                                            <div className="my-3 flex justify-between items-center">
                                                <p>{res.code} - {res.name}</p>
                                                <input className="rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline" type="number" onChange={(e) => onChangeWeight(e, res.code, idx)} defaultValue={weighing_data[idx].berat_wet}/>
                                            </div>
                                        )
                                    }) 
                                    // : weighing_data.map((res, idx) => {
                                    //     return (
                                    //         <div className="my-3 flex justify-between items-center">
                                    //             <p>{res.kode} - {res.nama}</p>
                                    //             <input className="rounded-lg py-4 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline" type="number" onChange={(e) => onChangeWeight(e, res.kode, idx)} defaultValue={res?.berat_wet}/>
                                    //         </div>
                                    //     )
                                    // })
                                }
                                <div className="mt-3 flex justify-between items-center">
                                    <p>Sub total</p>
                                    <p>
                                        <span className="font-bold">
                                            {
                                                // !weighing_data || weighing_data === undefined ? 
                                                Object.values(inputWeight).reduce((a, b) => a + b, 0) 
                                                // : weighing_data.map(res => res?.berat_wet).reduce((prev, next) => prev + next)
                                            }
                                        </span> kg
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="button-area p-3" >
                            <div className="photos-container overflow-x-auto flex gap-3">
                            {
                                photos?.map((res, idx) => {
                                    return (
                                            <img width="200" alt={`photo_${idx+1}`} src={!weighing_transaction ? URL.createObjectURL(res?.blob) : photos[idx].file} className="rounded-xl" />
                                            )
                                        })
                                    }
                                    </div>
                            {/* <input type="file" multiple onChange={onSelectPhoto} /> */}
                        </div>
                        <div className="p-3 mt-1">
                            <label for="file-upload" class="w-full rounded-xl bg-flora text-white font-bold p-3 block text-center flex justify-center items-center gap-2 cursor-pointer">
                                <svg className="block" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.889 8.00052C13.9141 8.00052 15.5557 9.64212 15.5557 11.6672C15.5557 13.6922 13.9141 15.3338 11.889 15.3338C9.86393 15.3338 8.22233 13.6922 8.22233 11.6672C8.22233 9.64212 9.86393 8.00052 11.889 8.00052ZM11.889 9.33332L11.8291 9.33865C11.693 9.36338 11.5857 9.47065 11.5611 9.60672L11.5557 9.66665L11.5554 11.3333L9.88746 11.3338L9.82753 11.3392C9.69146 11.3639 9.58413 11.4712 9.55946 11.6072L9.55413 11.6672L9.55946 11.727C9.58413 11.8631 9.69146 11.9704 9.82753 11.9951L9.88746 12.0005L11.5561 12L11.5564 13.6694L11.5618 13.7294C11.5865 13.8654 11.6937 13.9727 11.8298 13.9974L11.8897 14.0028L11.9497 13.9974C12.0857 13.9727 12.193 13.8654 12.2177 13.7294L12.2231 13.6694L12.2228 12L13.8921 12.0005L13.9519 11.9951C14.088 11.9704 14.1953 11.8631 14.22 11.727L14.2254 11.6672L14.22 11.6072C14.1953 11.4712 14.088 11.3639 13.9519 11.3392L13.8921 11.3338L12.2221 11.3333L12.2223 9.66665L12.2169 9.60672C12.1923 9.47065 12.085 9.36338 11.9489 9.33865L11.889 9.33332ZM9.50546 1.66919C10.0373 1.66919 10.5295 1.95084 10.7988 2.40944L11.3419 3.33382H12.7223C13.9189 3.33382 14.889 4.30387 14.889 5.50049L14.8895 8.54072C14.5934 8.25645 14.257 8.01385 13.8897 7.82232L13.889 5.50049C13.889 4.85616 13.3667 4.33382 12.7223 4.33382H11.0557C10.8784 4.33382 10.7143 4.23994 10.6245 4.08707L9.9366 2.91594C9.8468 2.76307 9.68273 2.66919 9.50546 2.66919H6.9706C6.82161 2.66919 6.6818 2.7355 6.58762 2.84772L6.5445 2.90756L5.81508 4.09546C5.72414 4.24356 5.5628 4.33382 5.389 4.33382H3.72233C3.078 4.33382 2.55566 4.85616 2.55566 5.50049V11.8338C2.55566 12.4782 3.078 13.0005 3.72233 13.0005L7.76453 13.0001C7.87946 13.3559 8.03913 13.6917 8.23693 14.0007L3.72233 14.0005C2.52571 14.0005 1.55566 13.0304 1.55566 11.8338V5.50049C1.55566 4.30387 2.52571 3.33382 3.72233 3.33382H5.10928L5.69233 2.38429C5.96516 1.93996 6.44917 1.66919 6.9706 1.66919H9.50546ZM8.22233 5.33382C9.55686 5.33382 10.6879 6.20518 11.0774 7.40998C10.7437 7.47292 10.4238 7.57432 10.1221 7.70918C9.8604 6.91045 9.10873 6.33382 8.22233 6.33382C7.11773 6.33382 6.22233 7.22925 6.22233 8.33385C6.22233 9.28672 6.88876 10.084 7.781 10.285C7.67606 10.5961 7.60553 10.9242 7.5742 11.2636C6.22896 10.9675 5.22233 9.76818 5.22233 8.33385C5.22233 6.67698 6.56548 5.33382 8.22233 5.33382Z" fill="#F2F5F7"/>
                                </svg>
                                Tambah Foto
                            </label>
                            <input id="file-upload" multiple type="file" onChange={onSelectPhoto} style={{display: 'none'}} />
                        </div>
                        
                        <div className="button-area p-3 mt-5" >
                            <FlatButton 
                                className='w-full rounded-xl' 
                                role='green' text='Selesai' 
                                onClick={handleSubmit}
                            />
                        </div>
                        <Toast text="Sukses menambahkan data !" onClose={() => setIsSubmitted(false)} isShow={isSubmitted} />
                    </>
                ) : (
                    <CameraFeed sendFile={uploadImage} setIsCamera={setIsCamera} isCamera={isCamera} />
                )
            }
        </>
    )
}

export default WeighingTapper;