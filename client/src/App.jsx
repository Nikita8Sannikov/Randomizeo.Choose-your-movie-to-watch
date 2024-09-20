import React, { useCallback } from "react"
import { useState, useRef, useEffect } from "react"
import MoviesSection from "./components/MovieSection/MoviesSection"
import WatchedSection from "./components/WatchedSection/WathcedSection"
import Header from "./components/Header/Header"
import Modal from "./components/Modal/Modal"
import { ModalProvider } from "./components/Modal/ModalContext"
import { MoviesFilterProvider } from "./components/Filter/MoviesFilterContext"
import { WatchedFilterProvider } from "./components/Filter/WatchedFilterContext"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { addMovie as addMovieToApi } from "./api"
import { addSeries as addSeriesToApi } from "./api"
import { addWatchedMovie as addWatchedMovieToApi } from "./api"
import { addWatchedSeries as addWatchedSeriesToApi } from "./api"
import { getMovies as getMoviesFromApi } from "./api"
import { getSeries as getSeriesFromApi } from "./api"
import { getWatchedMovies as getWatchedMoviesFromApi } from "./api"
import { getWatchedSeries as getWatchedSeriesFromApi } from "./api"
import { deleteMovie as deleteMoviesFromApi } from "./api"
import { deleteWatchedMovie as deleteWatchedMoviesFromApi } from "./api"
import LeftUpShadow from "./components/Gradients/LeftUpShadow"
import RightUpShadow from "./components/Gradients/RightUpShadow"
import DownShadow from "./components/Gradients/DownShadow"

function App() {
  const [movies, setMovies] = useState([])
  const [watchedMovies, setWatchedMovies] = useState([])
  const [series, setSeries] = useState([])
  const [watchedSeries, setWatchedSeries] = useState([])
  const allMoviesAndSeries = [...movies, ...series]
  const allWatchedMoviesAndSeries = [...watchedMovies, ...watchedSeries]

  function getNextId(movies) {
    const maxId = movies.reduce((max, movie) => Math.max(max, movie.id), 0)
    return maxId + 1
  }

  async function fetchMovies() {
    try {
      const fetchedMovies = await getMoviesFromApi()
      const reverseFetched = fetchedMovies.reverse()
      setMovies(reverseFetched)
    } catch (error) {
      console.error("Error loading movies:", error)
    }
  }
  async function fetchWatchedMovies() {
    try {
      const fetchedWatchedMovies = await getWatchedMoviesFromApi()
      const reverseWatchedFetched = fetchedWatchedMovies.reverse()
      setWatchedMovies(reverseWatchedFetched)
    } catch (error) {
      console.error("Error loading movies:", error)
    }
  }
  async function fetchSeries() {
    try {
      const fetchedSeries = await getSeriesFromApi()
      setSeries(fetchedSeries.reverse())
    } catch (error) {
      console.error("Error loading series:", error)
    }
  }
  async function fetchWatchedSeries() {
    try {
      const fetchedWatchedSeries = await getWatchedSeriesFromApi()
      setWatchedSeries(fetchedWatchedSeries.reverse())
    } catch (error) {
      console.error("Error loading watched series:", error)
    }
  }

  useEffect(() => {
    fetchMovies()
    fetchWatchedMovies()
    fetchSeries()
    fetchWatchedSeries()
  }, [])

  const addMovieOrSeries = useCallback(
    async function addMovie(
      title,
      img,
      shortDescription = "",
      description = "",
      year = "",
      genres = "",
      rating = "",
      movieLength = "",
      kinopoiskId = "",
      isSeries = false
    ) {
      const newItem = {
        id: getNextId(allMoviesAndSeries),
        title,
        img,
        shortDescription,
        description,
        year,
        genres,
        rating,
        movieLength,
        kinopoiskId,
        isSeries,
      }

      try {
        if (isSeries) {
          await addSeriesToApi(newItem)
          const updatedSeries = [newItem, ...series]
          setSeries(updatedSeries)
        } else {
          await addMovieToApi(newItem)
          const updatedMovies = [newItem, ...movies]
          setMovies(updatedMovies)
        }
      } catch (error) {
        console.error(
          `Error adding ${isSeries ? "series" : "movie"} to the API:`,
          error
        )
      }
    },
    [movies, series]
  )

  async function addToWatchedMovies(movie) {
    const newItem = {
      id: getNextId(allWatchedMoviesAndSeries),
      title: movie.title,
      img: movie.img,
      shortDescription: movie.shortDescription,
      description: movie.description,
      year: movie.year,
      genres: movie.genres,
      rating: movie.rating,
      movieLength: movie.movieLength,
      kinopoiskId: movie.kinopoiskId,
      isSeries: movie.isSeries,
    }
    try {
      if (movie.isSeries) {
        await addWatchedSeriesToApi(newItem)
        const updatedWatchedSeries = [newItem, ...watchedSeries]
        console.log("Updated Watched Series:", updatedWatchedSeries)
        setWatchedSeries(updatedWatchedSeries)
      } else {
        await addWatchedMovieToApi(newItem)
        const updatedWatchedMovies = [newItem, ...watchedMovies]
        console.log("Updated Watched Movies:", updatedWatchedMovies)
        setWatchedMovies(updatedWatchedMovies)
      }
    } catch (error) {
      console.error(
        `Error adding ${
          movie.isSeries ? "watched series" : "watched movie"
        }to the API:`,
        error
      )
    }
  }

  async function deleteMovie(movie, list, setList) {
    try {
      await deleteMoviesFromApi(movie.id)
      removeMovieFromList(movie, list, setList)
    } catch (error) {
      console.error("Error deleting movies:", error)
    }
  }

  async function deleteWatchedMovie(movie, list, setList) {
    try {
      await deleteWatchedMoviesFromApi(movie.id)
      removeMovieFromList(movie, list, setList)
    } catch (error) {
      console.error("Error deleting movies:", error)
    }
  }

  const removeMovieFromList = (movie, list, setList) => {
    setList(list.filter((m) => m.id !== movie.id))
  }

  return (
    <Router>
      <MoviesFilterProvider>
        <WatchedFilterProvider>
          <ModalProvider
            addToWatchedMovies={addToWatchedMovies}
            removeMovieFromList={removeMovieFromList}
            movies={movies}
            setMovies={setMovies}
            watchedMovies={watchedMovies}
            setWatchedMovies={setWatchedMovies}
            series={series}
            setSeries={setSeries}
            watchedSeries={watchedSeries}
            setWatchedSeries={setWatchedSeries}
            deleteMovie={deleteMovie}
            deleteWatchedMovie={deleteWatchedMovie}
          >
            <LeftUpShadow />
            <RightUpShadow />
            <DownShadow />
            <main>
              <Header />
              <Modal />
              <div className="content">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <MoviesSection
                        movies={movies}
                        addMovie={addMovieOrSeries}
                      />
                    }
                  />
                  <Route
                    path="/series"
                    element={
                      <MoviesSection
                        movies={series}
                        addMovie={addMovieOrSeries}
                      />
                    }
                  />
                  <Route
                    path="/watched"
                    element={<WatchedSection movies={watchedMovies} />}
                  />
                  <Route
                    path="/watched/series"
                    element={<WatchedSection movies={watchedSeries} />}
                  />
                </Routes>
              </div>
            </main>
          </ModalProvider>
        </WatchedFilterProvider>
      </MoviesFilterProvider>
    </Router>
  )
}

export default App
