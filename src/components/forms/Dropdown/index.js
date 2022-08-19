export default function DropDown({
  option,
  onChange,
  defaultValue
}) {
  return (
    <div>
        <select defaultValue={defaultValue} onChange={onChange} className="font-bold bg-white-50 shadow border-none text-black text-sm rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-3">
          {
            option.map((res, idx) => {
              return (
                <option key={idx} value={res.value}>{res.label}</option>
              )
            })
          }
        </select>
    </div>
  )
}
