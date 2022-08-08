import '../../App.css';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Title from '../../components/title/Title';
import Subtitle from '../../components/title/Subtitle';


const UserInfo = () => {
    return (
    <div className='flex items-center justify-between p-2 bg-white text-left'>
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
            <div className='p-2 bg-white text-black rounded-md'>
                <p className='text-center m-12 text-xl font-bold'>{props.cardTitle}</p>
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

const Contact = () => {
    return (
        <div className='mt-6 bg-white p-2'>
            <h2 className='text-left'>Contact</h2>
            {/* <Dropdown /> */}
        </div>
    )
}

function HomePage() {
    return (
        <div className="App">
            <Header title="Beranda" isWithBurgerMenu isWithNotification/>
            <section className='container'>
                <UserInfo />
                <UserMenu />
                <Contact />
            </section>
        </div>
    )
}

export default HomePage;