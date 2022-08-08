export default function DropDown({
  option,
  onChange
}) {
  return (
    <div>
        <select onChange={onChange} className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {
            option.map((res, idx) => {
              return (
                <option key={idx} value={res.label}>{res.label}</option>
              )
            })
          }
        </select>
    </div>
  )
}
