import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import useResizeObserver from "../../../hooks/useResizeObserver"
import { useArrangeCards } from "../../../hooks/useArrangeCards"
import { WatchedFilterContext  } from "../Filter/WatchedFilterContext"
import { ModalContext } from "../Modal/ModalContext"

import Card, { StyledButton } from "../Card/Card"
import Filter from "../Filter/Filter"
import { fetchFilms } from "../../utils/utils"

import { getWatchedMovies as getWatchedMoviesFromApi } from "../../api"
import { getWatchedSeries as getWatchedSeriesFromApi } from "../../api"

import styles from "./WatchedSection.module.css"

const WathcedSection = ({ movies, setMovies, setSeries }) => {
  const { t } = useTranslation()
  const {
    showDetails,
    showWatchedDeleteConfirmation,
    setWatchedMovies,
    showWatchedSeriesDeleteConfirmation,
    setWatchedSeries,
  } = useContext(ModalContext)
  const { searchTerm, setSearchTerm } = useContext(WatchedFilterContext);
  const location = useLocation()
  const userId = useSelector((state) => state.auth.user?._id);
  
  const containerRef = useResizeObserver((el) => {
    const y = location.pathname === "/watched" || location.pathname === "/watched/series" ? 300 : 200
    arrangeCards(y, el)
  })
  const {arrangeCards, movieRefs} = useArrangeCards(containerRef)

  useEffect(() => {
    const y = location.pathname === "/watched" || location.pathname === "/watched/series" ? 300 : 200
    arrangeCards(y)
  }, [movies, location.pathname])

  useEffect(() => {
    if (!userId) return; 
    if (location.pathname === "/watched") {
      fetchFilms(userId, getWatchedMoviesFromApi, setMovies);
    } 
    if (location.pathname === "/watched/series") {
      fetchFilms(userId, getWatchedSeriesFromApi, setSeries);
    }
  }, [userId, location.pathname])

  const watchedSectionContent = (movie) => (
    <>
      <StyledButton onClick={() => showDetails(movie)}>{t("common.details")}</StyledButton>
      <StyledButton
        onClick={() =>
           location.pathname === "/watched/series"
           ? showWatchedSeriesDeleteConfirmation(movie, movies, setWatchedSeries)
           : showWatchedDeleteConfirmation(movie, movies, setWatchedMovies)
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
          key={movie._id ? movie._id.toString() : index}
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