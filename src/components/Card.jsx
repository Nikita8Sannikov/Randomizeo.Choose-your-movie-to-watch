import React, { useContext } from "react"
import { ModalContext } from './Modal/ModalContext'
import Button from "./Button"
import styles from "./MovieSection.module.css"

export default function Card({movie, cardRef }) {
  const { showDetails, showViewedConfirmation } = useContext(ModalContext)

    return(
        <div className={styles.card} ref={cardRef}>
        <div className={styles.imgWrapper}>
        
        <img src={movie.img} alt={movie.title} className={styles.cardImg} />
        <div className={styles.descriptionLayer}>
        <p className={styles.cardText}>Описание по кнопке ниже &#8595 </p>
        </div>
        </div>
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>{movie.title}</h5>
          <p className={styles.cardText}>описание</p>
          <div className={styles.buttonSection}>
            <Button
              href="#"
              className={styles.btn}
              data-btn="description"
              data-id={movie.id}
              onclick={() => showDetails(movie)}
            >
              Описание
            </Button>
            <Button
              href="#"
              className={styles.btn}
              data-btn="viewed"
              data-id={movie.id}
              onclick={() => showViewedConfirmation(movie)}
            >
              Просмотрено
            </Button>
          </div>
        </div>
      </div>
    )
}