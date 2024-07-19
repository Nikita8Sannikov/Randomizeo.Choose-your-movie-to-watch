import React, { useContext } from 'react'
import Card, {StyledButton} from "./Card"
import { ModalContext } from './Modal/ModalContext'
import styles from "./WatchedSection.module.css"

const WathcedSection = ({movies, movieRefs,}) => {
  const { showDetails, showWatchedDeleteConfirmation, watchedMovies, setWatchedMovies } = useContext(ModalContext);

  const watchedSectionContent = (movie) => (
    <>
      <StyledButton
        onClick={() => showDetails(movie)}
      >
        Подробнее
      </StyledButton>
      <StyledButton
        onClick={() => showWatchedDeleteConfirmation(movie, watchedMovies, setWatchedMovies)}
      >
        <span class="fa-regular fa-trash-can trash-icon"></span>
      </StyledButton>
    </>
  )
  
  return (
    <div className={styles.filmContainer}  id="watched-films">
      {movies.map((movie, index) => (
             <Card 
              key={movie.id}
              movie = {movie}
              cardRef={(el) => (movieRefs.current[index] = el)}
              styleType="watchedSection"
              buttons={watchedSectionContent(movie)}
              />
          ))}
    </div>
  )
}

export default WathcedSection