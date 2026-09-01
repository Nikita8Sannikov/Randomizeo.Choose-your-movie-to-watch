import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"

import styles from "./CookiesWarning.module.css"

const CookiesWarning = () => {
    const { t } = useTranslation()
    const [cookiesBlocked, setCookiesBlocked] = useState(false)
  
    useEffect(() => {
      setCookiesBlocked(!navigator.cookieEnabled)
    }, [])
  
    if (!cookiesBlocked) return null
  
    return createPortal(
      <div className={styles.cookiesWarning}>
        <h1>{t("cookies.title")}</h1>
        
       <p>{t("cookies.hint")}</p>
        <br/>
       <p>{t("cookies.path")}</p>
      </div>,
      document.body 
    )
  }
  
  export default CookiesWarning
