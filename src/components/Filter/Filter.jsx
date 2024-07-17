import React, { useContext } from 'react'
import Card from '../Card';
import styles from "./Filter.module.css"
import { ModalContext } from '../Modal/ModalContext'
import Button from "../Button"


const Filter = ({movies, searchFilm}) => {
  const { showDetails, showViewedConfirmation } = useContext(ModalContext)

    function filter(val, filmList){
        if (!val) return [];
        return filmList.filter(el => el.title.toLowerCase().substring(0, val.length) === val.toLowerCase())
      }

const filterContent = (movie) => (
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
      )    

  return (
    <div>
    <ul id={styles.filterResults}>
              {filter(searchFilm, movies).map((movie) => (
             <Card 
              key={movie.id}
              movie = {movie}
              styleType="filter" 
              buttons={filterContent(movie)}
              />
          ))
              }
            </ul>
    </div>
  )
}

export default Filter