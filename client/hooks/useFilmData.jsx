import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getPlaceholderPosterUrl } from "../src/constants";

const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL || "";

export default function useFilmData(kinoId) {
  const { t } = useTranslation();
  const [filmData, setFilmData] = useState(null);

  const getFilmData = useCallback(async () => {
    if (!kinoId) return;

    const urlWithParams = `${SERVER_API_URL}/api/kinopoisk/movie/${kinoId}`;

    try {
      const res = await fetch(urlWithParams, { credentials: "include" });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      setFilmData({
        name: data.name,
        shortDescription: data.shortDescription,
        description: data.description,
        year: data.year,
        posterUrl: data.poster?.previewUrl || data.poster?.url || getPlaceholderPosterUrl(t("card.noPoster")),
        genres: Array.isArray(data.genres)
          ? data.genres.map((genre) => genre.name).join(", ")
          : "",
        rating:
          data.rating && typeof data.rating.kp === "number"
            ? data.rating.kp.toFixed(2)
            : "",
        movieLength:
          data.movieLength != null
            ? t("duration.hoursMinutes", {
                hours: Math.trunc(data.movieLength / 60),
                minutes: data.movieLength % 60,
              })
            : "",
        kinopoiskId: data.id,
        isSeries: data.isSeries,
      });
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  }, [kinoId, t]);

  useEffect(() => {
    getFilmData();
  }, [getFilmData]);

  const resetFilmData = useCallback(() => {
    setFilmData(null);
  }, []);

  return {
    filmData,
    resetFilmData,
  };
}

