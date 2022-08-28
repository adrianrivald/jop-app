export default function TimePicker({value, onChange, defaultValue}) {
    return (
        <div class="relative">
              <input className="p-2 rounded-lg shadow flex justify-start w-full font-bold" defaultValue={defaultValue} type="time" onChange={onChange}  value={value}/>
        </div>
    );
  }
  