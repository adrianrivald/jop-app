import Header from '../../components/ui/Header';
import Button from '../../components/button/Button';
import Table from '../../components/ui/Table';
import React from 'react';
import DropDown from '../../components/forms/Dropdown';

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

function MabesList() {
    const [tbList, setTbList] = React.useState([]);
    const [tbListFooter, setTbListFooter] = React.useState([]);
    const [estate] = React.useState([
        {
            label: 'Gembung'
        },
        {
            label: 'Gembong'
        }
    ])
    const [task] = React.useState([
        {
            label: 'Tapping'
        },
        {
            label: 'Driver'
        }
    ])

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

    const Dropdown = (props) => {
        return (
            <div className='mt-1 p-2 w-3/6 rounded-md'>
                <h2 className='text-left mb-1 font-bold'>{props.title}</h2>
                <DropDown onChange={props.onChange} option={props.option} />
            </div>
        )
    }

    return (
        <>
            <div class="header">
                <Header title="Penugasan" isWithBack isWithNotification isWithBurgerMenu />
            </div>
            <div className="container">
                <p className='text-xs'>Penugasan</p>
                <div className='flex justify-between items-center'>
                    <p className='text-md font-bold'>Wilayah & Kerja</p>
                    <Button 
                        isIcon 
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        }
                    />
                </div>
                <div className='flex justify-between items-center'>
                    <Dropdown title="Estate" option={estate} />
                    <Dropdown title="Jenis Tugas" option={task} />
                    {/* <Task /> */}
                </div>
                <div className='my-4'>
                    <Table 
                        headerTitle={'Estate'}
                        titleItem={'Gembung'} 
                        titleCode={'TP0029883'}  
                        isWithFooter
                        tbList={tbList}
                        tbListFooter={tbListFooter}
                    />
                </div>
                <div className='my-4'>
                    <Table 
                        headerTitle={'Estate'}
                        titleItem={'Gembung'} 
                        titleCode={'TP0029883'}  
                        isWithFooter
                        tbList={tbList}
                        tbListFooter={tbListFooter}
                    />
                </div>
                <div className='my-4'>
                    <Table 
                        headerTitle={'Estate'}
                        titleItem={'Gembung'} 
                        titleCode={'TP0029883'}  
                        isWithFooter
                        tbList={tbList}
                        tbListFooter={tbListFooter}
                    />
                </div>
            </div>
        </>
    )
}

export default MabesList;