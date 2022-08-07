export default function Table({
    estate,
    estate_code,
    isWithHeader,
    isWithFooter
}){
    return (
        <div className="overflow-x-auto relative rounded-lg bg-bgrey">
            {
                isWithHeader ?
                    <div className="flex justify-between items-center py-3 px-2 bg-white">
                        <span className="text-xs">
                            Estate : 
                                <span className="font-bold text-lg">
                                    &nbsp;{ estate}
                                </span>
                        </span>
                        <span className="font-bold">
                            {estate_code}
                        </span>
                    </div> : null
            }
            <table className={`${isWithHeader ? 'border-t-2' : '' } ${isWithFooter ? 'border-b-2 ' : ''} border-bgrey border-spacing-1 bg-bgrey w-full text-sm text-left text-gray-500 dark:text-gray-400`}>
                <thead className="text-xs bg-white">
                    <tr>
                        <th scope="col" className="py-3 px-2">
                            <div className="my-2 font-normal">
                                Divisi
                            </div>
                            <div>
                                4
                            </div>
                        </th>
                        <th scope="col" className="py-3 px-2">
                            <div className="my-2 font-normal">
                                Hancak
                            </div>
                            <div>
                                B
                            </div>
                        </th>
                        <th scope="col" className="py-3 px-2">
                            <div className="my-2 font-normal">
                                Block
                            </div>
                            <div>
                                R.08401 
                            </div>
                        </th>
                        <th scope="col" className="py-3 px-2">
                            <div className="my-2 font-normal">
                                Clone
                            </div>
                            <div>
                                PB 366
                            </div>
                        </th>
                        <th scope="col" className="py-3 px-2">
                            <div className="my-2 font-normal">
                                Sistem
                            </div>
                            <div>
                                1/2SD/3
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>
            {
                isWithFooter ?
                    <table className="border-grey border-spacing-1 bg-bgrey w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs bg-white">
                            <tr>
                                <th scope="col" className="py-3 px-2 w-6/12">
                                    <div className="my-2 font-normal">
                                        Mandor
                                    </div>
                                    <div>
                                        Aang Ginanjar
                                    </div>
                                </th>
                                <th scope="col" className="py-3 px-2">
                                    <div className="my-2 font-normal">
                                        Tapper
                                    </div>
                                    <div>
                                        12
                                    </div>
                                </th>
                                <th scope="col" className="py-3 px-2">
                                    <div className="my-2 font-normal">
                                        Waktu Kerja
                                    </div>
                                    <div>
                                        05:30 - Selesai
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                :null
            }
        </div>
    )
}