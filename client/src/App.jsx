import { useState, useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { useDispatch } from "react-redux"

import CookiesWarning from "./components/CookieWarning/CookiesWarning"
import AppRoutes from "./components/AppRoutes/AppRoutes"
import { remind } from "./store/reducers/auth/authSlice"

function App() {
  const [movies, setMovies] = useState([])
  const [watchedMovies, setWatchedMovies] = useState([])
  const [series, setSeries] = useState([])
  const [watchedSeries, setWatchedSeries] = useState([])
  const dispatch = useDispatch()

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