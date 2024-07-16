import React from "react"
import Input from "../Input"
import Button from "../Button"
import styles from "./AddFilmSection.module.css"

const AddKinopoisk = ({optionsShow, setOptionsShow}) => {
  return (
    <div className={styles.addFilm}>
      <div className={styles.kinopoiskSection}>
        <div className={styles.inputKinopoisk}>
          <Input
            type="text"
            id="text3"
            placeholder="Введите ссылку на Кинопоиск"
          />
          <Button className={styles.barsBtn} onclick={() => setOptionsShow(prev => !prev)}>
            <span className="fa-solid fa-bars fa-3x bars-icon"></span>
          </Button>
        </div>
        <Button className={styles.addKinopoiskButton}>Добавить фильм</Button>
      </div>
    </div>
  )
}

export default AddKinopoisk
