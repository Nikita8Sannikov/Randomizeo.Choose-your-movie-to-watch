import React, { useContext } from 'react'
import Card from "./Card"
import { ModalContext } from './Modal/ModalContext'
import Button from "./Button"


const watchedSectionContent = (movie) => (
  <>
    <Button
      href="#"
      className={styles.btn}
      data-btn="description"
      onClick={() => showDetails(movie)}
    >
      Описание
    </Button>
  </>
)

const WathcedSection = ({movies}) => {
  const { showDetails } = useContext(ModalContext);
  return (
    <div className="film-container" id="watched-films">
      {movies.map((movie) => (
             <Card 
              key={movie.id}
              movie = {movie}
              buttons={watchedSectionContent(movie)}
              />
          ))}
    </div>
  )
}

export default WathcedSection