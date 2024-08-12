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
import { addWatchedMovie as addWatchedMovieToApi } from "./api"
import { getMovies as getMoviesFromApi } from "./api"
import { getWatchedMovies as getWatchedMoviesFromApi } from "./api"
import { deleteMovie as deleteMoviesFromApi } from "./api"
import { deleteWatchedMovie as deleteWatchedMoviesFromApi } from "./api"

function App() {
  const [movies, setMovies] = useState([])
  const [watchedMovies, setWatchedMovies] = useState([])

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

  useEffect(() => {
    fetchMovies()
    fetchWatchedMovies()
  }, [])

  const addMovie = useCallback( async function addMovie(
    title,
    img,
    shortDescription = "",
    description = "",
    year = "",
    genres = "",
    rating = "",
    movieLength = "",
  ) {
    const newMovie = {
      id: getNextId(movies),
      title,
      img,
      shortDescription,
      description,
      year,
      genres,
      rating,
      movieLength,
    }

    try {
      await addMovieToApi(newMovie)
      const updatedMovies = [newMovie, ...movies]
      console.log("Updated Movies:", updatedMovies)
      setMovies(updatedMovies)
    } catch (error) {
      console.error("Error adding movie to the API:", error)
    }
  }, [movies])

  async function addToWatchedMovies(movie) {
    const newWatchedMovie = {
      id: getNextId(watchedMovies),
      title: movie.title,
      img: movie.img,
      shortDescription: movie.shortDescription,
      description: movie.description,
      year: movie.year,
      genres: movie.genres,
      rating: movie.rating,
      movieLength: movie.movieLength
    }
    try {
      await addWatchedMovieToApi(newWatchedMovie)
      const updatedWatchedMovies = [newWatchedMovie, ...watchedMovies]
      console.log("Updated Watched Movies:", updatedWatchedMovies)
      setWatchedMovies(updatedWatchedMovies)
    } catch (error) {
      console.error("Error adding watched movie to the API:", error)
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
            deleteMovie={deleteMovie}
            deleteWatchedMovie={deleteWatchedMovie}
          >
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
                        addMovie={addMovie}
                      />
                    }
                  />
                  <Route
                    path="/watched"
                    element={
                      <WatchedSection
                        movies={watchedMovies}
                      />
                    }
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
