export default function Input(props) {
  return (
    <>
      <label htmlFor={props.labelFor}>{props.description}</label>
      <input type="text" id={props.id} placeholder={props.placeholder} />
    </>
  )
}
