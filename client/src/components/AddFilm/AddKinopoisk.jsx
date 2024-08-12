import React, { useCallback, useEffect, useState } from "react"
import Input from "../Input"
import Button from "../Button"
import styles from "./AddFilmSection.module.css"
import useFilmData from "../../../hooks/useFilmData"

const AddKinopoisk = ({ setOptionsShow, addMovie, onFocus }) => {
  const addKinopoisk = useCallback((event) => {
    setKinopoisk(event.target.value)
  }, [])
  const [kinoId, setKinoId] = useState(null)
  const [kinopoisk, setKinopoisk] = useState("")
  const { filmData, resetFilmData } = useFilmData(kinoId)

  const AddFilmClick = useCallback(() => {
    if (kinopoisk) {
      const KINOPOISK_id = kinopoisk.split("/").splice(4, 1)[0]
      if (KINOPOISK_id) {
        setKinoId(KINOPOISK_id)
        setKinopoisk("")
      }
    }
  }, [kinopoisk])

  useEffect(() => {
    if (filmData && kinoId) {
      addMovie(
        filmData.name,
        filmData.posterUrl,
        filmData.shortDescription,
        filmData.description,
        filmData.year,
        filmData.genres,
        filmData.rating,
        filmData.movieLength
      )
      setKinoId(null)
      resetFilmData()
    }
  }, [filmData, kinoId, addMovie, resetFilmData])

  return (
    <div className={styles.addFilm}>
      <div className={styles.kinopoiskSection}>
        <div className={styles.inputKinopoisk}>
          <Input
            type="text"
            id="text3"
            placeholder="Введите ссылку на Кинопоиск"
            value={kinopoisk}
            onChange={addKinopoisk}
            onFocus={onFocus}
          />
          <Button
            className={styles.barsBtn}
            onclick={() => setOptionsShow((prev) => !prev)}
          >
            <span className="fa-solid fa-bars fa-3x bars-icon"></span>
          </Button>
        </div>
        <Button className={styles.addKinopoiskButton} onclick={AddFilmClick}>
          Добавить фильм
        </Button>
      </div>
    </div>
  )
}

export default AddKinopoisk
