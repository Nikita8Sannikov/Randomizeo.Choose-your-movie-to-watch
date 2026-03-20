import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { addMovie as addMovieToApi } from "../../api"
import { addSeries as addSeriesToApi } from "../../api"

import Input from "../Input"
import Button from "../Button"
import useFilmData from "../../../hooks/useFilmData"
import { addMovieOrSeries } from "../../utils/utils"

import styles from "./AddFilmSection.module.css"

const AddKinopoisk = ({ setOptionsShow, onFocus, setMovies, setSeries, onMovieAdded }) => {
  const addKinopoisk = useCallback((event) => {
    setKinopoisk(event.target.value)
  }, [])
  const [kinoId, setKinoId] = useState(null)
  const [kinopoisk, setKinopoisk] = useState("")
  const { filmData, resetFilmData } = useFilmData(kinoId)
  const userId = useSelector((state) => state.auth.user?._id);

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
      addMovieOrSeries(
        filmData.name,
        filmData.posterUrl,
        filmData.shortDescription,
        filmData.description,
        filmData.year,
        filmData.genres,
        filmData.rating,
        filmData.movieLength,
        filmData.kinopoiskId,
        filmData.isSeries,
        addSeriesToApi,
        addMovieToApi,
        setSeries,
        setMovies,
        userId
      ).then((success) => {
        if (success) onMovieAdded?.(filmData.isSeries)
      })
      setKinoId(null)
      resetFilmData()
    }
  }, [filmData, kinoId, onMovieAdded, resetFilmData, setSeries, setMovies, userId])

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
          {/* <Button
            className={styles.barsBtn}
            onclick={() => setOptionsShow((prev) => !prev)}
          >
            <span className="fa-solid fa-bars fa-3x bars-icon"></span>
          </Button> */}
        </div>
        <Button className={styles.addKinopoiskButton} onclick={AddFilmClick}>
          Добавить фильм
        </Button>
      </div>
    </div>
  )
}

export default AddKinopoisk
