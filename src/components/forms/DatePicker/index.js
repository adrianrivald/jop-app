/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
export default function DatePicker({ onChange, defaultValue, ...rest }) {
  return (
    <div className="relative">
      <input
        type="date"
        defaultValue={defaultValue}
        className="shadow border-none bg-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Select date"
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}
