export default function DropDown({
  option,
  onChange
}) {
  return (
    <div>
        <select onChange={onChange} className="bg-white-50 shadow border-none text-black text-sm rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-3">
          {
            option.map((res, idx) => {
              return (
                <option className="font-bold" key={idx} value={res.label}>{res.label}</option>
              )
            })
          }
        </select>
    </div>
  )
}
