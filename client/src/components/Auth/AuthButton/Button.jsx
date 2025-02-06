import styles from "./Button.module.css"

const Button = ({ type, onClick, disabled, children }) => {
  return (
    <button
      className={styles.button}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button;
