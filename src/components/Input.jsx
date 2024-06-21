export default function Input({labelFor, description, id, placeholder }) {
  return (
    <>
      <label htmlFor={labelFor}>{description}</label>
      <input type="text" id={id} placeholder={placeholder} />
    </>
  )
}
