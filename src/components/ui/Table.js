export default function Table({
    headerTitle,
    titleItem,
    titleCode,
    isWithHeader,
    isWithFooter,
    isWithStatus,
    divisi_item,
    hancak_item,
    block_item,
    clone_item,
    sistem_item,
    tbListFooter,
    status,
    backgroundColor = 'bg-white',
    borderColor,
    cellBorder = 'border-bgrey',
    onClick
}){

    const TableItem = (props) => {
        return (
            <table onClick={onClick} className={`${isWithHeader && !props.isTableFooter ? 'border-t-2' : '' } ${isWithFooter && !props.isTableFooter ? 'border-b-2 ' : ''} border-bgrey border-spacing-1 bg-bgrey w-full text-sm text-left text-gray-500 dark:text-gray-400 cursor-pointer`}>
                <thead className={`text-xs ${backgroundColor}`}>
                    <tr>
                        <th scope="col" className={`py-3 px-2 ${props.isTableFooter  ? '' : 'border-l-2'} ${cellBorder}`}>
                            <div className="my-2 font-normal">
                                Divisi
                            </div>
                            <div>
                                {props.divisi_item}
                            </div>
                        </th>
                        <th scope="col" className={`py-3 px-2 ${props.isTableFooter  ? '' : 'border-l-2'} ${cellBorder}`}>
                            <div className="my-2 font-normal">
                                Hancak
                            </div>
                            <div>
                                {props.hancak_item}
                            </div>
                        </th>
                        <th scope="col" className={`py-3 px-2 ${props.isTableFooter  ? '' : 'border-l-2'} ${cellBorder}`}>
                            <div className="my-2 font-normal">
                                Block
                            </div>
                            <div>
                                {props.block_item}
                            </div>
                        </th>
                        <th scope="col" className={`py-3 px-2 ${props.isTableFooter  ? '' : 'border-l-2'} ${cellBorder}`}>
                            <div className="my-2 font-normal">
                                Clone
                            </div>
                            <div>
                                {props.clone_item}
                            </div>
                        </th>
                        <th scope="col" className={`py-3 px-2 ${props.isTableFooter  ? '' : 'border-l-2'} ${cellBorder}`}>
                            <div className="my-2 font-normal">
                                Sistem
                            </div>
                            <div>
                                {props.sistem_item}
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>
        )
    }

    const Header = (props) => {
        return (
            <div className="flex justify-between items-center py-3 px-2 bg-white">
                <span className="text-xs">
                    {props.title} : 
                        <span className="font-bold text-lg">
                            &nbsp;{ props.titleItem}
                        </span>
                </span>
                <span className="font-bold">
                    {props.titleCode}
                </span>
            </div>
        )
    }

    const Status = (props) => {
        return (
            <div className="flex justify-between items-center py-3 px-2 bg-sun text-white">
                <span>Status</span>
                <span className="font-bold">{props.status}</span>
            </div>
        )
    }

    return (
        <div className={`overflow-x-auto relative rounded-lg ${borderColor}`}>
            {isWithHeader && ( <Header title={headerTitle} titleItem={titleItem} titleCode={titleCode} />)}
            <TableItem 
                divisi_item={divisi_item}
                hancak_item={hancak_item}
                clone_item={clone_item}
                block_item={block_item}
                sistem_item={sistem_item}    
            />
            {/* { isWithFooter && (<TableItem tbList={tbListFooter} isTableFooter />)} */}
            { isWithStatus && (<Status status={status} />)}
        </div>
    )
}