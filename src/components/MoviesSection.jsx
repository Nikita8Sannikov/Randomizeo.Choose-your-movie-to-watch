import React from "react"
import Card from "./Card"

export default function MoviesSection({movies}) {
    return(
        <div className="film-container" id = "films">
     {movies.map((movie) => (
             <Card 
              key={movie.title}
               {...movie}/>
          ))}
     </div>
    )
}