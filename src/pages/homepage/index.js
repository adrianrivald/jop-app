import '../../App.css';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Title from '../../components/title/Title';
import Subtitle from '../../components/title/Subtitle';
import DropDown from '../../components/forms/Dropdown';
import React from 'react';


const UserInfo = () => {
    return (
    <div className='flex items-center justify-between p-2 bg-white text-left rounded-md'>
        <div className='flex items-center w-9/12'>
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className='rounded-md w-16 mr-2' />
            <div>
                <Title text="Hadi Sumantri" />
                <Subtitle text="99299292" />
            </div>
        </div>
        <div className='flex-auto'>
            <Link className='text-flora' to=''>Edit Profile</Link>
        </div>
    </div>
    )
}

const UserMenu = () => {

    const Card = (props) => {
        return (
            <div className='p-2 bg-white text-black rounded-md shadow-lg'>
                <p className='text-center my-12 text-xl font-bold text-ellipsis overflow-hidden'>{props.cardTitle}</p>
                <span className='block my-1 text-xs text-left'>Upcoming Appointment :</span>
                <div className='flex items-center justify-between'>
                    <span className='text-xs'>
                        17 Februari 2022, 12:00
                    </span>
                    <Link className='text-flora text-xs' to='/sample'>Detail</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-4 mt-6">
            <Card cardTitle="Tugas"/>
            <Card cardTitle="Absensi"/>
            <Card cardTitle="Timbang"/>
            <Card cardTitle="Logistik"/>
            <Card cardTitle="Laporan"/>
            <Card cardTitle="Pengaturan"/>
        </div>
    )
}

const Contact = (props) => {
    return (
        <div className='mt-6 bg-white p-2 rounded-md'>
            <h2 className='text-left mb-6 font-bold'>Contact</h2>
            <DropDown onChange={props.onChange} option={props.option} />
            {
                props.option.filter(res => res.label === props.selectedContact).map((result, idx) => {
                    return (
                        <div>
                            {result.value.map(res => {
                                return (
                                    <div className='p-4'>
                                        <div className='text-xs text-left'>
                                            {res.tipe}
                                        </div>
                                        <div className='flex items-center justify-between mt-2'>
                                            <p>{res.no_telp}</p>
                                            <Link to="/" className='text-flora font-bold'>PANGGIL</Link>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className='text-left mt-6 p-4'>
                                <p>Alamat : </p>
                                <p>{result.address}</p>
                            </div>
                            <div className='m-10'>
                                GOOGLE MAP
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default function HomePage() {
    const [ contact, setContact ] = React.useState([])
    const [ selectedContact, setSelectedContact ] = React.useState("JOP")

    React.useEffect(() => {
        getContactList();
    },[])

    const onChangeContact = (e) => {
        console.log(e.target.value)
        const value = e.target.value
        setSelectedContact(value)
    }

    const getContactList = () => {
        setContact([
            {
              label: "JOP",
              value: [
                        {
                            tipe: 'Kantor',
                            no_telp: '0210210',
                        },
                        {
                            tipe: 'Rumah',
                            no_telp: '08210210',
                          }
                    ],
              address : 'JL Raya Bogor'
            },
            {
              label: "JOP 2",
              value: [
                        {
                            tipe: 'Gudang',
                            no_telp: '0210210',
                        },
                        {
                            tipe: 'Support',
                            no_telp: '08210210',
                          }
                    ],
              address : 'JL Raya Ciputat'
            },
            {
              label: "JOP 3",
              value: [
                        {
                            tipe: 'Support',
                            no_telp: '0210210',
                        },
                        {
                            tipe: 'Support',
                            no_telp: '08210210',
                          }
                    ],
              address : 'JL Raya Parung'
            },
          ])
    }
    return (
        <div className="App">
            <Header title="Beranda" isWithBurgerMenu isWithNotification/>
            <section className='container'>
                <UserInfo />
                <UserMenu />
                <Contact onChange={onChangeContact} selectedContact={selectedContact} option={contact} />
            </section>
        </div>
    )
}