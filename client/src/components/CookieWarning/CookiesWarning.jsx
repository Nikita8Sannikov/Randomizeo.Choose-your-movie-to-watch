import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

import styles from "./CookiesWarning.module.css"

const CookiesWarning = () => {
    const [cookiesBlocked, setCookiesBlocked] = useState(false)
  
    useEffect(() => {
      setCookiesBlocked(!navigator.cookieEnabled)
    }, [])
  
    if (!cookiesBlocked) return null // Если куки включены, не рендерим ничего
  
    return createPortal(
      <div className={styles.cookiesWarning}>
        <h1>Ваш браузер блокирует куки. Разрешите их в настройках!</h1>
        
       <p>А то чуда не случится, как закроете сайт можете включить обратно, простите...</p>
        <br/>
       <p> Настройки браузера {">"} конфиденциальность и безопасность {">"} сторонние файлы куки {">"} разрешить использование сторонних файлов куки
       </p>
      </div>,
      document.body 
    )
  }
  
  export default CookiesWarning
  