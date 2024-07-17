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
        <p className={styles.cardText}>Описание по кнопке ниже &#8595 </p>
        </div>
        </div>
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>{movie.title}</h5>
          <p className={styles.cardText}>
          <i className="fa-solid fa-star star-icon"></i>
            рейтинг</p>
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