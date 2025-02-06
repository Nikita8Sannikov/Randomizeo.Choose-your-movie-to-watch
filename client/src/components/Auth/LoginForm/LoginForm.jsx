import { useEffect, useRef, useState } from 'react'
import InputField from '../InputField/InputField'
import Button from '../AuthButton/Button'
import { useDispatch } from "react-redux";
import { signIn, register } from "../../../store/reducers/auth/authSlice";

import styles from "./LoginForm.module.css"

const LoginForm = () => {
  const dispatch = useDispatch();
    const formDataRef = useRef({
        name: "",
        email: "",
        password: "",
      })
    const [formErrors, setFormErrors] = useState({ name: "", email: "",
      password: ""})
    const [loading, setLoading] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      }

      useEffect(() => {
        formDataRef.current = {
          name: "",
          email: "",
          password: "",
        };
        setFormErrors({})
      }, [isRegistering])

      const validate = () => {
        const errors = {
            name: "",
            email: "",
            password: ""
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    
        if (!formDataRef.current.name) {
          errors.name = "Никнейм обязателен"
          // Добавить проверку ников на маты
        // } else if (!emailRegex.test(formDataRef.current.name)) {
        //   errors.email = "Некорректный формат email"
        }
        if (!formDataRef.current.email) {
          errors.email = "Email обязателен"
        } else if (!emailRegex.test(formDataRef.current.email)) {
          errors.email = "Некорректный формат email"
        }
    
        if (!formDataRef.current.password) {
          errors.password = "Пароль обязателен"
        } else if (formDataRef.current.password.length < 6) {
          errors.password = "Пароль должен содержать минимум 6 символов"
        }
    
        return errors
      }

      const handleChange = (e) => {
        formDataRef.current={
          ...formDataRef.current,
          [e.target.name]: e.target.value,
        }
        setFormErrors({
          ...formErrors,
          [e.target.name]: "",
        })
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validate()
    
        if (Object.keys(errors).length) {
          setFormErrors(errors)
          return
        }
    
        setFormErrors({})
         
      }
    
      const authHandlers = {
        onLogin: () =>
          dispatch(signIn({ email: formDataRef.current.email, password: formDataRef.current.password })),
        onReg: () =>
          dispatch(
            register({
              email: formDataRef.current.email,
              password: formDataRef.current.password,
              name: formDataRef.current.name,
            })),
      };

  return (
    <div className={styles.loginFormContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>
        {isRegistering ? "Регистрация" : "Вход в систему"}
        </h2>
        <div className={styles.cardContent}>
          {isRegistering && (
        <div>
        <InputField
          label="Никнейм"
          type="name"
          name="name"
          value={formDataRef.current.name}
          onChange={handleChange}
          placeholder="Введите ваш никнейм"
          error={formErrors.name}
        />
        </div>
            )}
        <div>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formDataRef.current.email}
            onChange={handleChange}
            placeholder="Введите ваш email"
            error={formErrors.email}
          />
        </div>
        <div className={styles.passwordField}>
          <InputField
            label="Пароль"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formDataRef.current.password}
            onChange={handleChange}
            placeholder="Введите ваш пароль"
            error={formErrors.password}
          />
          <span
            className={styles.passwordToggle}
            onClick={handleTogglePasswordVisibility}
          >
            {showPassword ? "👁️" : "🙈"}
          </span>
        </div>
        </div>
        <div className={styles.inputAction}>
          <Button type="submit" disabled={loading} onClick={isRegistering ? authHandlers.onReg : authHandlers.onLogin}>
             {loading ? "Загрузка..." : isRegistering ? "Регистрация" : "Войти"}
          </Button>
          </div>
        <div className={styles.toggleAction}>
          {isRegistering ? (
            <p>
              Уже есть аккаунт?{" "}
              <span onClick={() => setIsRegistering(false)}>
                Войти
              </span>
            </p>
          ) : (
            <p>
              Нет аккаунта?{" "}
              <span  onClick={() => setIsRegistering(true)}>
                Зарегистрироваться
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginForm