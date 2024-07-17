import React, { useContext } from "react"
import Card from "./Card"
import styles from "./MovieSection.module.css"
import { ModalContext } from './Modal/ModalContext'
import Button from "./Button"

export default function MoviesSection({
  movies,
  addToWatchedMovies,
  removeMovie,
  movieRefs,
}) {
  const { showDetails, showViewedConfirmation } = useContext(ModalContext)

    const movieSectionContent = (movie) => (
      <>
        <Button
              href="#"
              className={styles.btn}
              data-btn="description"
              // data-id={movie.id}
              onclick={() => showDetails(movie)}
            >
              Описание
            </Button>
            <Button
              href="#"
              className={styles.btn}
              data-btn="viewed"
              // data-id={movie.id}
              onclick={() => showViewedConfirmation(movie)}
            >
              <span className="fa-regular fa-eye view-icon"></span>
            </Button>
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
