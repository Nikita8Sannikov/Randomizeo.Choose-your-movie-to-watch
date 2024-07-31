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
  const [movies, setMovies] = useState([
    // {
    //   id: 1,
    //   title: "Дракула Брэма Стокера",
    //   img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-6QE9dBnvT2N9CjHp2DZOAWKOLWCZMlppgexdIBbvWQ&s",
    // },
    // {
    //   id: 2,
    //   title: "Город Грехов",
    //   img: "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/6025abef-078b-4385-9cec-8237194ed38e/600x900",
    // },
    // {
    //   id: 3,
    //   title: "Автостопом по галактике",
    //   img: "https://thumbs.dfs.ivi.ru/storage4/contents/3/a/7da3eac3e71e63c85b578305a86143.jpg",
    // },
    // {
    //   id: 4,
    //   title: "Завтрак у Тиффани",
    //   img: "https://thumbs.dfs.ivi.ru/storage8/contents/9/1/e225fa76749bff29a36d96e3401296.jpg",
    // },
  ])
  const [watchedMovies, setWatchedMovies] = useState([])
  const [optionsShow, setOptionsShow] = useState(false)
  const [randomMovie, setRandomMovie] = useState(null)
  const [outputText, setOutputText] = useState("")

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
    rating = ""
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
    }
    try {
      await addWatchedMovieToApi(newWatchedMovie)
      const updatedWatchedMovies = [...watchedMovies, newWatchedMovie]
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

  //расположение карточек фильмов
  const movieRefs = useRef([])
  movieRefs.current = []

  function arrangeCards(y = 0) {
    const cardsPerRow = window.innerWidth < 1650 ? 3 : 5
    // console.log(window.innerWidth);
    const cardWidth = window.innerWidth < 900 ? 300 : 350 // ширина карточки + расстояние между карточками
    const cardHeight = 650 // высота карточки
    let maxOffsetY = 0

    // console.log('Total cards:', movieRefs.current);
    if (Array.isArray(movieRefs.current)) {
      movieRefs.current.forEach((card, index) => {
        const rowIndex = Math.floor(index / cardsPerRow)
        const positionInRow = index % cardsPerRow
        let offsetX, offsetY
        // console.log(movieRefs.current);
        // Расчет позиции X
        if (positionInRow === 0) {
          offsetX = 0
        } else if (positionInRow % 2 === 1) {
          offsetX = -Math.ceil(positionInRow / 2) * cardWidth
        } else {
          offsetX = Math.ceil(positionInRow / 2) * cardWidth
        }

        // Увеличим коэффициент для более глубокой дуги
        offsetY = rowIndex * (cardHeight + 20) - Math.abs(offsetX) * 0.3

        // console.log(`Card ${index}: rowIndex=${rowIndex}, positionInRow=${positionInRow}, offsetX=${offsetX}, offsetY=${offsetY}`);
        if (card) {
          card.style.transform = `translate(${offsetX}px, ${offsetY + y}px)`
        }
      })
    } else {
      console.error("movieRefs.current is not an array")
    }
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
                        movieRefs={movieRefs}
                        optionsShow={optionsShow}
                        setOptionsShow={setOptionsShow}
                        addMovie={addMovie}
                        arrangeCards={arrangeCards}
                        randomMovie={randomMovie}
                        setRandomMovie={setRandomMovie}
                        outputText={outputText}
                        setOutputText={setOutputText}
                      />
                    }
                  />
                  <Route
                    path="/watched"
                    element={
                      <WatchedSection
                        movies={watchedMovies}
                        movieRefs={movieRefs}
                        arrangeCards={arrangeCards}
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
