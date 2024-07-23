import React, { useContext } from 'react'
import Card, {StyledButton} from "../Card/Card"
import styles from "./Filter.module.css"
import { ModalContext } from '../Modal/ModalContext'

const Filter = ({movies, searchFilm}) => {
  const { showDetails, showViewedConfirmation } = useContext(ModalContext)

    function filter(val, filmList){
        if (!val) return [];
        return filmList.filter(el => el.title.toLowerCase().substring(0, val.length) === val.toLowerCase())
      }

const filterContent = (movie) => (
        <>
         <StyledButton
              onclick={() => showDetails(movie)}
            >
              Описание
            </StyledButton>
            <StyledButton
              onclick={() => showViewedConfirmation(movie)}
            >
              <span className="fa-regular fa-eye view-icon"></span>
            </StyledButton>
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