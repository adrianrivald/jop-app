export default function DropDown({
  option,
  onChange,
  defaultValue,
  selected,
  ...rest
}) {
  return (
    <div>
        <select defaultValue={defaultValue} onChange={onChange} {...rest} className="font-bold bg-white-50 shadow border-none text-xs rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-3">
          {defaultValue && (<option selected hidden disabled>{defaultValue}</option>)}
          {
            option.map((res, idx) => {
              return (
                <option key={idx} value={res.value} selected={selected === res.value}>{res.label}</option>
              )
            })
          }
        </select>
    </div>
  )
}
