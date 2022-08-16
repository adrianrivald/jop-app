import React from 'react';
import Header from '../../../../components/ui/Header';
import Button from '../../../../components/button/Button';
import Table from '../../../../components/ui/Table';
import DropDown from '../../../../components/forms/Dropdown';
import DatePicker from '../../../../components/forms/DatePicker';
import FlatButton from '../../../../components/button/flat';
import TimePicker from '../../../../components/forms/TimePicker';

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

function MabesAssignment() {
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
            <div className='mt-5'>
                <h2 className='text-left mb-1'>{props.title}</h2>
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
                <div>
                    <Dropdown title="Pilih wilayah tugas" option={[{label: 'Gembung'}]} />
                    <Dropdown title="Divisi" option={[{label: 'Divisi 4'}]} />
                    <Dropdown title="Hancak" option={[{label: 'B'}]} />
                    <Dropdown title="Area/block" option={[{label: 'R 08 4 01'}]} />
                    <Dropdown title="Pilih jenis tugas" option={task} />
                    <Dropdown title="Pilih penanggung jawab tugas / Mandor" option={[{label: 'Aang Ginanjar'}]} />
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Clone</h2>
                            <p className='font-bold mt-2.5'>PB 366</p>
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Sistem</h2>
                            <DropDown onChange={() => console.log('')} option={[{label: '1/2SD/3'}]} />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Clone</h2>
                            <DatePicker />
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Sistem</h2>
                            <TimePicker />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-5'>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Ulangi Tugas</h2>
                            <DropDown onChange={() => console.log('')} option={[{label: 'Harian'}]} />
                        </div>
                        <div className='flex-auto w-64'>
                            <h2 className='text-left mb-1'>Batas Pengulangan</h2>
                            <DatePicker />
                        </div>
                    </div>
                    <div className='flex justify-between gap-2 mt-11'>
                        <FlatButton className='w-6/12 rounded-xl' role='white' text='Kembali' onClick={() => console.log()} />
                        <FlatButton className='w-6/12 rounded-xl' role='green' text='Buat' onClick={() => console.log()} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MabesAssignment;