import React from "react"
import Input from "./Input"
import Button from "./Button"

const AddKinopoisk = () => {
  return (
    <>
      <div className="kinopoiskSection">
        <div className="input-kinopoisk">
          <Input
            type="text"
            id="text3"
            placeholder="Введите ссылку на Кинопоиск"
          />
          <Button className="bars-btn">
            <span className="fa-solid fa-bars fa-3x bars-icon"></span>
          </Button>
        </div>
        <Button className="add-kinopoisk-button">Добавить фильм</Button>
      </div>
    </>
  )
}

export default AddKinopoisk
