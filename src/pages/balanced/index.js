import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import FlatButton from '../../components/button/flat';
import { useNavigate } from 'react-router-dom';

const Balanced = () => {
    const [showDetail, setShowDetail] = useState(false);
    const navigate = useNavigate();

    const chevronDown = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    )

    const chevronRight = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    )

    const iconAdd = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    )

    const handleAddBalanced = () => {
        navigate(`/balanced/add`)
    }

    return(
        <div className="App">
            <Header title="Penimbangan TPH" isWithBack />
            <section className="container p-4">
                <h1 className="text-left mb-2">Mulai Penimbangan Baru</h1>
                <FlatButton role="white" className={'w-full mb-4 text-sm flex justify-center'} text={iconAdd} onClick={handleAddBalanced} />
                <h1 className="font-bold text-left mb-2">Penimbangan yang berlangsung</h1>
                <div className="flex justify-between mb-6">
                    <div className="flex flex-col items-start">
                        <p className="text-xs">10 Februari 2023, 15:00</p>
                        <p className="text-sm font-bold">TP1-01/02-12</p>
                    </div>
                    <button className="text-xs font-bold px-4 py-1 text-flora drop-shadow-md bg-white rounded-xl">Salin Kode</button>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <div className="flex-1 text-left"> P1 - <b>Slab</b> </div>
                        <div className="flex-1"> <b>0</b> kg </div>
                        <div className="flex-1 font-bold text-right"> Menimbang </div>                
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex-1 text-left"> P2 - <b>Cup Lump</b> </div>
                        <div className="flex-1"> <b>31</b> kg </div>
                        <div className="flex-1 font-bold text-right"> Menimbang </div>                
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex-1 text-left"> P3 - <b>Latek</b> </div>
                        <div className="flex-1"> <b>4</b> kg </div>
                        <div className="flex-1 font-bold text-right"> Menimbang </div>                
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex-1 text-left"> P4 - <b>Tree Leace</b> </div>
                        <div className="flex-1"> <b>12</b> kg </div>
                        <div className="flex-1 font-bold text-right"> Selesai </div>                
                    </div>
                </div>
                <FlatButton className={'w-full mb-4 text-sm flex justify-center mt-6'} text="Selesai" onClick={() => {}} />
                <div className="border-b border-flora"/>
                <div className="flex justify-between my-5">
                    <h1 className="font-black">Riwayat</h1>
                    <button className="flex items-center text-xs font-bold px-4 py-2 drop-shadow-md bg-white rounded-xl">Latest &nbsp; &nbsp; {chevronDown}</button>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full flex justify-between items-center py-3 border-b border-flora cursor-pointer" onClick={() => { setShowDetail(!showDetail) }}>
                        <div className="flex flex-col justify-start">
                            <div className="text-xs">10 Februari 2023, 15:00</div>
                            <h1 className="text-sm font-bold text-left">TP1-01/02-12</h1>
                        </div>
                        {showDetail ? chevronDown : chevronRight}
                    </div>
                    <div className={`flex flex-col w-full p-2 ${showDetail ? 'block' : 'hidden'} transition ease-in-out`}>
                        <div className="flex justify-between items-center">
                            <div className="flex-1 text-left"> P1 - <b>Slab</b> </div>
                            <div className="flex-1"> <b>0</b> kg </div>
                            <div className="flex-1 font-bold text-right"> Menimbang </div>                
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex-1 text-left"> P2 - <b>Cup Lump</b> </div>
                            <div className="flex-1"> <b>31</b> kg </div>
                            <div className="flex-1 font-bold text-right"> Menimbang </div>                
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex-1 text-left"> P3 - <b>Latek</b> </div>
                            <div className="flex-1"> <b>4</b> kg </div>
                            <div className="flex-1 font-bold text-right"> Menimbang </div>                
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex-1 text-left"> P4 - <b>Tree Leace</b> </div>
                            <div className="flex-1"> <b>12</b> kg </div>
                            <div className="flex-1 font-bold text-right"> Selesai </div>                
                        </div>
                    </div>
                </div>
                <FlatButton role="white" className="mt-10 mb-3 w-full" text="Kembali ke atas"/>
            </section>
        </div>
    )
}

export default Balanced