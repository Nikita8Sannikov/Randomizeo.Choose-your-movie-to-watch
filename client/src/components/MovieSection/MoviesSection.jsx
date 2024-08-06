import React, { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import styles from "./MovieSection.module.css"
import Card, { StyledButton } from "../Card/Card"
import AddKinopoisk from "../AddFilm/AddKinopoisk"
import Filter from "../Filter/Filter"
import ResultSection from "../ResultSection/ResultSection"
import AddFilmOption from "../AddFilm/AddFilmOption"
import { ModalContext } from "../Modal/ModalContext"
import { MoviesFilterContext } from "../Filter/MoviesFilterContext"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { useArrangeCards } from "../../../hooks/useArrangeCards"

export default function MoviesSection({
  movies,
  kinopoisk,
  setKinopoisk,
  addMovie,
}) {
  const [optionsShow, setOptionsShow] = useState(false)
  const [randomMovie, setRandomMovie] = useState(null)
  const [outputText, setOutputText] = useState("")
  const { showDetails, showViewedConfirmation, setMovies } = useContext(ModalContext)
  const { searchTerm, setSearchTerm } = useContext(MoviesFilterContext)
  const location = useLocation()
  const {arrangeCards, movieRefs} = useArrangeCards()
  const containerRef = useResizeObserver(() => {
    const y = location.pathname === "/" ? 100 : 200
    arrangeCards(y)
  })

  const handleFocus = () => {
    if (searchTerm) {
      setSearchTerm("")
    }
    if (randomMovie && outputText) {
      setRandomMovie(null)
      setOutputText("")
    }
  }

  useEffect(() => {
    const y = location.pathname === "/" ? 100 : 200
    arrangeCards(y)
  }, [movies, location.pathname])

  const movieSectionContent = (movie) => (
    <>
      <StyledButton onClick={() => showDetails(movie)}>Подробнее</StyledButton>
      <StyledButton
        onClick={() => showViewedConfirmation(movie, movies, setMovies)}
      >
        <span className="fa-regular fa-eye view-icon"></span>
      </StyledButton>
    </>
  )

  return (
    <>
      {location.pathname === "/" && (
        <>
          <AddKinopoisk
            setOptionsShow={setOptionsShow}
            kinopoisk={kinopoisk}
            setKinopoisk={setKinopoisk}
            onFocus={handleFocus}
            addMovie={addMovie}
          />
          <Filter
            movies={movies}
            searchFilm={searchTerm}
            setSearchFilm={setSearchTerm}
          />
          {optionsShow && <AddFilmOption addMovie={addMovie} />}
          <ResultSection
            movies={movies}
            randomMovie={randomMovie}
            setRandomMovie={setRandomMovie}
            outputText={outputText}
            setOutputText={setOutputText}
          />
        </>
      )}
      <div className={styles.filmContainer} id="films" ref={containerRef}>
        {movies.map((movie, index) => (
          <Card
            key={movie.id}
            movie={movie}
            cardRef={(el) => (movieRefs.current[index] = el)}
            styleType="movieSection"
            buttons={movieSectionContent(movie)}
          />
        ))}
      </div>
    </>
  )
}
