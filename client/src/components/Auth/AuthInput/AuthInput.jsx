import Input from "../../Input";
import styles from "./AuthInput.module.css"

const AuthInput = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  iswrapper,
  error,
}) => {
  const inputElement = (
    <Input 
    description={label} 
    type={type} 
    labelFor={name}
    name={name}
    id={name} 
    value={value} 
    onChange={onChange} 
    placeholder={placeholder}
    inputClassName={`${styles.input} ${error ? `${styles.inputError}` : ""}`}
    labelClassName={styles.inputLabel}
    error={error}>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </Input>
  )
  return (
    iswrapper ? <div className={styles.inputField}>{inputElement}</div> : inputElement
  )
}

export default AuthInput;
