import React, { useEffect } from "react"
import { useState, useRef  } from "react"
import AddFilmOption from "./components/AddFilm/AddFilmOption"
import MoviesSection from "./components/MoviesSection"
import ResultSection from "./components/ResultSection/ResultSection"
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


  const movieRefs = useRef([]);
  movieRefs.current = [];

  useEffect(() => {
    arrangeCards(100)
  }, [movies])

  
  function arrangeCards(y=0) {
    const cardsPerRow = 5;
    const cardWidth = 350; // ширина карточки + расстояние между карточками
    const cardHeight = 600; // высота карточки
  
    // console.log('Total cards:', cards.length);
    if (Array.isArray(movieRefs.current)) {
      movieRefs.current.forEach((card, index) => {
      const rowIndex = Math.floor(index / cardsPerRow);
      const positionInRow = index % cardsPerRow;
      let offsetX, offsetY;
      console.log(card);
      // Расчет позиции X
      if (positionInRow === 0) {
        offsetX = 0;
      } else if (positionInRow % 2 === 1) {
        offsetX = -Math.ceil(positionInRow / 2) * cardWidth;
      } else {
        offsetX = Math.ceil(positionInRow / 2) * cardWidth;
      }
  
      // Увеличим коэффициент для более глубокой дуги
      offsetY = rowIndex * (cardHeight + 20) - Math.abs(offsetX) * 0.3;
  
      // console.log(`Card ${index}: rowIndex=${rowIndex}, positionInRow=${positionInRow}, offsetX=${offsetX}, offsetY=${offsetY}`);
      if (card) {
      card.style.transform = `translate(${offsetX}px, ${offsetY+y}px)`;
      }
    });
  }else {
    console.error('movieRefs.current is not an array');
  }
}


  const [tab, setTab] = useState("main")
  const [searchFilm, setSearchFilm] = useState("")

  return (
    <>
    <ModalProvider addToWatchedMovies={addToWatchedMovies} removeMovie={removeMovie}>
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
              <MoviesSection movies={movies}
                      movieRefs={movieRefs}
                />
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
