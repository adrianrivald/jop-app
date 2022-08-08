import Header from '../../components/ui/Header';
import Button from '../../components/button/Button';
import Title from '../../components/title/Title';
import Subtitle from '../../components/title/Subtitle';
import Table from '../../components/ui/Table';
import React from 'react';

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

function Sample() {
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
                <Header title="Penugasan" isWithBack isWithNotification isWithBurgerMenu />
            </div>
            <div className="container">
                <div className='flex justify-between items-center'>
                    <Title text='Gembung' />
                    <Button text={"Edit"} isLong={true}/>
                </div>
                <div className='mt-6'>
                    <Subtitle text='Informasi Wilayah & Cuaca' />
                    <span>-</span>
                </div>
                <Table 
                    headerTitle={'Estate'}
                    titleItem={'Gembung'} 
                    titleCode={'TP0029883'} 
                    isWithHeader 
                    isWithFooter
                    isWithStatus
                    tbList={tbList}
                    tbListFooter={tbListFooter}
                    status={'Menunggu Persetujuan'}
                />
            </div>
        </>
    )
}

export default Sample;