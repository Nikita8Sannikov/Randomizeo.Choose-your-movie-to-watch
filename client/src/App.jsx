import React from "react"
import { useState, useRef, useEffect } from "react"
import MoviesSection from "./components/MovieSection/MoviesSection"
import WatchedSection from "./components/WatchedSection/WathcedSection"
import Header from "./components/Header/Header"
import Modal from "./components/Modal/Modal"
import { ModalProvider } from "./components/Modal/ModalContext"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { addMovie as addMovieToApi } from "./api"
import { getMovies as getMoviesFromApi } from "./api"
import { deleteMovie as deleteMoviesFromApi } from "./api"

function App() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Дракула Брэма Стокера",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-6QE9dBnvT2N9CjHp2DZOAWKOLWCZMlppgexdIBbvWQ&s",
    },
    {
      id: 2,
      title: "Город Грехов",
      img: "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/6025abef-078b-4385-9cec-8237194ed38e/600x900",
    },
    {
      id: 3,
      title: "Автостопом по галактике",
      img: "https://thumbs.dfs.ivi.ru/storage4/contents/3/a/7da3eac3e71e63c85b578305a86143.jpg",
    },
    {
      id: 4,
      title: "Завтрак у Тиффани",
      img: "https://thumbs.dfs.ivi.ru/storage8/contents/9/1/e225fa76749bff29a36d96e3401296.jpg",
    },
  ])
  const [watchedMovies, setWatchedMovies] = useState([])
  const [searchFilm, setSearchFilm] = useState("")
  const [optionsShow, setOptionsShow] = useState(false)
  const [kinopoisk, setKinopoisk] = useState("")
  const [kinoId, setKinoId] = useState(null)

  function getNextId(movies) {
    const maxId = movies.reduce((max, movie) => Math.max(max, movie.id), 0)
    return maxId + 1
  }

  useEffect(() => {
    async function fetchMovies(){
      try{
        const fetchedMovies = await getMoviesFromApi()
        setMovies(fetchedMovies)
      }catch(error) {
        console.error("Error loading movies:", error)
      }
    }
    fetchMovies()
  
  }, [])
  
  async function addMovie(
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

    try{
      await addMovieToApi(newMovie)
      const updatedMovies = [newMovie, ...movies]
      console.log("Updated Movies:", updatedMovies)
      setMovies(updatedMovies)
    }catch(error) {
      console.error("Error adding movie to the API:", error)
    }
  }

  function addToWatchedMovies(movie) {
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
    const updatedWatchedMovies = [...watchedMovies, newWatchedMovie]
    console.log("Updated Watched Movies:", updatedWatchedMovies)
    setWatchedMovies(updatedWatchedMovies)
  }

  async function deleteMovie(movie, list, setList){
      try{
        await deleteMoviesFromApi(movie.id)
        removeMovieFromList (movie, list, setList) 
      }catch(error) {
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
    const cardsPerRow = 5
    const cardWidth = 350 // ширина карточки + расстояние между карточками
    const cardHeight = 600 // высота карточки

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

  //Блок добавления фильма по ссылке с кинопоиска

  // URL API для поиска фильма
  const apiUrl = "https://api.kinopoisk.dev/v1.4/movie"

  // API ключ
  const apiKey = "1QSQYSZ-PNCMBA2-JX6Q2NJ-24SE8J7"

  const options = {
    method: "GET",
    headers: {
      "X-API-KEY": apiKey,
    },
  }

  const handleAddFilm = (id) => {
    setKinoId(id)
  }

  useEffect(() => {
    if (kinoId) {
      const urlWithParams = `${apiUrl}/${kinoId}`
      // console.log('newUrl',urlWithParams)

      fetch(urlWithParams, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          console.log(data)
          console.log(data.name)
          console.log(data.shortDescription)
          console.log(data.description)
          console.log(data.year)
          console.log(data.poster.previewUrl)
          console.log(data.genres.map((genre) => genre.name).join(", "))
          console.log(data.rating.kp)

          addMovie(
            data.name,
            data.poster.previewUrl,
            data.shortDescription,
            data.description,
            data.year,
            data.genres.map((genre) => genre.name).join(", "),
            data.rating.kp.toFixed(2)
          )
          // allMovies.push( {id:getNextId(allMovies), title: data.name, img: data.poster.previewUrl, shortDescription: data.shortDescription, description: data.description, year: data.year, genres: data.genres.map(genre => genre.name).join(', '), rating: data.rating.kp.toFixed(2)})
        })
        .catch((error) => {
          console.error("Ошибка запроса:", error)
        })
      setKinoId(null)
    }
  }, [kinoId])

  return (
    <Router>
      <ModalProvider
        addToWatchedMovies={addToWatchedMovies}
        removeMovieFromList={removeMovieFromList}
        movies={movies}
        setMovies={setMovies}
        watchedMovies={watchedMovies}
        setWatchedMovies={setWatchedMovies}
        deleteMovie={deleteMovie}
      >
        <main>
          <Header searchFilm={searchFilm} setSearchFilm={setSearchFilm} />
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
                    kinopoisk={kinopoisk}
                    setKinopoisk={setKinopoisk}
                    handleAddFilm={handleAddFilm}
                    searchFilm={searchFilm}
                    addMovie={addMovie}
                    arrangeCards={arrangeCards}
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
    </Router>
  )
}

export default App
