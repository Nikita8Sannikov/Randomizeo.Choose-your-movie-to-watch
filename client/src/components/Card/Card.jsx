import React from "react";
import styles from "./Card.module.css";
import Button from "../Button";
import { PLACEHOLDER_POSTER_URL } from "../../constants";

const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL || "";

export default function Card({ movie, cardRef, styleType, buttons }) {
  const className = `${styles.card} ${styles[styleType]}`;

  const handleImageError = async (e) => {
    if (e.target.dataset.retried) return;
    e.target.dataset.retried = "1";

    if (movie._id) {
      try {
        const res = await fetch(
          `${SERVER_API_URL}/api/movies/refresh-poster/${movie._id}`,
          {
            method: "POST",
          }
        );

        if (!res.ok) return;

        const data = await res.json();
        if (data.img) {
          e.target.src = data.img;
          return;
        }
      } catch (error) {
        console.error("Не удалось обновить постер", error);
      }
    }

    e.target.src = PLACEHOLDER_POSTER_URL;
  };

  return (
    <div className={className} ref={cardRef}>
      <div className={styles.imgWrapper}>
        <img
          src={movie.img || PLACEHOLDER_POSTER_URL}
          alt={movie.title}
          className={styles.cardImg}
          onError={handleImageError}
        />
        <div className={styles.descriptionLayer}>
          <p className={styles.cardText}>
            <>
              {movie.shortDescription || "Описание по кнопке ниже ↓"}
              <br />
              <i>{movie.genres || ""}</i>
              <br />
              <i>{movie.movieLength || ""}</i>
            </>
          </p>
        </div>
      </div>
      <div className={styles.cardBody}>
        <h5 className={styles.cardTitle}>
          {movie.title} {(movie.year || "") && `(${movie.year})`}
        </h5>
        <p className={styles.cardText}>
          <i className="fa-solid fa-star star-icon"></i>
          {movie.rating == 0 ? "Рейтинг пока не добавлен" : movie.rating}
        </p>
        <div className={styles.buttonSection}>{buttons}</div>
      </div>
    </div>
  );
}

export const StyledButton = ({ onClick, children }) => (
  <Button className={styles.btn} onclick={onClick}>
    {children}
  </Button>
);