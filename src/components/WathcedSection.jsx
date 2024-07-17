import React, { useContext } from 'react'
import Card, {StyledButton} from "./Card"
import { ModalContext } from './Modal/ModalContext'
import styles from "./WatchedSection.module.css"

const WathcedSection = ({movies}) => {
  const { showDetails, showWatchedDeleteConfirmation, watchedMovies, setWatchedMovies } = useContext(ModalContext);

  const watchedSectionContent = (movie) => (
    <>
      <StyledButton
        onClick={() => showDetails(movie)}
      >
        Описание
      </StyledButton>
      <StyledButton
        onClick={() => showWatchedDeleteConfirmation(movie, watchedMovies, setWatchedMovies)}
      >
        удалить
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