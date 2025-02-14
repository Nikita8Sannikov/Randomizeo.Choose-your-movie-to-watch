import { useDispatch, useSelector } from "react-redux"

import { signOut } from "../../store/reducers/auth/authSlice"
import Button from "../Button"

import styles from "./Header.module.css"

const LogoutSection = () => {
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
        <Button className={styles.logoutButton} onclick={authHandlers.onLogout}>Выход</Button>
    </div>
    
  )
}

export default LogoutSection