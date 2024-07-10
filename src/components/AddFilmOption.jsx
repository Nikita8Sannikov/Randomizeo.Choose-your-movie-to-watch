import React from "react"
import { useState } from "react"
import Input from "./Input"
import Button from "./Button"

export default function AddFilmOption({addMovie, movies}) {
  const [filmName, setFilmName] = useState("")
  const [filmUrl, setFilmUrl] = useState("")

 
  const handleFilmNameChange = (event) => setFilmName(event.target.value)
  const handleFilmUrlChange = (event) => setFilmUrl(event.target.value)
 

  function handleClick(event) {
    event.preventDefault()
    console.log("Название фильма:", filmName)
    console.log("URL обложки:", filmUrl)
    addMovie(filmName, filmUrl)
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

        </form>
      </div>
    </>
  )
}
