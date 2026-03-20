import { useContext, useEffect, useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import useResizeObserver from "../../../hooks/useResizeObserver"
import { useArrangeCards } from "../../../hooks/useArrangeCards"
import { MoviesFilterContext } from "../Filter/MoviesFilterContext"
import { ModalContext } from "../Modal/ModalContext"

import { getMovies as getMoviesFromApi } from "../../api"
import { getSeries as getSeriesFromApi } from "../../api"

import Card, { StyledButton } from "../Card/Card"
import AddKinopoisk from "../AddFilm/AddKinopoisk"
import KinopoiskSearch from "../KinopoiskSearch/KinopoiskSearch"
import Filter from "../Filter/Filter"
import ResultSection from "../ResultSection/ResultSection"
import AddFilmOption from "../AddFilm/AddFilmOption"
import { fetchFilms } from "../../utils/utils"

import styles from "./MovieSection.module.css"

export default function MoviesSection({
  movies,
  kinopoisk,
  setKinopoisk,
  addMovie,
  setMoviesForAdd,
  setSeriesForAdd
}) {
  const userId = useSelector((state) => state.auth.user?._id);
  const [optionsShow, setOptionsShow] = useState(false)
  const [randomMovie, setRandomMovie] = useState(null)
  const [outputText, setOutputText] = useState("")
  const { showDetails, showViewedConfirmation, showSeriesViewedConfirmation, setMovies, setSeries } = useContext(ModalContext)
  const { searchTerm, setSearchTerm } = useContext(MoviesFilterContext)
  const location = useLocation()
  const navigate = useNavigate()
  const containerRef = useResizeObserver((el) => {
    const y = location.pathname === "/" || location.pathname === "/series" ? 100 : 200
    arrangeCards(y, el)
  })
  const {arrangeCards, movieRefs} = useArrangeCards(containerRef)

  const handleFocus = () => {
    if (searchTerm) {
      setSearchTerm("")
    }
    if (randomMovie && outputText) {
      setRandomMovie(null)
      setOutputText("")
    }
  }

  const scrollToAddedFilm = useCallback((isSeries = false) => {
    let needNavigate = false
    if (isSeries && location.pathname === "/") {
      navigate("/series")
      needNavigate = true
    } else if (!isSeries && location.pathname === "/series") {
      navigate("/")
      needNavigate = true
    }
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, needNavigate ? 150 : 100)
  }, [containerRef, location.pathname, navigate])

  useEffect(() => {
    const y = location.pathname === "/" || location.pathname === "/series" ? 100 : 200
    arrangeCards(y)
  }, [movies, location.pathname])

    useEffect(() => {
      if (!userId) return; 
      if (location.pathname === "/") {
        fetchFilms(userId, getMoviesFromApi, setMoviesForAdd);
      } 
      if (location.pathname === "/series") {
        fetchFilms(userId, getSeriesFromApi, setSeriesForAdd);
      }
    }, [userId, location.pathname])

  const movieSectionContent = (movie) => (
    <>
      <StyledButton onClick={() => showDetails(movie)}>Подробнее</StyledButton>
      <StyledButton
        onClick={() =>
          location.pathname === "/series"
           ? showSeriesViewedConfirmation(movie, movies, setSeries)
           :  showViewedConfirmation(movie, movies, setMovies)}
      >
        <span className="fa-regular fa-eye view-icon"></span>
      </StyledButton>
    </>
  )

  return (
    <>
      {(location.pathname === "/" || location.pathname === "/series") && (
        <>
          {/* <AddKinopoisk
            setOptionsShow={setOptionsShow}
            kinopoisk={kinopoisk}
            setKinopoisk={setKinopoisk}
            onFocus={handleFocus}
            addMovie={addMovie}
            setMovies={setMoviesForAdd}
            setSeries={setSeriesForAdd}
            onMovieAdded={scrollToAddedFilm}
          /> */}
          <KinopoiskSearch
            setMovies={setMoviesForAdd}
            setSeries={setSeriesForAdd}
            onFocus={handleFocus}
            onMovieAdded={scrollToAddedFilm}
          />
          <Filter
            movies={movies}
            searchFilm={searchTerm}
            setSearchFilm={setSearchTerm}
          />
          {/* {optionsShow && <AddFilmOption addMovie={addMovie} />} */}
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
            key={movie._id ? movie._id.toString() : index}
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
