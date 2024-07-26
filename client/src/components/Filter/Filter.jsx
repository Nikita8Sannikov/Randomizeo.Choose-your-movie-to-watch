import React, { useContext, useMemo } from "react"
import Card, { StyledButton } from "../Card/Card"
import styles from "./Filter.module.css"
import { ModalContext } from "../Modal/ModalContext"

const Filter = ({ movies, searchFilm }) => {
  const { showDetails, showViewedConfirmation } = useContext(ModalContext)

  function filter(val, filmList) {
    if (!val) return []
    return filmList.filter(
      (el) =>
        el.title.toLowerCase().substring(0, val.length) === val.toLowerCase()
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
  const filteredMovies = useMemo(() => filter(searchFilm, movies), [searchFilm, movies]);
  // console.log(filteredMovies)
  // console.log(searchFilm)
  return (
    <>
      <ul id={styles.filterResults}>
        {
        searchFilm && filteredMovies.length === 0 ? (
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
        )
        }
      </ul>
    </>
  )
}

export default Filter