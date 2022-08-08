export default function DropDown({
  option,
  onChange
}) {
  return (
    <div>
        <select onChange={onChange} className="bg-white-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-2.5">
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
