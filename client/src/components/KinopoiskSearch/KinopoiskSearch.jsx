import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

import Input from "../Input"
import Card, { StyledButton } from "../Card/Card"
import { ModalContext } from "../Modal/ModalContext"
import { addMovie as addMovieToApi } from "../../api"
import { addSeries as addSeriesToApi } from "../../api"
import { searchKinopoisk } from "../../api"
import { addMovieOrSeries } from "../../utils/utils"
import useDebounce from "../../../hooks/useDebounce"

import { getPlaceholderPosterUrl } from "../../constants"
import styles from "./KinopoiskSearch.module.css"

function formatMovieLength(minutes, t) {
  if (minutes == null) return ""
  return t("duration.hoursMinutes", {
    hours: Math.trunc(minutes / 60),
    minutes: minutes % 60,
  })
}

function mapKinopoiskToCard(doc, t) {
  return {
    title: doc.name || "",
    img: doc.poster?.previewUrl || doc.poster?.url || getPlaceholderPosterUrl(t("card.noPoster")),
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
    movieLength: formatMovieLength(doc.movieLength, t),
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
  const { t, i18n } = useTranslation()
  const { showDetails } = useContext(ModalContext)
  const userId = useSelector((state) => state.auth.user?._id)

  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState([])
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const debouncedQuery = useDebounce(searchQuery, 400)

  useEffect(() => {
    const q = debouncedQuery.trim()
    if (!q) {
      setResults([])
      setDocs([])
      setError(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(false)

    searchKinopoisk(q)
      .then((data) => {
        if (cancelled) return
        const items = Array.isArray(data) ? data : []
        const qLower = q.toLowerCase()
        const filtered = items.filter((doc) =>
          (doc.name || "").toLowerCase().includes(qLower)
        )
        setDocs(filtered)
      })
      .catch(() => {
        if (cancelled) return
        setError(true)
        setResults([])
        setDocs([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [debouncedQuery])

  useEffect(() => {
    setResults(docs.map((doc) => mapKinopoiskToCard(doc, t)))
  }, [docs, t, i18n.language])

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
    if (success) onMovieAdded?.(movie.isSeries)
  }

  const filterContent = (movie) => (
    <>
      <StyledButton onClick={() => showDetails(movie)}>{t("common.description")}</StyledButton>
      <StyledButton onClick={() => handleAdd(movie)}>{t("common.add")}</StyledButton>
    </>
  )

  return (
    <div className={styles.container}>
      <div className={styles.searchArea}>
        <div className={styles.inputWrapper}>
          <Input
            type="text"
            placeholder={t("kinopoisk.placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={onFocus}
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.resetButton}
              onClick={() => setSearchQuery("")}
              aria-label={t("kinopoisk.resetSearch")}
            >
              ×
            </button>
          )}
        </div>
      </div>
      {loading && <p className={styles.status}>{t("kinopoisk.searching")}</p>}
      {error && <p className={styles.error}>{t("kinopoisk.searchError")}</p>}
      {debouncedQuery.trim() && !loading && !error && (
        <ul className={styles.results}>
          {results.length === 0 ? (
            <p>{t("common.notFound")}</p>
          ) : (
            results.map((movie) => (
              <Card
                key={movie.kinopoiskId}
                movie={movie}
                styleType="kinopoiskSearch"
                buttons={filterContent(movie)}
              />
            ))
          )}
        </ul>
      )}
    </div>
  )
}
