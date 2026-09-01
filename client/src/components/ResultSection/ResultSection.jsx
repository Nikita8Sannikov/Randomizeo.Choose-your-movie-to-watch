import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import Button from "../Button"
import Card, {StyledButton} from "../Card/Card"
import styles from "./ResultSection.module.css"
import { ModalContext } from '../Modal/ModalContext'

export default function ResultSection({movies, randomMovie, setRandomMovie, outputText, setOutputText }) {
  const { t } = useTranslation()
  const { showDetails } = useContext(ModalContext)
  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand)
  }

  function handleRandomMovie() {
    setOutputText(t('result.picking'))
    setTimeout(() =>{
    if(movies == undefined || movies.length === 0 ){
      alert(t('result.emptyAlert'))
      setOutputText('')
      return
   }
   const randomMovie =  movies[randomInteger(0, movies.length-1)]
   setRandomMovie(randomMovie);
   setOutputText(t('result.today'))
  }, 1000)
  }

  const resultSectionContent = (movie) => (
    <>
      <StyledButton
        onClick={() => showDetails(movie)}
      >
        {t("result.details")}
      </StyledButton>
    </>
  )

    return(
        <div className={styles.result}>
          <div className={styles.outputSection}>
            <h3>{t("result.heading")}</h3>
           <div className={styles.mainButton}> 
        <Button className={styles.button} onclick={() => handleRandomMovie()}>{t("result.button")}</Button>
            </div>
        <div className={styles.output}>{outputText}</div>
        <div className={styles.res}
        >
        {randomMovie && (
          <Card
            movie = {randomMovie}
            styleType="result" 
            buttons={resultSectionContent(randomMovie)}
          />
        )}
        </div>
      </div>
      </div>
    )
}