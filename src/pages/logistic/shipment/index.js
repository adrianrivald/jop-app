import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Button from "../../../components/button/Button";
import DropDown from "../../../components/forms/Dropdown";
import Divider from "../../../components/ui/Divider";
import Header from "../../../components/ui/Header"
import Toast from "../../../components/ui/Toast";



const url = process.env.REACT_APP_API_URL;

function Dropdown (props) {
    return (
        <div className={`${props.className} w-full`}>
            <label className='text-left mb-1'>{props.title}</label>
            <DropDown defaultValue={props.defaultValue} onChange={props.onChange} option={props.option} />
        </div>
    )
}

function LogisticShipment () {
  const { id } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [tphList, setTphList] = React.useState([]);
  const [photos, setPhotos] = React.useState([]);
  const loaded_data = JSON.parse(localStorage.getItem("loaded_data"));
  const [logisticType, setLogisticType] = React.useState([]);
  const [vehicleList, setVehicleList] = React.useState([]);
  const [whList, setWHList] = React.useState([]);
  const [addInput, setAddInput] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false)

  React.useEffect(() => {
    getLogisticType();
    getWH();
  },[])

  const getLogisticType = () => {
    axios.get(`${url}jenis-logistik/list?sort=nama`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    }).then((res) => {
        const data = res.data.data.data
        const logisticTypeData = data.map((res) => {
            return {
                value: res.id,
                label: res.nama
            }
        })
        setLogisticType(logisticTypeData)
    })
  }

  const getVehicle = (val) => {
    axios.get(`${url}armada/list?sort=kode&filter[jenis_logistik]=${val}`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    }).then((res) => {
        const data = res.data.data.data
        const vehicleData = data.map((res) => {
            return {
                value: res.id,
                label: res.plat_nomor
            }
        })
        setVehicleList(vehicleData)
    })
  }

  const getWH = (val) => {
    axios.get(`${url}warehouse/list`, {
        url: process.env.REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    }).then((res) => {
        const data = res.data.data.data
        const whData = data.map((res) => {
            return {
                value: res.id,
                label: res.nama
            }
        })
        setWHList(whData)
    })
  }

  const onChangeHandler = (e, id) => {
    setAddInput({
      ...addInput,
      [id]: e.target.value
    })

    if (id === "jenis_logistik_id") {
      getVehicle(e.target.value)
    }

  }

  const onSelectPhoto = (e) => {
      let formData = new FormData();
      formData.append('file', e.target.files[0])
      formData.append('path', 'public/logistik/kirim')
      void uploadPhoto(formData);
  }

  const uploadPhoto = async(formData) => {
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              // 'Content-Type': 'image/jpeg',
              Accept: 'application/json'
          }
      }
      await axios.post(`${url}upload-foto
      `, formData, config).then((res) => {
              const data = res?.data?.data
              setPhotos([
                  ...photos,
                  data?.path
              ])
              // setWeighingPayload({
              //     ...weighingPayload,
              //     foto: [
              //         ...photos,
              //         data?.path
              //     ]
              // })
          }
      )
  }

  const handleSubmit = async() => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    }
    await axios.post(`${url}pengiriman/store
    `, addInput, config).then(() => {
        setIsSubmitted(true)
        setIsButtonDisabled(true)
        setTimeout(() => {
            setIsButtonDisabled(false)
            setIsSubmitted(false)
            navigate(-1)
        }, 3000);
        localStorage.removeItem("loaded_data");
        navigate(`/logistic/detail/${id}`)
    })
  }
    return (
        <>
            <div className="header">
                <Header title="Logistik" isWithBack/>
            </div>
            <div className="container">
                {
                  loaded_data?.detail?.map((res, idx) => {
                    return (
                      <>
                        <div>
                            <p>LOAD {idx + 1}: {res?.nama} - {res?.berat_kirim} Kg</p>
                            <p className="font-bold">{loaded_data?.kode}/{res?.kode} ({res?.nama})</p>
                        </div>
                        <Divider />
                      </>
                    )
                  })
                }
                <div className="load-detail">
                    <Dropdown title="Jenis logistik" defaultValue="Pilih jenis logistik" className="mt-3" option={logisticType} onChange={(e) => onChangeHandler(e, "jenis_logistik_id")} />
                    <Dropdown title="Armada yang digunakan" defaultValue="Pilih armada yang digunakan" className="mt-3" option={vehicleList} onChange={(e) => onChangeHandler(e, "armada_id")}/>
                    <div className="flex gap-3">
                        <Dropdown title="Alamat / fasilitas tujuan" defaultValue="Pilih alamat / fasilitas tujuan" className="mt-3" option={[{value: "wh", label: "WH"},{value: "klien", label: "Klien"}]} onChange={(e) => onChangeHandler(e, "alamat_fasilitas_id")}/>
                        <Dropdown title="Kode lokasi gudang" defaultValue="Pilih kode lokasi gudang" className="mt-3" option={whList} onChange={(e) => onChangeHandler(e, "warehouse_id")}/>
                    </div>
                    <div className="flex flex-col items-start w-full mb-4 mt-3">
                        <label className='text-left mb-1'>Alamat / fasilitas tujuan lain (optional)</label>
                        <textarea onChange={(e) => onChangeHandler(e, "alamat_pengiriman")} rows="4" className="flex justify-between w-full font-bold bg-white dark:bg-white shadow border-none text-xs rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-3 resize-none" placeholder="Tulis alamat lengkap di box ini apabila tujuan pengiriman tidak ada dalam pilihan diatas.." />
                    </div>
                    <Divider />
                    <div className="driver">
                        <div>
                            <p>Supir / pengendara</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm"><b>Sumber Wono</b> (PKWT)</p>
                                    <p>02887</p>
                                </div>          
                                <Button
                                    isIcon 
                                    icon={
                                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0555 0C11.2521 0 12.2222 0.970047 12.2222 2.16667V3.5C12.2222 3.77614 11.9983 4 11.7222 4C11.446 4 11.2222 3.77614 11.2222 3.5V2.16667C11.2222 1.52233 10.6998 1 10.0555 1H8.72217C8.44603 1 8.22217 0.77614 8.22217 0.5C8.22217 0.22386 8.44603 0 8.72217 0H10.0555ZM3.72217 0C3.9983 0 4.22217 0.22386 4.22217 0.5C4.22217 0.77614 3.9983 1 3.72217 1H2.38883C1.7445 1 1.22217 1.52233 1.22217 2.16667V3.5C1.22217 3.77614 0.998301 4 0.722168 4C0.446034 4 0.222168 3.77614 0.222168 3.5V2.16667C0.222168 0.970047 1.19223 0 2.38883 0H3.72217ZM11.2222 8.5C11.2222 8.22387 11.446 8 11.7222 8C11.9983 8 12.2222 8.22387 12.2222 8.5V9.83333C12.2222 11.0299 11.2521 12 10.0555 12H8.72217C8.44603 12 8.22217 11.7761 8.22217 11.5C8.22217 11.2239 8.44603 11 8.72217 11H10.0555C10.6998 11 11.2222 10.4777 11.2222 9.83333V8.5ZM0.222168 8.5C0.222168 8.22387 0.446034 8 0.722168 8C0.998301 8 1.22217 8.22387 1.22217 8.5V9.83333C1.22217 10.4777 1.7445 11 2.38883 11H3.72217C3.9983 11 4.22217 11.2239 4.22217 11.5C4.22217 11.7761 3.9983 12 3.72217 12H2.38883C1.19223 12 0.222168 11.0299 0.222168 9.83333V8.5ZM9.22217 5.5C9.49831 5.5 9.72217 5.72387 9.72217 6C9.72217 6.27613 9.49831 6.5 9.22217 6.5H3.22217C2.94603 6.5 2.72217 6.27613 2.72217 6C2.72217 5.72387 2.94603 5.5 3.22217 5.5H9.22217Z" fill="white"/>
                                        </svg>
                                    }
                                    text="Scan"
                                    className="w-32 p-1.5"
                                    onClick={()=> navigate(`scan`)}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div>
                            <p>Pengawal (optional)</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm"><b>Sumber Wono</b> (PKWT)</p>
                                    <p>02887</p>
                                </div>          
                                <Button
                                    isIcon 
                                    icon={
                                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0555 0C11.2521 0 12.2222 0.970047 12.2222 2.16667V3.5C12.2222 3.77614 11.9983 4 11.7222 4C11.446 4 11.2222 3.77614 11.2222 3.5V2.16667C11.2222 1.52233 10.6998 1 10.0555 1H8.72217C8.44603 1 8.22217 0.77614 8.22217 0.5C8.22217 0.22386 8.44603 0 8.72217 0H10.0555ZM3.72217 0C3.9983 0 4.22217 0.22386 4.22217 0.5C4.22217 0.77614 3.9983 1 3.72217 1H2.38883C1.7445 1 1.22217 1.52233 1.22217 2.16667V3.5C1.22217 3.77614 0.998301 4 0.722168 4C0.446034 4 0.222168 3.77614 0.222168 3.5V2.16667C0.222168 0.970047 1.19223 0 2.38883 0H3.72217ZM11.2222 8.5C11.2222 8.22387 11.446 8 11.7222 8C11.9983 8 12.2222 8.22387 12.2222 8.5V9.83333C12.2222 11.0299 11.2521 12 10.0555 12H8.72217C8.44603 12 8.22217 11.7761 8.22217 11.5C8.22217 11.2239 8.44603 11 8.72217 11H10.0555C10.6998 11 11.2222 10.4777 11.2222 9.83333V8.5ZM0.222168 8.5C0.222168 8.22387 0.446034 8 0.722168 8C0.998301 8 1.22217 8.22387 1.22217 8.5V9.83333C1.22217 10.4777 1.7445 11 2.38883 11H3.72217C3.9983 11 4.22217 11.2239 4.22217 11.5C4.22217 11.7761 3.9983 12 3.72217 12H2.38883C1.19223 12 0.222168 11.0299 0.222168 9.83333V8.5ZM9.22217 5.5C9.49831 5.5 9.72217 5.72387 9.72217 6C9.72217 6.27613 9.49831 6.5 9.22217 6.5H3.22217C2.94603 6.5 2.72217 6.27613 2.72217 6C2.72217 5.72387 2.94603 5.5 3.22217 5.5H9.22217Z" fill="white"/>
                                        </svg>
                                    }
                                    text="Scan"
                                    className="w-32 p-1.5"
                                    onClick={()=> navigate(`scan`)}
                                />
                            </div>
                        </div>
                        <Divider />
                        {/* <div className="button-area mt-3">
                            <div className="photos-container overflow-x-auto flex gap-3">
                                {
                                    transactionData?.foto?.map((res, idx) => {
                                        console.log(res,'ress')
                                        return(
                                            <img 
                                                width="200" 
                                                alt={`photo_${idx+1}`} 
                                                src={res}
                                                className="rounded-xl" />
                                        )
                                    })
                                }
                                {
                                    photos?.map((res, idx) => {
                                        return(
                                            <img 
                                                width="200" 
                                                alt={`photo_${idx+1}`} 
                                                // src={`${'https://jop.dudyali.com/storage/'}${res}`} 
                                                src={res.includes("/storage") ? res : `${'https://jop.dudyali.com/storage/'}${res}`}
                                                // src={res}
                                                className="rounded-xl" />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="mt-3">
                            <label for="file-upload" class="w-full rounded-lg bg-flora text-white font-bold p-3 block text-center flex justify-center items-center gap-2 cursor-pointer">
                                <svg className="block" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.889 8.00052C13.9141 8.00052 15.5557 9.64212 15.5557 11.6672C15.5557 13.6922 13.9141 15.3338 11.889 15.3338C9.86393 15.3338 8.22233 13.6922 8.22233 11.6672C8.22233 9.64212 9.86393 8.00052 11.889 8.00052ZM11.889 9.33332L11.8291 9.33865C11.693 9.36338 11.5857 9.47065 11.5611 9.60672L11.5557 9.66665L11.5554 11.3333L9.88746 11.3338L9.82753 11.3392C9.69146 11.3639 9.58413 11.4712 9.55946 11.6072L9.55413 11.6672L9.55946 11.727C9.58413 11.8631 9.69146 11.9704 9.82753 11.9951L9.88746 12.0005L11.5561 12L11.5564 13.6694L11.5618 13.7294C11.5865 13.8654 11.6937 13.9727 11.8298 13.9974L11.8897 14.0028L11.9497 13.9974C12.0857 13.9727 12.193 13.8654 12.2177 13.7294L12.2231 13.6694L12.2228 12L13.8921 12.0005L13.9519 11.9951C14.088 11.9704 14.1953 11.8631 14.22 11.727L14.2254 11.6672L14.22 11.6072C14.1953 11.4712 14.088 11.3639 13.9519 11.3392L13.8921 11.3338L12.2221 11.3333L12.2223 9.66665L12.2169 9.60672C12.1923 9.47065 12.085 9.36338 11.9489 9.33865L11.889 9.33332ZM9.50546 1.66919C10.0373 1.66919 10.5295 1.95084 10.7988 2.40944L11.3419 3.33382H12.7223C13.9189 3.33382 14.889 4.30387 14.889 5.50049L14.8895 8.54072C14.5934 8.25645 14.257 8.01385 13.8897 7.82232L13.889 5.50049C13.889 4.85616 13.3667 4.33382 12.7223 4.33382H11.0557C10.8784 4.33382 10.7143 4.23994 10.6245 4.08707L9.9366 2.91594C9.8468 2.76307 9.68273 2.66919 9.50546 2.66919H6.9706C6.82161 2.66919 6.6818 2.7355 6.58762 2.84772L6.5445 2.90756L5.81508 4.09546C5.72414 4.24356 5.5628 4.33382 5.389 4.33382H3.72233C3.078 4.33382 2.55566 4.85616 2.55566 5.50049V11.8338C2.55566 12.4782 3.078 13.0005 3.72233 13.0005L7.76453 13.0001C7.87946 13.3559 8.03913 13.6917 8.23693 14.0007L3.72233 14.0005C2.52571 14.0005 1.55566 13.0304 1.55566 11.8338V5.50049C1.55566 4.30387 2.52571 3.33382 3.72233 3.33382H5.10928L5.69233 2.38429C5.96516 1.93996 6.44917 1.66919 6.9706 1.66919H9.50546ZM8.22233 5.33382C9.55686 5.33382 10.6879 6.20518 11.0774 7.40998C10.7437 7.47292 10.4238 7.57432 10.1221 7.70918C9.8604 6.91045 9.10873 6.33382 8.22233 6.33382C7.11773 6.33382 6.22233 7.22925 6.22233 8.33385C6.22233 9.28672 6.88876 10.084 7.781 10.285C7.67606 10.5961 7.60553 10.9242 7.5742 11.2636C6.22896 10.9675 5.22233 9.76818 5.22233 8.33385C5.22233 6.67698 6.56548 5.33382 8.22233 5.33382Z" fill="#F2F5F7"/>
                                </svg>
                                Tambah Foto
                            </label>
                            <input id="file-upload" type="file" onChange={onSelectPhoto} style={{display: 'none'}} />
                        </div> */}
                        <div className="button-area mt-5">
                          <Button
                            className="w-full"
                            isText
                            text="Deliver"
                            onClick={handleSubmit}
                            disabled={isButtonDisabled}
                          />
                        </div>
                    </div>
                    <Toast text="Sukses mengirim data !" onClose={() => setIsSubmitted(false)} isShow={isSubmitted} />
                </div>
            </div>
        </>
        
    )
}

export default LogisticShipment