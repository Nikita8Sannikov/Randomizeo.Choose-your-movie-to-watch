import React from "react"
import Input from "../Input"
import Button from "../Button"
import styles from "./AddFilmSection.module.css"

const AddKinopoisk = ({optionsShow, setOptionsShow, kinopoisk, setKinopoisk, handleAddFilm, onFocus}) => {
 const addKinopoisk = (event) => setKinopoisk(event.target.value)
 const AddFilmClick = () => {
  if(kinopoisk){
  const KINOPOISK_id = kinopoisk.split('/').splice(-2, 1)[0]
  // console.log(KINOPOISK_id);
  handleAddFilm(KINOPOISK_id)
  setKinopoisk("")
  }
 }

  return (
    <div className={styles.addFilm}>
      <div className={styles.kinopoiskSection}>
        <div className={styles.inputKinopoisk}>
          <Input
            type="text"
            id="text3"
            placeholder="Введите ссылку на Кинопоиск"
            value = {kinopoisk}
            onChange={addKinopoisk}
            onFocus={onFocus}
          />
          <Button className={styles.barsBtn} onclick={() => setOptionsShow(prev => !prev)}>
            <span className="fa-solid fa-bars fa-3x bars-icon"></span>
          </Button>
        </div>
        <Button className={styles.addKinopoiskButton}
        onclick={AddFilmClick}
        >Добавить фильм</Button>
      </div>
    </div>
  )
}

export default AddKinopoisk
