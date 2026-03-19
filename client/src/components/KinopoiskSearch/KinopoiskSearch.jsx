import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"

import Input from "../Input"
import Card, { StyledButton } from "../Card/Card"
import { ModalContext } from "../Modal/ModalContext"
import { addMovie as addMovieToApi } from "../../api"
import { addSeries as addSeriesToApi } from "../../api"
import { searchKinopoisk } from "../../api"
import { addMovieOrSeries } from "../../utils/utils"
import useDebounce from "../../../hooks/useDebounce"

import { PLACEHOLDER_POSTER_URL } from "../../constants"
import styles from "./KinopoiskSearch.module.css"

function mapKinopoiskToCard(doc) {
  return {
    title: doc.name || "",
    img: doc.poster?.previewUrl || doc.poster?.url || PLACEHOLDER_POSTER_URL,
    shortDescription: doc.shortDescription || "",
    description: doc.description || "",
    year: doc.year || "",
    genres: Array.isArray(doc.genres)
      ? doc.genres.map((g) => g.name).join(", ")
      : "",
    rating:
      doc.rating && typeof doc.rating.kp === "number"
        ? doc.rating.kp.toFixed(2)
        : "",
    movieLength:
      doc.movieLength != null
        ? `${Math.trunc(doc.movieLength / 60)}ч.${doc.movieLength % 60}м.`
        : "",
    kinopoiskId: doc.id,
    isSeries: doc.isSeries ?? false,
  }
}

export default function KinopoiskSearch({
  setMovies,
  setSeries,
  onFocus,
  onMovieAdded,
}) {
  const { showDetails } = useContext(ModalContext)
  const userId = useSelector((state) => state.auth.user?._id)

  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const debouncedQuery = useDebounce(searchQuery, 400)

  useEffect(() => {
    const q = debouncedQuery.trim()
    if (!q) {
      setResults([])
      setError(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    searchKinopoisk(q)
      .then((data) => {
        if (cancelled) return
        const items = Array.isArray(data) ? data : []
        setResults(items.map(mapKinopoiskToCard))
      })
      .catch((err) => {
        if (cancelled) return
        setError(err?.message || "Ошибка поиска")
        setResults([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [debouncedQuery])

  const handleAdd = async (movie) => {
    const success = await addMovieOrSeries(
      movie.title,
      movie.img,
      movie.shortDescription,
      movie.description,
      movie.year,
      movie.genres,
      movie.rating,
      movie.movieLength,
      movie.kinopoiskId,
      movie.isSeries,
      addSeriesToApi,
      addMovieToApi,
      setSeries,
      setMovies,
      userId
    )
    if (success) onMovieAdded?.()
  }

  const filterContent = (movie) => (
    <>
      <StyledButton onClick={() => showDetails(movie)}>Описание</StyledButton>
      <StyledButton onClick={() => handleAdd(movie)}>Добавить</StyledButton>
    </>
  )

  return (
    <div className={styles.container}>
      <div className={styles.searchArea}>
        <Input
          type="text"
          placeholder="Поиск в Кинопоиске"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={onFocus}
        />
      </div>
      {loading && <p className={styles.status}>Поиск...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {debouncedQuery.trim() && !loading && !error && (
        <ul className={styles.results}>
          {results.length === 0 ? (
            <p>Фильмы не найдены</p>
          ) : (
            results.map((movie) => (
              <Card
                key={movie.kinopoiskId}
                movie={movie}
                styleType="filter"
                buttons={filterContent(movie)}
              />
            ))
          )}
        </ul>
      )}
    </div>
  )
}
