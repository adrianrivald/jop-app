import '../../App.css';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Title from '../../components/title/Title';
import Subtitle from '../../components/title/Subtitle';
import DropDown from '../../components/forms/Dropdown';
import React from 'react';
import Cookies from 'universal-cookie';


const UserInfo = (props) => {
    return (
    <div className='flex items-center justify-between p-2 bg-white text-left rounded-md'>
        <div className='flex items-center w-9/12'>
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className='rounded-md w-16 mr-2' />
            <div>
                <Title text={props.userName} />
                <Subtitle text={props.userCode} />
            </div>
        </div>
        <div className='flex-auto'>
            <Link className='text-flora' to=''>Edit Profile</Link>
            <div className='text-flora text-xs mt-2 cursor-pointer' onClick={props.onLogout}>Logout</div>
        </div>
    </div>
    )
}

const UserMenu = (props) => {

    const Card = (props) => {
        return (
            <Link to={!props.isDisabled && `${props.url}`}>
                <div className={`p-2 bg-white text-black rounded-md shadow-lg ${props.isDisabled && ('cursor-not-allowed opacity-50	')}`}>
                    <p className='text-center my-12 text-xl font-bold text-ellipsis overflow-hidden'>{props.cardTitle}</p>
                    <span className='block my-1 text-xs text-left'>Upcoming Appointment :</span>
                    <div className='flex items-center justify-between'>
                        <span className='text-xs'>
                            17 Februari 2022, 12:00
                        </span>
                        <div className='text-flora text-xs'>Detail</div>
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-4 mt-6">
            <Card cardTitle="Tugas" url={`/assignment`}/>
            <Card cardTitle="Absensi" isDisabled={props.level === 'mabes'} url='/absence'/>
            <Card cardTitle="Timbang" isDisabled={props.level === 'mabes'} url='/weighing'/>
            <Card cardTitle="Logistik" isDisabled={props.level !== 'transport'} url='/logistic'/>
            <Card cardTitle="Laporan" isDisabled/>
            <Card cardTitle="Pengaturan" isDisabled/>
        </div>
    )
}

const Contact = (props) => {
    return (
        <div className='mt-6 bg-white p-2 rounded-md'>
            <h2 className='text-left mb-6 font-bold'>Contact</h2>
            <DropDown onChange={props.onChange} option={props.option} />
            {
                props.option.filter(res => res.value === props.selectedContact).map((result, idx) => {
                    return (
                        <div>
                            {result.data.map(res => {
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
    const userData = JSON.parse(localStorage.getItem('userData')) ?? {}
    const cookies = new Cookies();

    React.useEffect(() => {
        getContactList();
    },[])

    const onLogout = () => {
        cookies.remove('token', {path: '/'});
        localStorage.removeItem('userData')
        window.location.href = `${window.location.origin}/auth/login`
    }

    const onChangeContact = (e) => {
        const value = e.target.value
        setSelectedContact(value)
    }

    const getContactList = () => {
        setContact([
            {
              label: "JOP",
              value: "JOP",
              data: [
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
              value: "JOP 2",
              data: [
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
              value: "JOP 3",
              data: [
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
                <UserInfo userName={userData?.name} userCode={userData?.code} onLogout={onLogout}/>
                <UserMenu level={userData?.level}/>
                <Contact onChange={onChangeContact} selectedContact={selectedContact} option={contact} />
            </section>
        </div>
    )
}