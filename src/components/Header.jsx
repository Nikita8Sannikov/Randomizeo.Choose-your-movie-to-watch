import React from "react"
import { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import Card from "./Card"

export default function Header() {
  const [filmName, setFilmName] = useState("")
  const [filmUrl, setFilmUrl] = useState("")
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

  const handleFilmNameChange = (event) => setFilmName(event.target.value)
  const handleFilmUrlChange = (event) => setFilmUrl(event.target.value)

  function handleClick(event) {
    event.preventDefault()
    console.log("Название фильма:", filmName)
    console.log("URL обложки:", filmUrl)
    const newMovie = {
      title: filmName,
      img: filmUrl,
    }
    const updatedMovies = [...movies, newMovie]
    console.log("Updated Movies:", updatedMovies)

    setMovies(updatedMovies)

    setFilmName("")
    setFilmUrl("")
  }
  return (
    <>
      <div className="add-film">
        <form>
          <Input
            description="Введите название фильма"
            placeholder="название"
            labelFor="text1"
            id="text1"
            value={filmName}
            onChange={handleFilmNameChange}
          />
          <Input
            description="Введите URL обложки"
            placeholder="URL"
            labelFor="text2"
            id="text2"
            value={filmUrl}
            onChange={handleFilmUrlChange}
          />

          <Button className="add-button" onclick={handleClick}>
            Добавить
          </Button>

          <div className="search-area">
            <Input
              placeholder="Введи название"
              labelFor="text"
              className="search"
            />

            <ul id="filter-results"></ul>
          </div>
        </form>
      </div>

      <div className="result">
        <Button className="button">Что смотрим сегодня?</Button>
        <div className="output">#</div>
        <div className="res" id="result">
          {movies.map((movie) => (
             <Card 
             key={movie.id} movie={movie}/>
          ))}
        </div>
      </div>
    </>
  )
}
