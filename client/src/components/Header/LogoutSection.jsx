import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

import { signOut } from "../../store/reducers/auth/authSlice"
import Button from "../Button"

import styles from "./Header.module.css"

const LogoutSection = () => {
    const { t } = useTranslation()
    const userName = useSelector((state) => state.auth.user.name)
    const dispatch = useDispatch();

    const authHandlers = {
    onLogout: () =>
        dispatch(signOut()),
    }
  return (
    <div className={styles.logoutSection}>
        <div className={styles.avatar}>{userName.slice(0,1)}</div>
        <div className={styles.userName}><h2>{userName}</h2></div>
        <Button className={styles.logoutButton} onclick={authHandlers.onLogout}>{t("header.logout")}</Button>
    </div>
    
  )
}

export default LogoutSection