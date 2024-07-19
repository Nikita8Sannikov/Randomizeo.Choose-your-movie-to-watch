import React from "react"
import styles from "./Card.module.css"
import Button from "./Button"

export default function Card({movie, cardRef, styleType, buttons }) {
  const className = `${styles.card} ${styles[styleType]}`
    return(
        <div className={className} ref={cardRef}>
        <div className={styles.imgWrapper}>
        
        <img src={movie.img} alt={movie.title} className={styles.cardImg} />
        <div className={styles.descriptionLayer}>
        <p className={styles.cardText}>
          <>
          {movie.shortDescription ||'Описание по кнопке ниже ↓'} 
          <br></br>
          <i>{movie.genres||''}</i>
          </>
          </p>
        </div>
        </div>
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>{movie.title} {(movie.year || '') && `(${movie.year})`}</h5>
          <p className={styles.cardText}>
          <i className="fa-solid fa-star star-icon"></i>
          {movie.rating || ''}
          </p>
          <div className={styles.buttonSection}>
             {buttons}
             </div>
        </div>
      </div>
    )
}

export const StyledButton = ({ onClick, children }) => (
  <Button className={styles.btn} onclick={onClick}>
    {children}
  </Button>
);