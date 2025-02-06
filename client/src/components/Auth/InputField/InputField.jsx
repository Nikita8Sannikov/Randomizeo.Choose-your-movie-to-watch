import styles from "./InputField.module.css"

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div className={styles.inputField}>
      <label htmlFor={name} className={styles.inputLabel}>
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? `${styles.inputError}` : ""}`}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export default InputField;
