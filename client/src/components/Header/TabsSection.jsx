import React, { useState } from "react"
import styles from "./Header.module.css"
import { useNavigate } from "react-router-dom"
import Button from "../Button"
import Dropdown from "../Dropdown/Dropdown"

const TabsSection = () => {
  const options = ["Фильмы", "Сериалы"]
  const watchedOptions = ["Просмотренные фильмы", "Просмотренные сериалы"]
  const navigate = useNavigate()
  const handleSelect = (option) => {
    console.log("Selected option:", option)
    
    if (option === 'Фильмы') {
      navigate("/");
    } else if (option === 'Сериалы') {
      navigate("/series");
    } else if (option === 'Просмотренные фильмы') {
      navigate("/watched");
    } else if (option === 'Просмотренные сериалы') {
      navigate("/watched/series");
    }
  }
  return (
    <section className={styles.navigationSection}>
      <div className={styles.buttonSection}>
        <Button onclick={() => navigate("/")} className={styles.navButton}>
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
        <Dropdown options={watchedOptions} onSelect={handleSelect} />
      </div>
    </section>
  )
}

export default TabsSection
