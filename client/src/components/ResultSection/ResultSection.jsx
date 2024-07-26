import React, { useContext } from "react"
import Button from "../Button"
import Card, {StyledButton} from "../Card/Card"
import { useState } from "react"
import styles from "./ResultSection.module.css"
import { ModalContext } from '../Modal/ModalContext'

export default function ResultSection({movies, randomMovie, setRandomMovie, outputText, setOutputText }) {
  // const [randomMovie, setRandomMovie] = useState(null)
  // const [outputText, setOutputText] = useState('')
  const { showDetails } = useContext(ModalContext)
  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand)
  }

  function handleRandomMovie() {
    setOutputText('Выбираю ваш фильм...')
    setTimeout(() =>{
    if(movies == undefined || movies.length === 0 ){
      alert('Добавьте хотя бы 1 фильм..')
      return
   }
   const randomMovie =  movies[randomInteger(0, movies.length-1)]
   setRandomMovie(randomMovie);
   setOutputText('Сегодня смотрим этот шедевр:')
  }, 1000)
  }

  const resultSectionContent = (movie) => (
    <>
      <StyledButton
        onClick={() => showDetails(movie)}
      >
        Подробнее
      </StyledButton>
    </>
  )

    return(
        <div className={styles.result}>
          <div className={styles.outputSection}>
            <h3>Что смотрим сегодня?</h3>
           <div className={styles.mainButton}> 
        <Button className={styles.button} onclick={() => handleRandomMovie()}>Тык</Button>
            </div>
        <div className={styles.output}>{outputText}</div>
        <div className={styles.res}
        // id={styles.result}
        >
        {randomMovie && (
          <Card
            movie = {randomMovie}
            styleType="result" 
            buttons={resultSectionContent(randomMovie)}
            // title={randomMovie.title}
            // id={randomMovie.id}
            // img={randomMovie.img}
          />
        )}
        </div>
      </div>
      </div>
    )
}