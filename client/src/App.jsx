import { useState, useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { getMovies as getMoviesFromApi } from "./api"
import { getSeries as getSeriesFromApi } from "./api"
import { getWatchedMovies as getWatchedMoviesFromApi } from "./api"
import { getWatchedSeries as getWatchedSeriesFromApi } from "./api"

import CookiesWarning from "./components/CookieWarning/CookiesWarning"
import AppRoutes from "./components/AppRoutes/AppRoutes"
import { remind } from "./store/reducers/auth/authSlice"
import {fetchFilms} from "./utils/utils"


function App() {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.auth.user?._id);

  const [movies, setMovies] = useState([])
  const [watchedMovies, setWatchedMovies] = useState([])
  const [series, setSeries] = useState([])
  const [watchedSeries, setWatchedSeries] = useState([])

  const props = {
    movies,
    setMovies,
    watchedMovies,
    setWatchedMovies,
    series,
    setSeries,
    watchedSeries,
    setWatchedSeries,
  };

  useEffect(() => {
    if (!userId) return; 
    Promise.all([
      fetchFilms(userId, getMoviesFromApi, setMovies),
      fetchFilms(userId, getWatchedMoviesFromApi, setWatchedMovies),
      fetchFilms(userId, getSeriesFromApi, setSeries),
      fetchFilms(userId, getWatchedSeriesFromApi, setWatchedSeries)
    ]).catch((error) => console.log('Error loading data', error))
  }, [userId])

  useEffect(() => {
		dispatch(remind());
	}, [dispatch]);
 
  return(
    <div>
    <CookiesWarning /> 
    <Router>
       <AppRoutes {...props} />
    </Router>
    </div>
  ) 
}

export default App