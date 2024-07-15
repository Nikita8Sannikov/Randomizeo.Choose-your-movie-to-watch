import React from "react"
import Button from "../Button"
import Card from "../Card"
import { useState } from "react"
import styles from "./ResultSection.module.css"

export default function ResultSection({movies}) {
  const [randomMovie, setRandomMovie] = useState(null)
  const [outputText, setOutputText] = useState('');
  
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
        <div className={styles.result}>
          <div className={styles.outputSection}>
            <h3>Что смотрим сегодня?</h3>
           <div className={styles.mainButton}> 
        <Button className={styles.button} onclick={() => handleRandomMovie()}>Тык</Button>
            </div>
        <div className={styles.output}>{outputText}</div>
        <div className="res" id={styles.result}>
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
      </div>
    )
}