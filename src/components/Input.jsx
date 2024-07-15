import React from "react"

export default function Input({
  labelFor,
  description,
  id,
  placeholder,
  value,
  onChange,
}) {


  return (
    <>
      <label htmlFor={labelFor}>{description}</label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  )
}
