import React from "react"
import Card from "./Card"

export default function MoviesSection({movies, addToWatchedMovies, removeMovie}) {
    return(
        <div className="film-container" id = "films">
     {movies.map((movie) => (
             <Card addToWatchedMovies={addToWatchedMovies}
             removeMovie={removeMovie}
              key={movie.id}
               movie = {movie}/>
          ))}
     </div>
    )
}