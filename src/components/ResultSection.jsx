import React from "react"
import Button from "./Button"
import Card from "./Card"
import { useState } from "react"

export default function ResultSection({movies}) {
  const [randomMovie, setRandomMovie] = useState(null)
  const [outputText, setOutputText] = useState('#');
  
  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand)
  }

  function handleRandomMovie() {
    setOutputText('Выбираю ваш фильм...')
    setTimeout(() =>{
    if(movies == undefined || movies.length === 0 ){
      alert('Добавьте хотя бы 1 фильм..')
   }
   const randomMovie =  movies[randomInteger(0, movies.length-1)]
   setRandomMovie(randomMovie);
   setOutputText('Сегодня смотрим этот шедевр:')
  }, 1000)
  }

    return(
        <div className="result">
        <Button className="button" onclick={() => handleRandomMovie()}>Что смотрим сегодня?</Button>
        <div className="output">{outputText}</div>
        <div className="res" id="result">
        {randomMovie && (
          <Card
            movie = {randomMovie}
            title={randomMovie.title}
            id={randomMovie.id}
            img={randomMovie.img}
          />
        )}
        </div>
      </div>
    )
}