import { useCallback } from "react"
import { useState, useRef, useEffect } from "react"
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
import { useDispatch, useSelector } from "react-redux"
import { remind } from "./store/reducers/auth/authSlice"
import useRoutes from "../hooks/useRoutes"

function App() {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user?._id);

  const [movies, setMovies] = useState([])
  const [watchedMovies, setWatchedMovies] = useState([])
  const [series, setSeries] = useState([])
  const [watchedSeries, setWatchedSeries] = useState([])
  const allMoviesAndSeries = [...movies, ...series]
  const allWatchedMoviesAndSeries = [...watchedMovies, ...watchedSeries]
  // console.log(userId);
  // const userfilms = useSelector((state) => state.auth.user.films);
  // console.log(userfilms);
  
  function getNextId(movies) {
    const maxId = movies.reduce((max, movie) => Math.max(max, movie.id), 0)
    return maxId + 1
  }

  async function fetchMovies() {
    if (!userId) return; 
    try {
      const fetchedMovies = await getMoviesFromApi(userId)
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
    if (!userId) return; 
    try {
      const fetchedSeries = await getSeriesFromApi(userId)
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
  }, [userId])

  useEffect(() => {
		dispatch(remind());
	}, [dispatch]);

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
        // id: getNextId(allMoviesAndSeries),
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
          await addSeriesToApi(newItem, userId)
          const updatedSeries = [newItem, ...series]
          setSeries(updatedSeries)
        } else {
          await addMovieToApi(newItem, userId)
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
      // id: getNextId(allWatchedMoviesAndSeries),
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
      await deleteMoviesFromApi(movie._id, userId)
      console.log(movie);
      console.log(movie._id);
      
      
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
 
  const props = {
    movies,
    setMovies,
    watchedMovies,
    setWatchedMovies,
    series,
    setSeries,
    watchedSeries,
    setWatchedSeries,
    deleteMovie,
    deleteWatchedMovie,
    addMovieOrSeries,
    addToWatchedMovies,
    removeMovieFromList
  };

  return(
    <Router>
       {useRoutes(props)}
    </Router>
  ) 
}

export default App