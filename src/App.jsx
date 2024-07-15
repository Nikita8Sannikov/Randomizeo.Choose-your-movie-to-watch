import React from "react"
import { useState } from "react"
import AddFilmOption from "./components/AddFilm/AddFilmOption"
import MoviesSection from "./components/MoviesSection"
import ResultSection from "./components/ResultSection"
import WatchedSection from "./components/WathcedSection"
import Header from "./components/Header/Header"
import AddKinopoisk from "./components/AddFilm/AddKinopoisk"
import Filter from "./components/Filter/Filter"
import Modal from "./components/Modal/Modal"
import { ModalProvider } from './components/Modal/ModalContext';

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

  function getNextId(movies) {
    const maxId = movies.reduce((max, movie) => Math.max(max, movie.id), 0)
    return maxId + 1
  }

  function addMovie(title, img) {
    const newMovie = {
      id: getNextId(movies),
      title,
      img,
    }
    const updatedMovies = [...movies, newMovie]
    console.log("Updated Movies:", updatedMovies)
    setMovies(updatedMovies)
  }

  function addToWatchedMovies(movie) {
    const newWatchedMovie = {
      id: getNextId(watchedMovies),
      title: movie.title,
      img: movie.img,
    }
    const updatedWatchedMovies = [...watchedMovies, newWatchedMovie]
    console.log("Updated Watched Movies:", updatedWatchedMovies)
    setWatchedMovies(updatedWatchedMovies)
  }

  const removeMovie = (movie) => {
    setMovies(movies.filter(m => m.id !== movie.id));
  };


  const [tab, setTab] = useState("main")
  const [searchFilm, setSearchFilm] = useState("")

  return (
    <>
    <ModalProvider>
      <main>
        <Header
          active={tab}
          onChange={(current) => setTab(current)}
          searchFilm={searchFilm}
          setSearchFilm={setSearchFilm}
        />
        <Modal/>
        <div className="content">
          {tab === "main" && (
            <>
              <AddKinopoisk />
              <Filter movies={movies} searchFilm={searchFilm} />
              <AddFilmOption addMovie={addMovie} />
              <ResultSection movies={movies} />
              <MoviesSection movies={movies} addToWatchedMovies={addToWatchedMovies} removeMovie={removeMovie}/>
            </>
          )}

          {tab === "watched" && <WatchedSection movies={watchedMovies}/>}
        </div>
      </main>
      </ModalProvider>
    </>
  )
}

export default App
