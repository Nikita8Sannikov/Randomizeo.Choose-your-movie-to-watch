import React from 'react'
import Card from './Card';

const Filter = ({movies, searchFilm}) => {
    function filter(val, filmList){
        if (!val) return [];
        return filmList.filter(el => el.title.toLowerCase().substring(0, val.length) === val.toLowerCase())
      }
  return (
    <>
    
    <ul id="filter-results">
              {filter(searchFilm, movies).map((movie) => (
             <Card 
              key={movie.id}
               {...movie}/>
          ))
              }
            </ul>
    </>
  )
}

export default Filter