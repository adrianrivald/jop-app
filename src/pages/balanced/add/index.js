import React, { useEffect, useState } from 'react';
import Header from '../../../components/ui/Header';
import FlatButton from '../../../components/button/flat'

const AddBalanced = () => {
    const [reason, setReason] = useState('');

    useEffect(() => {

    }, [])

    return(
       <div className="App min-h-screen h-full" >
            <Header title="Penimbangan Baru" isWithBack/>
            <section className="container p-4 flex flex-col justify-start items-start" style={{ height: 'calc(100vh - 70px)'}}>
                <label htmlFor="reason" className="text-xs text-black mb-2">Divisi:</label>
                <select id="reason" className="flex justify-between w-full font-bold bg-white dark:bg-white shadow border-none text-xs rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-3" defaultValue={reason} onChange={(e) => { setReason(e.target.value) }}>
                    <option value={'Divisi 1'} className="block w-full">{reason.label}</option>
                </select>
                <label htmlFor="reason" className="text-xs text-black mb-2 mt-4">Divisi:</label>
                <select id="reason" className="flex justify-between w-full font-bold bg-white dark:bg-white shadow border-none text-xs rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-3" defaultValue={reason} onChange={(e) => { setReason(e.target.value) }}>
                    <option value={'Divisi 1'} className="block w-full">{reason.label}</option>
                </select>
                <div className="w-full border-b border-flora my-6"/>
                <h1 className="mb-4">Jenis Bahan Baku</h1>
                <ul className="flex flex-col w-full">
                    <li className="flex justify-between items-center my-2">
                        <label>Slab</label>
                        <input type="checkbox" value={1} className="w-6 h-6 border-2 rounded-lg mr-2" onChange={() => {}} defaultChecked={true} />
                    </li>
                    <li className="flex justify-between items-center my-2">
                        <label>Cup Lumb</label>
                        <input type="checkbox" value={1} className="w-6 h-6 border-2 rounded-lg mr-2" onChange={() => {}} defaultChecked={true} />
                    </li>
                    <li className="flex justify-between items-center my-2">
                        <label>Latek</label>
                        <input type="checkbox" value={1} className="w-6 h-6 border-2 rounded-lg mr-2" onChange={() => {}} defaultChecked={true} />
                    </li>
                    <li className="flex justify-between items-center my-2">
                        <label>Tree Lace</label>
                        <input type="checkbox" value={1} className="w-6 h-6 border-2 rounded-lg mr-2" onChange={() => {}} defaultChecked={true} />
                    </li>
                </ul>
                <div className="w-full border-b border-flora my-6"/>
                <h1>Informasi Cuaca Pengambilan</h1>
                <div className="my-4 flex justify-between w-full">
                    <div className="flex-1 flex flex-col mr-4">
                        <label htmlFor="reason" className="text-xs text-black text-left mb-2">Curah Hujan:</label>
                        <select id="reason" className="flex justify-between w-full font-bold bg-white dark:bg-white shadow border-none text-xs rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-3" defaultValue={reason} onChange={(e) => { setReason(e.target.value) }}/>
                    </div>
                    <div className="flex-1 flex flex-col mr-4">
                        <label htmlFor="reason" className="text-xs text-black text-left mb-2">Hari Hujan:</label>
                        <select id="reason" className="flex justify-between w-full font-bold bg-white dark:bg-white shadow border-none text-xs rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-3" defaultValue={reason} onChange={(e) => { setReason(e.target.value) }}/>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <label htmlFor="reason" className="text-xs text-black text-left mb-2">Waktu Hujan:</label>
                        <select id="reason" className="flex justify-between w-full font-bold bg-white dark:bg-white shadow border-none text-xs rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-3" defaultValue={reason} onChange={(e) => { setReason(e.target.value) }}/>
                    </div>
                </div>
                <div className="w-full border-b border-flora my-6"/>
                <label htmlFor="reason" className="text-xs text-black mb-2">Petugas Penimbang:</label>
                <select id="reason" className="flex justify-between w-full font-bold bg-white dark:bg-white shadow border-none text-xs rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-3" defaultValue={reason} onChange={(e) => { setReason(e.target.value) }}>
                    <option value={'Divisi 1'} className="block w-full">{reason.label}</option>
                </select>
                <div className="flex justify-between items-center my-7 w-full">
                    <FlatButton className={'w-full text-sm font-bold mr-4 mb-7'} text={'Kembali'} onClick={() => {}}/>
                    <FlatButton role="white" className={'w-full text-sm font-bold mb-7'} text={'Buat'} onClick={() => {}}/>
                </div>
            </section>
       </div>
    )
}

export default AddBalanced