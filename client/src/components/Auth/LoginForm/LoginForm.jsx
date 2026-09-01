import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import InputField from '../AuthInput/AuthInput'
import Button from '../../Button';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';
import { signIn, register } from "../../../store/reducers/auth/authSlice";

import styles from "./LoginForm.module.css"

const LoginForm = () => {
  const { t } = useTranslation();
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
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    
        if( isRegistering && !formData.name) {
          // Добавить проверку ников на нецензурную лексику
        // } else if (!emailRegex.test(formDataRef.current.name)) {
        //   errors.email = "Некорректный формат email"
          errors.name = t("auth.errors.nameRequired")
        }
        if (!formData.email) {
          errors.email = t("auth.errors.emailRequired")
        } else if (!emailRegex.test(formData.email)) {
          errors.email = t("auth.errors.emailInvalid")
        }
        if (!formData.password) {
          errors.password = t("auth.errors.passwordRequired")
        } else if (formData.password.length < 6) {
          errors.password = t("auth.errors.passwordMin")
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

        if (isRegistering) {
          await authHandlers.onReg();
        } else {
          await authHandlers.onLogin();
        }
      }
    
      const authHandlers = {
        onLogin: async () => {
          setLoading(true);

          const errors = validate();
          if (Object.values(errors).some(error => error)) { 
            setFormErrors(errors);
            setLoading(false);
            return;
          }
          try{
           await dispatch(signIn({ email: formData.email, password: formData.password })).unwrap();
          } catch (error) {
            console.error("Ошибка входа:", error);
            setFormErrors({ name: "", email: t("auth.errors.wrongCredentials"), password: ""});
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
            setFormErrors({ name: "", email: t("auth.errors.emailTaken"), password: ""});
          }finally {
            setLoading(false);
          }
        }
      };

  return (
    <div className={styles.loginFormContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit} >
        <LanguageSwitcher className={styles.langSwitcher} />
        <h2 className={styles.formTitle}>
        {isRegistering ? t("auth.registerTitle") : t("auth.loginTitle")}
        </h2>
        <div className={styles.cardContent}>
          {isRegistering && (
        <div>
        <InputField
          label={t("auth.nickname")}
          type="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t("auth.nicknamePlaceholder")}
          error={formErrors.name}
          iswrapper
        />
        </div>
            )}
        <div>
          <InputField
            label={t("auth.email")}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("auth.emailPlaceholder")}
            error={formErrors.email}
            iswrapper
          />
        </div>
        <div className={styles.passwordField}>
          <InputField
            label={t("auth.password")}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("auth.passwordPlaceholder")}
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
          <Button className={styles.loginButton} type="submit" disabled={loading}
           > 
             {loading ? t("auth.loading") : isRegistering ? t("auth.submitRegister") : t("auth.submitLogin")}
          </Button>
          </div>
        <div className={styles.toggleAction}>
          {isRegistering ? (
            <p>
              {t("auth.haveAccount")}{" "}
              <span onClick={() => setIsRegistering(false)}>
                {t("auth.signInLink")}
              </span>
            </p>
          ) : (
            <p>
              {t("auth.noAccount")}{" "}
              <span  onClick={() => setIsRegistering(true)}>
                {t("auth.signUpLink")}
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginForm