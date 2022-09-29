import React from "react";
import Button from "../../../components/button/Button";
import DropDown from "../../../components/forms/Dropdown";
import Divider from "../../../components/ui/Divider";

function CheckIn (props) {
    const [openedId, setOpenedId] = React.useState({});
    const [checkInData, setCheckInData] = React.useState([
        {
            status: 'Perjalanan',
            date: 'Rabu, 12 Februari 2022, 15:37',
            code: 'TP1-01/02-12/B.007/P1',
            detail: {
                jenis_logistik: 'Ojek - Motor (120 Kg)',
                armada: 'B 3355 QPR  -  01',
                alamat: 'Gudang Induk - WH1 - G1',
                supir: 'Aji Kuntara / 02887 - PKWT',
                pengawal: 'Sumber Wono / 02887 - PKWT'
            },
            foto : []
        },
        {
            status: 'Perjalanan',
            date: 'Kamis, 12 Februari 2022, 15:37',
            code: 'TP1-01/02-12/B.007/P2',
            detail: {
                jenis_logistik: 'Ojek - Motor (114 Kg)',
                armada: 'B 155 QPR  -  01',
                alamat: 'Gudang Induk - WH1 - G1',
                supir: 'Aji Kuntara / 02887 - PKWT',
                pengawal: 'Sumber Wono / 02887 - PKWT'
            },
            foto : []
        },
        {
            status: 'Perjalanan',
            date: 'Jumat, 12 Februari 2022, 15:37',
            code: 'TP1-01/02-12/B.007/P2',
            detail: {
                jenis_logistik: 'Ojek - Motor (114 Kg)',
                armada: 'B 155 QPR  -  01',
                alamat: 'Gudang Induk - WH1 - G1',
                supir: 'Aji Kuntara / 02887 - PKWT',
                pengawal: 'Sumber Wono / 02887 - PKWT'
            },
            foto : []
        }
    ]);

    const onExpand = (idx) => {
        setOpenedId({
            ...openedId,
            [`item_${idx}`] : true
        })
    }

    const onCollapse = (idx) => {
        setOpenedId({
            ...openedId,
            [`item_${idx}`] : false
        })        
    }

    const onCheckMaterial = () => {
        // TODO
    }

    return (
        <div>
            <div className="scan mt-3">
                <Button 
                    isIcon 
                    icon={
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0555 0C11.2521 0 12.2222 0.970047 12.2222 2.16667V3.5C12.2222 3.77614 11.9983 4 11.7222 4C11.446 4 11.2222 3.77614 11.2222 3.5V2.16667C11.2222 1.52233 10.6998 1 10.0555 1H8.72217C8.44603 1 8.22217 0.77614 8.22217 0.5C8.22217 0.22386 8.44603 0 8.72217 0H10.0555ZM3.72217 0C3.9983 0 4.22217 0.22386 4.22217 0.5C4.22217 0.77614 3.9983 1 3.72217 1H2.38883C1.7445 1 1.22217 1.52233 1.22217 2.16667V3.5C1.22217 3.77614 0.998301 4 0.722168 4C0.446034 4 0.222168 3.77614 0.222168 3.5V2.16667C0.222168 0.970047 1.19223 0 2.38883 0H3.72217ZM11.2222 8.5C11.2222 8.22387 11.446 8 11.7222 8C11.9983 8 12.2222 8.22387 12.2222 8.5V9.83333C12.2222 11.0299 11.2521 12 10.0555 12H8.72217C8.44603 12 8.22217 11.7761 8.22217 11.5C8.22217 11.2239 8.44603 11 8.72217 11H10.0555C10.6998 11 11.2222 10.4777 11.2222 9.83333V8.5ZM0.222168 8.5C0.222168 8.22387 0.446034 8 0.722168 8C0.998301 8 1.22217 8.22387 1.22217 8.5V9.83333C1.22217 10.4777 1.7445 11 2.38883 11H3.72217C3.9983 11 4.22217 11.2239 4.22217 11.5C4.22217 11.7761 3.9983 12 3.72217 12H2.38883C1.19223 12 0.222168 11.0299 0.222168 9.83333V8.5ZM9.22217 5.5C9.49831 5.5 9.72217 5.72387 9.72217 6C9.72217 6.27613 9.49831 6.5 9.22217 6.5H3.22217C2.94603 6.5 2.72217 6.27613 2.72217 6C2.72217 5.72387 2.94603 5.5 3.22217 5.5H9.22217Z" fill="white"/>
                        </svg>
                    }
                    text="Scan Barang Sampai"
                    className="w-full mt-2"
                    // onClick={()=> navigate(`scan`)}
                />
            </div>
            <div className="flex justify-between items-center mt-4">
                <p className="text-sm font-bold">Daftar Barang Sampai</p>
                <DropDown option={[]} defaultValue="Slab(P1)"/>
            </div>
            <div className='mt-7'>
                {
                    checkInData?.length > 0 ? checkInData?.map((res, idx) => {
                        return (
                            openedId[`item_${idx}`] === true ? (
                                <div className="bg-white p-3">
                                    <div className='flex justify-between items-center mt-2 transition-transform cursor-pointer' onClick={() => onCollapse(idx)} >
                                        <div className="flex items-center">
                                            <input checked={false} onClick={onCheckMaterial} type="checkbox" className="accent-flora scale-150 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 mr-3"/>
                                            <p className="font-bold">{res?.code}</p>
                                        </div>
                                        <div className="cursor-pointer">
                                            <svg className="rotate-90"  width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002" stroke="#A7A29A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                    </div>  
                                    <div className=" p-3 ">
                                        <div className="flex gap-3 my-1">
                                            <p className="w-2/4">Jenis Logistik</p>
                                            <p className="w-2/4 font-bold">{res?.detail?.jenis_logistik}</p>
                                        </div>
                                        <div className="flex gap-3 my-1">
                                            <p className="w-2/4">Armada</p>
                                            <p className="w-2/4 font-bold">{res?.detail?.armada}</p>
                                        </div>
                                        <div className="flex gap-3 my-1">
                                            <p className="w-2/4">Alamat / fasilitas tujuan</p>
                                            <div className="w-2/4 ">
                                                <p className="font-bold">{res?.detail?.alamat.split("-")[0]}</p>
                                                <p className="font-bold">{res?.detail?.alamat.split("-")[1]}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 my-1">
                                            <p className="w-2/4">Supir / pengendara</p>
                                            <div className="w-2/4 ">
                                                <p className="font-bold">{res?.detail?.supir.split("-")[0]}</p>
                                                <p className="font-bold">{res?.detail?.supir.split("-")[1]}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 my-1">
                                            <p className="w-2/4">Pengawal</p>
                                            <div className="w-2/4 ">
                                                <p className="font-bold">{res?.detail?.pengawal.split("-")[0]}</p>
                                                <p className="font-bold">{res?.detail?.pengawal.split("-")[1]}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider/>
                                </div>
                            ) : (
                                <div className="p-3">
                                    <div className='flex justify-between items-center mt-2 transition-transform cursor-pointer' onClick={() => onExpand(idx)} >
                                        <div className="flex">
                                            <input checked={false} onClick={onCheckMaterial} type="checkbox" className="accent-flora scale-150 text-flora bg-gray-100 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 mr-3"/>
                                            <p className="font-bold">{res?.code}</p>
                                        </div>
                                        <div className="cursor-pointer">
                                            <svg  width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.22217 1.00024L5.22217 6.00024L1.22217 11.0002" stroke="#A7A29A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                    </div>  
                                    <Divider />
                                </div>
                            )
                        )
                    }) : (
                        <div className='flex justify-center'>No Data</div>
                    )
                }
            </div>
        </div>
    )
}

export default CheckIn;