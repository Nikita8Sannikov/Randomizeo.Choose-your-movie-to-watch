import React from "react"
import { useState } from "react"
import Input from "../Input"
import Button from "../Button"
import styles from "./AddFilmSection.module.css"

export default function AddFilmOption({ addMovie }) {
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
      <div className={styles.addFilmOptions}>
      <div className={styles.addSection}>
      <div className={styles.addInputs}>
          <Input
            placeholder="Введите название фильма"
            labelFor="text1"
            id="text1"
            value={filmName}
            onChange={handleFilmNameChange}
          />
          <Input
            placeholder="Введите URL обложки"
            labelFor="text2"
            id="text2"
            value={filmUrl}
            onChange={handleFilmUrlChange}
          />
            </div>
          <Button className={styles.addButton} onclick={handleClick}>
            Добавить
          </Button>

       </div>
      </div>
    </>
  )
}
