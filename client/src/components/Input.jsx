
export default function Input({
  labelFor,
  description,
  type="text",
  id,
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  inputClassName,
  labelClassName,
  children
}) {
  return (
    <>
      <label htmlFor={labelFor} className={labelClassName}>{description}</label>
      <input
        className={inputClassName}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
      {children}
    </>
  )
}
