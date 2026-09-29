import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Card.module.css";
import Button from "../Button";
import { movieShortDescription, movieTitle, formatMovieLength, truncateText } from "../../utils/localizedMovie";
import { getPlaceholderPosterUrl } from "../../constants";
import { refreshPoster } from "../../api";

const CARD_HEIGHT_TALL = 520;   /* переключаем на мелкий шрифт */
const CARD_HEIGHT_SHORT = 480;  /* переключаем обратно (гистерезис, чтобы не дергалось) */

export default function Card({ movie, cardRef, styleType, buttons }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language;
  const title = movieTitle(movie, lang);
  const shortDescription = truncateText(movieShortDescription(movie, lang));
  const lengthLabel = formatMovieLength(movie.movieLength, t);
  const containerRef = useRef(null);
  const placeholderSrc = getPlaceholderPosterUrl(t("card.noPoster"));
  const [isCardTall, setIsCardTall] = useState(false);
  const isCardTallRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkHeight = () => {
      const h = el.offsetHeight;
      const currentlyTall = isCardTallRef.current;
      if (!currentlyTall && h > CARD_HEIGHT_TALL) {
        isCardTallRef.current = true;
        setIsCardTall(true);
      } else if (currentlyTall && h < CARD_HEIGHT_SHORT) {
        isCardTallRef.current = false;
        setIsCardTall(false);
      }
    };

    checkHeight();
    const observer = new ResizeObserver(checkHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const className = `${styles.card} ${styles[styleType]}${isCardTall ? ` ${styles.cardTall}` : ""}`;

  const handleImageError = async (e) => {
    if (e.target.dataset.retried) return;
    e.target.dataset.retried = "1";

    if (movie._id) {
      try {
        const data = await refreshPoster(movie._id);
        if (data.img) {
          e.target.src = data.img;
          return;
        }
      } catch (error) {
        console.error("Не удалось обновить постер", error);
      }
    }

    e.target.src = placeholderSrc;
  };

  const setRef = (el) => {
    containerRef.current = el;
    if (cardRef) {
      if (typeof cardRef === "function") cardRef(el);
      else cardRef.current = el;
    }
  };

  return (
    <div className={className} ref={setRef}>
      <div className={styles.imgWrapper}>
        <img
          src={movie.img || placeholderSrc}
          alt={title}
          className={styles.cardImg}
          onError={handleImageError}
        />
        <div className={styles.descriptionLayer}>
          <p className={styles.cardText}>
            <>
              {shortDescription || t("card.noShortDescription")}
              <br />
              <i>{movie.genres || ""}</i>
              <br />
              <i>{lengthLabel}</i>
            </>
          </p>
        </div>
      </div>
      <div className={styles.cardBody}>
        <h5 className={styles.cardTitle}>
          {title} {(movie.year || "") && `(${movie.year})`}
        </h5>
        <p className={styles.cardText}>
          <i className="fa-solid fa-star star-icon"></i>
          {movie.rating == 0 ? t("card.noRating") : movie.rating}
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