import React from 'react'
import Card from '../Card';
import styles from "./Filter.module.css"

const Filter = ({movies, searchFilm}) => {
    function filter(val, filmList){
        if (!val) return [];
        return filmList.filter(el => el.title.toLowerCase().substring(0, val.length) === val.toLowerCase())
      }
  return (
    <div>
    <ul id={styles.filterResults}>
              {filter(searchFilm, movies).map((movie) => (
             <Card 
              key={movie.id}
              movie = {movie}
              styleType="filter" 
              />
          ))
              }
            </ul>
    </div>
  )
}

export default Filter