import React, { useContext } from "react"
import Card, {StyledButton} from "./Card"
import styles from "./MovieSection.module.css"
import { ModalContext } from './Modal/ModalContext'

export default function MoviesSection({
  movies,
  addToWatchedMovies,
  removeMovie,
  movieRefs,
}) {
  const { showDetails, showViewedConfirmation } = useContext(ModalContext)

    const movieSectionContent = (movie) => (
      <>
        <StyledButton
          onClick={() => showDetails(movie)}
            >
              Описание
        </StyledButton>
        <StyledButton
          onClick={() => showViewedConfirmation(movie)}
            >
          <span className="fa-regular fa-eye view-icon"></span>
        </StyledButton>
      </>
    );


  return (
    <div className={styles.filmContainer} id="films">
      {movies.map((movie, index) => (
        <Card
          addToWatchedMovies={addToWatchedMovies}
          removeMovie={removeMovie}
          key={movie.id}
          movie={movie}
          cardRef={(el) => (movieRefs.current[index] = el)}
          styleType="movieSection"
          buttons={movieSectionContent(movie)}
        />
      ))}
    </div>
  )
}
