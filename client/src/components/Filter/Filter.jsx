import React, { useContext, useMemo } from "react"
import Card, { StyledButton } from "../Card/Card"
import styles from "./Filter.module.css"
import { ModalContext } from "../Modal/ModalContext"
import { MoviesFilterContext } from "./MoviesFilterContext"
import { WatchedFilterContext } from "./WatchedFilterContext"
import { useLocation } from "react-router-dom"

const Filter = ({ movies, watchedMovies }) => {
  const { showDetails, showViewedConfirmation } = useContext(ModalContext)
  const { searchTerm: moviesSearchTerm } = useContext(MoviesFilterContext)
  const { searchTerm: watchedSearchTerm } = useContext(WatchedFilterContext)
  const location = useLocation()
  const searchTerm =
    location.pathname === "/" ? moviesSearchTerm : watchedSearchTerm

  function filter(val, filmList) {
    const trimmedVal = val.trim().toLowerCase()
    if (!filmList || !trimmedVal) return []
    return filmList.filter(
      (el) => {
        return el.title.toLowerCase().substring(0, val.length).includes(trimmedVal)
      }
    )
  }

  const filterContent = (movie) => (
    <>
      <StyledButton onClick={() => showDetails(movie)}>Описание</StyledButton>
      <StyledButton onClick={() => showViewedConfirmation(movie)}>
        <span className="fa-regular fa-eye view-icon"></span>
      </StyledButton>
    </>
  )

  const filteredMovies = useMemo(() => {
    if (location.pathname === "/") {
      return filter(searchTerm, movies)
    } else if (location.pathname === "/watched") {
      return filter(searchTerm, watchedMovies)
    }
    return []
  }, [searchTerm, movies, watchedMovies, location.pathname])

  return (
    <>
      <ul id={styles.filterResults}>
        {searchTerm.trim() && filteredMovies.length === 0 ? (
          <p>Фильмы не найдены</p>
        ) : (
          filteredMovies.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              styleType="filter"
              buttons={filterContent(movie)}
            />
          ))
        )}
      </ul>
    </>
  )
}

export default Filter
