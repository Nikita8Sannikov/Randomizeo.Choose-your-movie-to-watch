import React from "react"
import Card from "./Card"
import styles from "./MovieSection.module.css"

export default function MoviesSection({movies, addToWatchedMovies, removeMovie}) {
    return(
        <div className={styles.filmContainer} id = "films">
     {movies.map((movie) => (
             <Card addToWatchedMovies={addToWatchedMovies}
             removeMovie={removeMovie}
              key={movie.id}
               movie = {movie}/>
          ))}
     </div>
    )
}