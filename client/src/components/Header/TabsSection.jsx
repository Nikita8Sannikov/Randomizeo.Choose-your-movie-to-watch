import React, { useState } from "react"
import styles from "./Header.module.css"
import { useNavigate } from "react-router-dom"
import Button from "../Button"
import Dropdown from "../Dropdown/Dropdown"

const TabsSection = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const options = ["Фильмы", "Сериалы"]
  const watchedOptions = ["Просмотренные фильмы", "Просмотренные сериалы"]
  const navigate = useNavigate()
  const handleSelect = (option) => {
    // console.log("Selected option:", option)

    if (option === "Фильмы") {
      navigate("/")
    } else if (option === "Сериалы") {
      navigate("/series")
    } else if (option === "Просмотренные фильмы") {
      navigate("/watched")
    } else if (option === "Просмотренные сериалы") {
      navigate("/watched/series")
    }
  }
  return (
    <section className={styles.navigationSection}>
      <div className={styles.buttonSection}>
        <Dropdown
          className={styles.navButton}
          label="Будем смотреть"
          options={options}
          onSelect={handleSelect}
        />
      </div>
      <div className={styles.buttonSection}>
        <Dropdown
          className={styles.navButton}
          label="Просмотренные"
          options={watchedOptions}
          onSelect={handleSelect}
        />
      </div>
    </section>
  )
}

export default TabsSection
