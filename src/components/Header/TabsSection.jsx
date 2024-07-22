import React from "react"
import Button from "../Button"
import styles from "./Header.module.css"
import { useNavigate } from "react-router-dom"

const TabsSection = () => {
  const navigate = useNavigate()
  return (
    <section className={styles.navigationSection}>
      <Button
        onclick={() => navigate("/")}
        className={styles.navButton}
      >
        Будем смотреть
      </Button>
      <Button
        onclick={() => navigate("/watched")}
        className={styles.navButton}
      >
        Просмотренные
      </Button>
    </section>
  )
}

export default TabsSection
