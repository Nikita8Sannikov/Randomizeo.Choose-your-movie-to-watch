import React from "react"
import { useState } from "react"
import Header from "./components/Header"
import MoviesSection from "./components/MoviesSection"
import ResultSection from "./components/ResultSection"
import TabsSection from "./components/TabsSection"
import WatchedSection from "./components/WathcedSection"

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
   

  function getNextId(movies) {
    const maxId = movies.reduce((max, movie) => Math.max(max, movie.id), 0);
    return maxId + 1;
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

  const [tab, setTab] = useState('main')

  return (
    <>
    <main>
      <TabsSection active={tab} onChange={(current) => setTab(current)}/>
      
      {tab === 'main' && (
        <>
        <Header addMovie={addMovie}/>
         <ResultSection/>
         <MoviesSection movies={movies}/>
        </>
      ) }

      {tab === 'watched' && <WatchedSection/> }
    </main>
    </>
  )
}

export default App
