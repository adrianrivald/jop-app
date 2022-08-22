export default function DatePicker({onChange,defaultValue}) {
  return (
    <div className="relative">
      <input date defaultValue={defaultValue} type="date" className="shadow border-none bg-white-50 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Select date" onChange={onChange} />
    </div>
  );
}
