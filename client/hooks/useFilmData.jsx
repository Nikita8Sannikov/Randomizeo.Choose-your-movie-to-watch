import React from "react";
import { useState, useCallback, useEffect } from "react";

const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL || "";

export default function useFilmData(kinoId) {
  const [filmData, setFilmData] = useState(null);

  const getFilmData = useCallback(async () => {
    if (!kinoId) return;

    const urlWithParams = `${SERVER_API_URL}/api/kinopoisk/movie/${kinoId}`;

    try {
      const res = await fetch(urlWithParams);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      setFilmData({
        name: data.name,
        shortDescription: data.shortDescription,
        description: data.description,
        year: data.year,
        posterUrl: data.poster?.previewUrl,
        genres: Array.isArray(data.genres)
          ? data.genres.map((genre) => genre.name).join(", ")
          : "",
        rating:
          data.rating && typeof data.rating.kp === "number"
            ? data.rating.kp.toFixed(2)
            : "",
        movieLength:
          data.movieLength != null
            ? `${Math.trunc(data.movieLength / 60)}ч.${data.movieLength % 60}м.`
            : "",
        kinopoiskId: data.id,
        isSeries: data.isSeries,
      });
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  }, [kinoId]);

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

