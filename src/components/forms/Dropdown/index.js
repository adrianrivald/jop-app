/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
export default function DropDown({ option, onChange, defaultValue, selected, className = 'bg-white', ...rest }) {
  return (
    <div>
      <select
        defaultValue={defaultValue}
        onChange={onChange}
        {...rest}
        className={`font-bold dark:bg-white shadow border-none text-xs rounded-lg focus:ring-flora-500 focus:border-flora-500 block w-full p-3 ${className}`}
      >
        {defaultValue && (
          <option selected hidden disabled>
            {defaultValue}
          </option>
        )}
        {option?.map((res, idx) => (
          <option key={idx} value={res.value} selected={selected === res.value}>
            {res.label}
          </option>
        ))}
      </select>
    </div>
  );
}
