import React from 'react'
import Card from "./Card"

const WathcedSection = ({movies}) => {
  return (
    <div className="film-container" id="watched-films">
      {movies.map((movie) => (
             <Card 
              key={movie.id}
              movie = {movie}/>
          ))}
    </div>
  )
}

export default WathcedSection