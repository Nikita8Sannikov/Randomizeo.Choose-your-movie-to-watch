import React, { useContext, useEffect } from "react"
import Card, { StyledButton } from "../Card/Card"
import styles from "./MovieSection.module.css"
import { ModalContext } from "../Modal/ModalContext"
import { useLocation } from "react-router-dom"
import AddKinopoisk from "../AddFilm/AddKinopoisk"
import Filter from "../Filter/Filter"
import ResultSection from "../ResultSection/ResultSection"
import AddFilmOption from "../AddFilm/AddFilmOption"
import { MoviesFilterContext } from "../Filter/MoviesFilterContext"

export default function MoviesSection({
  movies,
  movieRefs,
  optionsShow,
  setOptionsShow,
  kinopoisk,
  setKinopoisk,
  handleAddFilm,
  searchFilm,
  addMovie,
  arrangeCards,
  onFocus,
  randomMovie,
  setRandomMovie,
  outputText,
  setOutputText,
  setSearchFilm
}) {
  const { searchTerm, setSearchTerm } = useContext(MoviesFilterContext);
  const location = useLocation()

  const handleFocus = () => {
    if (searchTerm) {
      setSearchTerm("");
    }
    if (randomMovie && outputText) {
      setRandomMovie(null);
      setOutputText("");
    }
   }

  // useEffect(() => {
  //   setContext('movies')
  // }, [setContext])
  
  useEffect(() => {
    const y = location.pathname === "/" ? 100 : 200
    arrangeCards(y)
  }, [
    movies,
    location.pathname,
  ])

  const { showDetails, showViewedConfirmation, setMovies } =
    useContext(ModalContext)

  const movieSectionContent = (movie) => (
    <>
      <StyledButton onClick={() => showDetails(movie)} e>
        Подробнее
      </StyledButton>
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
            optionsShow={optionsShow}
            setOptionsShow={setOptionsShow}
            kinopoisk={kinopoisk}
            setKinopoisk={setKinopoisk}
            handleAddFilm={handleAddFilm}
            onFocus={handleFocus}
          />
          <Filter movies={movies} searchFilm={searchTerm} setSearchFilm={setSearchTerm} />
          {optionsShow && (
            <AddFilmOption addMovie={addMovie} optionsShow={optionsShow} />
          )}
          <ResultSection
           movies={movies}
           randomMovie={randomMovie}
           setRandomMovie={setRandomMovie}
           outputText={outputText}
           setOutputText={setOutputText}
          />
        </>
      )}
      <div className={styles.filmContainer} id="films">
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
