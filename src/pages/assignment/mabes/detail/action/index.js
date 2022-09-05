import React from 'react';
import Button from '../../../../../components/button/Button';
import FlatButton from '../../../../../components/button/flat';
import Subtitle from '../../../../../components/title/Subtitle';
import Title from '../../../../../components/title/Title';
import Header from '../../../../../components/ui/Header';
import Table from '../../../../../components/ui/Table';
import warning from '../../../../../assets/icons/warning.svg'

const listItem = [
    {
        field: 'Divisi',
        item: '4'
    },
    {
        field: 'Hancak',
        item: 'B'
    },
    {
        field: 'Block',
        item: 'R.08401'
    },
    {
        field: 'Clone',
        item: 'PB 366,'
    },
    {
        field: 'Sistem',
        item: '1/2SD/3'
    }
]


function MabesDetailAction() {
    const [tbList, setTbList] = React.useState([]);
    
    React.useEffect(() => {
        getTbList();
    })

    const getTbList = () => {
        setTbList(listItem)
    }

    return (
        <>
            <div className="header">
                <Header title="Penugasan" isWithBack />
            </div>
            <div className="container">
                <div className='flex justify-between items-center'>
                    <Title text='Gembung' />
                    <Button isText={true} text={"Edit"}/>
                </div>
                <div className='mt-6'>
                    <Subtitle text='Informasi Wilayah & Cuaca' />
                    <span>-</span>
                </div>
                <Table 
                    headerTitle={'Estate'}
                    titleItem={'Gembung'} 
                    titleCode={'TP0029883'} 
                    tbList={tbList}
                    status={'Menunggu Persetujuan'}
                    borderColor='border border-cloud'
                    backgroundColor='bg-bgrey'
                    cellBorder='border border-cloud'
                />
                <div className='flex justify-between items-center mt-3'>
                    <div>
                        <p className='text-xs'>Mandor</p>
                        <p className='text-l'>Aang Ginanjar</p>
                    </div>
                    <div>
                        <p className='text-xs'>9 Agustus</p>
                        <p className='text-xs'>07:00 - selesai</p>
                    </div>
                </div>   
                <div className='flex gap-3.5 -mx-5 mt-4 p-5 bg-sun'>
                    <img src={warning} alt="warning" />
                    <p className='text-white'>Permintaan Pengalihan Tugas</p>
                </div>
                <div className='mt-4'>
                    <div className='mb-3'>
                        <p>Alasan pengalihan</p>
                        <p className='font-bold'>Sakit</p>
                    </div>
                    <div className='notes'>
                        <p>Pesan tambahan</p>
                        <p className='font-bold'>Maaf, Dan.. Saya mohon ijin untuk tidak bekerja pada tugas kali ini karena sakit. Kaki kanan saya masih belum pulih dari kecelakaan tugas kemarin. Mohon ijin. Terimakasih.</p>
                    </div>
                </div>
                <div className='mt-11'>
                    <FlatButton className='w-full rounded-xl' text='Izinkan dan lakukan pengalihan'/>
                    <FlatButton role='white' className='w-full mt-3 rounded-xl' text='Batlkan'/>
                </div>        
            </div>
        </>
    )
}

export default MabesDetailAction;