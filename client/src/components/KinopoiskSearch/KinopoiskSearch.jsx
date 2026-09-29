import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

import Input from "../Input"
import Card, { StyledButton } from "../Card/Card"
import { ModalContext } from "../Modal/ModalContext"
import { addMovie as addMovieToApi } from "../../api"
import { addSeries as addSeriesToApi } from "../../api"
import { getTmdbDetails, searchTmdb } from "../../api"
import { addMovieOrSeries } from "../../utils/utils"
import { movieTitle } from "../../utils/localizedMovie"
import useDebounce from "../../../hooks/useDebounce"

import { getPlaceholderPosterUrl } from "../../constants"
import styles from "./KinopoiskSearch.module.css"

export default function KinopoiskSearch({
  setMovies,
  setSeries,
  onFocus,
  onMovieAdded,
}) {
  const { t, i18n } = useTranslation()
  const { showDetails } = useContext(ModalContext)
  const userId = useSelector((state) => state.auth.user?._id)
  const language = (i18n.resolvedLanguage || i18n.language || "ru").startsWith("en")
    ? "en-US"
    : "ru-RU"

  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const debouncedQuery = useDebounce(searchQuery, 400)

  useEffect(() => {
    const q = debouncedQuery.trim()
    if (!q) {
      setResults([])
      setError(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(false)

    searchTmdb(q, language)
      .then((data) => {
        if (cancelled) return
        const items = Array.isArray(data) ? data : []
        setResults(
          language === "en-US"
            ? items.map((item) => ({
                ...item,
                titleEn: item.titleEn || item.title,
                shortDescriptionEn: item.shortDescriptionEn || item.shortDescription,
                descriptionEn: item.descriptionEn || item.description,
              }))
            : items
        )
      })
      .catch(() => {
        if (cancelled) return
        setError(true)
        setResults([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [debouncedQuery, language])

  const handleAdd = async (movie) => {
    try {
      const details = await getTmdbDetails(movie.tmdbMediaType, movie.tmdbId)
      const success = await addMovieOrSeries(
        details,
        addSeriesToApi,
        addMovieToApi,
        setSeries,
        setMovies,
        userId
      )
      if (success) onMovieAdded?.(details.isSeries)
    } catch (err) {
      console.error("Failed to add movie from TMDB:", err)
    }
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
                key={`${movie.tmdbMediaType}-${movie.tmdbId}`}
                movie={{
                  ...movie,
                  img: movie.img || getPlaceholderPosterUrl(t("card.noPoster")),
                  title: movieTitle(movie, i18n.resolvedLanguage || i18n.language),
                }}
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
