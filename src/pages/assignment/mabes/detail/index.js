import React from 'react';
import Button from '../../../../components/button/Button';
import FlatButton from '../../../../components/button/flat';
import Subtitle from '../../../../components/title/Subtitle';
import Title from '../../../../components/title/Title';
import Header from '../../../../components/ui/Header';
import Table from '../../../../components/ui/Table';

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
const listItemFooter = [
    {
        field: 'Mandor',
        item: 'Aang Ginanjar'
    },
    {
        field: 'Tapper',
        item: '12'
    },
    {
        field: 'Waktu Kerja',
        item: '05:30 - Selesai'
    }
]


function WorkerList () {
    return (
        <div className='flex justify-between items-center mt-3 pt-3'>
            <p className='text-xs mx-4'>SKU</p>
            <div>
                <p className='font-bold text-lg'>Ihsan Samosir</p>
                <p className='text-xs'>02887</p>
            </div>
            <p className='text-xl text-flora font-bold'>Kerja</p>
            <div>
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002" stroke="#A7A29A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <hr />
        </div>
    )
}

function MabesDetail() {
    const [tbList, setTbList] = React.useState([]);
    const [tbListFooter, setTbListFooter] = React.useState([]);
    
    React.useEffect(() => {
        getTbList();
        getTbListFooter();
    })

    const getTbList = () => {
        setTbList(listItem)
    }

    const getTbListFooter = () => {
        setTbListFooter(listItemFooter)
    }

    return (
        <>
            <div class="header">
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
                <div className='divide-y divide-cloud'>
                    <WorkerList />
                    <WorkerList />
                    <WorkerList />
                    <WorkerList />
                    <WorkerList />
                    <WorkerList />
                </div> 
                <div className='mt-11'>
                    <FlatButton className='w-full rounded-xl' text='Izinkan'/>
                </div>        
            </div>
        </>
    )
}

export default MabesDetail;