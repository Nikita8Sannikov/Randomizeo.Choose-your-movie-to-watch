import React, { useContext } from 'react'
import Card from "./Card"
import { ModalContext } from './Modal/ModalContext'
import Button from "./Button"
import styles from "./WatchedSection.module.css"

const WathcedSection = ({movies}) => {
  const { showDetails } = useContext(ModalContext);

  const watchedSectionContent = (movie) => (
    <>
      <StyledButton
        onClick={() => showDetails(movie)}
      >
        Описание
      </StyledButton>
    </>
  )
  
  return (
    <div className={styles.filmContainer}  id="watched-films">
      {movies.map((movie) => (
             <Card 
              key={movie.id}
              movie = {movie}
              styleType="watchedSection"
              buttons={watchedSectionContent(movie)}
              />
          ))}
    </div>
  )
}

export default WathcedSection