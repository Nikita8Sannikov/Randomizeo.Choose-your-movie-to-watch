import React, { useContext, useEffect } from "react"
import Card, { StyledButton } from "../Card/Card"
import { ModalContext } from "../Modal/ModalContext"
import styles from "./WatchedSection.module.css"
import { useLocation } from "react-router-dom"
import Filter from "../Filter/Filter"
import { WatchedFilterContext  } from "../Filter/WatchedFilterContext"
import useResizeObserver from "../../../hooks/useResizeObserver"

const WathcedSection = ({ movies, movieRefs, arrangeCards, searchFilm, setSearchFilm  }) => {
  const {
    showDetails,
    showWatchedDeleteConfirmation,
    watchedMovies,
    setWatchedMovies,
  } = useContext(ModalContext)
const { searchTerm, setSearchTerm } = useContext(WatchedFilterContext);

// useEffect(() => {
//   setContext('watched')
// }, [setContext])

  const location = useLocation()

  const containerRef = useResizeObserver(()=> {
    const y = location.pathname === "/" ? 100 : 200
    arrangeCards(y)
  })

  useEffect(() => {
    const y = location.pathname === "/" ? 100 : 200
    arrangeCards(y)
  }, [movies, location.pathname])

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
    <>
    <Filter watchedMovies={movies} searchFilm={searchTerm} setSearchFilm={setSearchTerm} />
    <div className={styles.filmContainer} ref={containerRef} id="watched-films">
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
    </>
  )
}

export default WathcedSection