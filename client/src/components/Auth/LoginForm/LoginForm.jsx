import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";

import InputField from '../AuthInput/AuthInput'
import Button from '../../Button';
import { signIn, register } from "../../../store/reducers/auth/authSlice";

import styles from "./LoginForm.module.css"

const LoginForm = () => {
  const dispatch = useDispatch();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [formErrors, setFormErrors] = useState({ name: "", email: "", password: ""})
    const [loading, setLoading] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      }

      useEffect(() => {
        if (isRegistering) {
          setFormData({ name: "", email: "", password: "" }); 
        } else {
          setFormData(prev => ({ name: "", email: prev.email, password: prev.password })); 
        }
        setFormErrors({})
      }, [isRegistering])

      const validate = () => {
        const errors = {
            name: "",
            email: "",
            password: ""
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    
        if( !formData.name) {
          errors.name = "Никнейм обязателен"
          // Добавить проверку ников на нецензурную лексику
        // } else if (!emailRegex.test(formDataRef.current.name)) {
        //   errors.email = "Некорректный формат email"
        }
        if (!formData.email) {
          errors.email = "Email обязателен"
        } else if (!emailRegex.test(formData.email)) {
          errors.email = "Некорректный формат email"
        }
        if (!formData.password) {
          errors.password = "Пароль обязателен"
        } else if (formData.password.length < 6) {
          errors.password = "Пароль должен содержать минимум 6 символов"
        }
    
        return errors
      }

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        })
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
        onLogin: async () => {
          setLoading(true);

          try{
           await dispatch(signIn({ email: formData.email, password: formData.password })).unwrap();
          } catch (error) {
            console.error("Ошибка входа:", error);
            setFormErrors({ name: "", email: "Неверный email или пароль", password: ""});
          } finally {
            setLoading(false);
          }
        },
         
        onReg: async () =>{
          setLoading(true);

          const errors = validate();
          if (Object.values(errors).some(error => error)) { 
            setFormErrors(errors);
            setLoading(false);
            return;
          }
          try {
         await dispatch(
            register({
              email: formData.email,
              password: formData.password,
              name: formData.name
            })).unwrap();

            setIsRegistering(false);
            setFormData({ email: formData.email, password: formData.password, name: "" });
            setFormErrors({});
          } catch (error) {
            console.error("Ошибка регистрации:", error);
            setFormErrors({ name: "", email: "Пользователь с таким email уже зарегистрирован", password: ""});
          }finally {
            setLoading(false);
          }
        }
      };

  return (
    <div className={styles.loginFormContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit} >
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
          value={formData.name}
          onChange={handleChange}
          placeholder="Введите ваш никнейм"
          error={formErrors.name}
          iswrapper
        />
        </div>
            )}
        <div>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введите ваш email"
            error={formErrors.email}
            iswrapper
          />
        </div>
        <div className={styles.passwordField}>
          <InputField
            label="Пароль"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введите ваш пароль"
            error={formErrors.password}
            iswrapper
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
          <Button className={styles.loginButton} type="submit" disabled={loading} onclick={isRegistering ? authHandlers.onReg : authHandlers.onLogin}>
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