import React, { useContext, useEffect } from "react"
import Card, { StyledButton } from "../Card/Card"
import { ModalContext } from "../Modal/ModalContext"
import styles from "./WatchedSection.module.css"
import { useLocation } from "react-router-dom"

const WathcedSection = ({ movies, movieRefs, arrangeCards }) => {
  const {
    showDetails,
    showWatchedDeleteConfirmation,
    watchedMovies,
    setWatchedMovies,
  } = useContext(ModalContext)
  const location = useLocation()

  useEffect(() => {
    const y = location.pathname === "/" ? 100 : 200
    arrangeCards(y)
  }, [watchedMovies, location.pathname])

  const watchedSectionContent = (movie) => (
    <>
      <StyledButton onClick={() => showDetails(movie)}>Подробнее</StyledButton>
      <StyledButton
        onClick={() =>
          showWatchedDeleteConfirmation(movie, watchedMovies, setWatchedMovies)
        }
      >
        <span className="fa-regular fa-trash-can trash-icon"></span>
      </StyledButton>
    </>
  )

  return (
    <div className={styles.filmContainer} id="watched-films">
      {movies.map((movie, index) => (
        <Card
          key={movie.id}
          movie={movie}
          cardRef={(el) => (movieRefs.current[index] = el)}
          styleType="watchedSection"
          buttons={watchedSectionContent(movie)}
        />
      ))}
    </div>
  )
}

export default WathcedSection