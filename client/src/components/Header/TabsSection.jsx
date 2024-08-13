import React, {useState} from "react"
import styles from "./Header.module.css"
import { useNavigate } from "react-router-dom"
import Button from "../Button"
import Dropdown from "../Dropdown/Dropdown"

const TabsSection = () => {
  const options = ['Фильмы', 'Сериалы'];
  const navigate = useNavigate()
  const handleSelect = (option) => {
    console.log('Selected option:', option);
  };
  return (
    <section className={styles.navigationSection}>
      <div className={styles.buttonSection}>
      <Button
        onclick={() => navigate("/")}
        className={styles.navButton}
      >
        Будем смотреть
      </Button>
      <Dropdown options={options} onSelect={handleSelect} />
      </div>
      <div className={styles.buttonSection}>
      <Button
        onclick={() => navigate("/watched")}
        className={styles.navButton}
      >
        Просмотренные
      </Button>
      <Dropdown options={options} onSelect={handleSelect} />
      </div>
    </section>
  )
}

export default TabsSection
