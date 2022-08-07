export default function Table({
    headerTitle,
    titleItem,
    titleCode,
    isWithHeader,
    isWithFooter,
    isWithStatus,
    tbList,
    tbListFooter,
    status
}){

    const TableItem = (props) => {
        return (
            <table className={`${isWithHeader && !props.isTableFooter ? 'border-t-2' : '' } ${isWithFooter && !props.isTableFooter ? 'border-b-2 ' : ''} border-bgrey border-spacing-1 bg-bgrey w-full text-sm text-left text-gray-500 dark:text-gray-400`}>
                <thead className="text-xs bg-white">
                    <tr>
                        {
                            props.tbList.map((result, idx) => {
                                console.log(result,'resulttable')
                                return (
                                    <th scope="col" className={`py-3 px-2 ${props.isTableFooter && idx === 0 ? 'w-6/12' : ''}`}>
                                        <div className="my-2 font-normal">
                                            {result.field}
                                        </div>
                                        <div>
                                            {result.item}
                                        </div>
                                    </th>
                                )
                            })
                        }
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
        <div className="overflow-x-auto relative rounded-lg bg-bgrey">
            {
                isWithHeader ?
                    <Header title={headerTitle} titleItem={titleItem} titleCode={titleCode} /> : null
            }
            <TableItem tbList={tbList} />
            { isWithFooter ? <TableItem tbList={tbListFooter} isTableFooter /> : null}
            { isWithStatus ? <Status status={status} /> : null}
        </div>
    )
}