import React, { useContext } from "react"
import Card, {StyledButton} from "./Card"
import styles from "./MovieSection.module.css"
import { ModalContext } from './Modal/ModalContext'

export default function MoviesSection({
  movies,
  movieRefs,
}) {
  const { showDetails, showViewedConfirmation, setMovies } = useContext(ModalContext)

    const movieSectionContent = (movie) => (
      <>
        <StyledButton
          onClick={() => showDetails(movie)}e
            >
              Описание
        </StyledButton>
        <StyledButton
          onClick={() => showViewedConfirmation(movie, movies, setMovies)}
            >
          <span className="fa-regular fa-eye view-icon"></span>
        </StyledButton>
      </>
    );


  return (
    <div className={styles.filmContainer} id="films">
      {movies.map((movie, index) => (
        <Card
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
