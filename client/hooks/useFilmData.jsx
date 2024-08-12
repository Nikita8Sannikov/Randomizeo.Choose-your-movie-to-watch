import React from "react"
import { useState, useCallback, useEffect } from "react"

export default function useFilmData(kinoId) {
  const [filmData, setFilmData] = useState(null)
  const options = {
    method: "GET",
    headers: {
      "X-API-KEY": import.meta.env.VITE_API_KEY,
    },
  }

  const getFilmData = useCallback(async () => {
    if (!kinoId) return

    const urlWithParams = `${import.meta.env.VITE_API_URL}/${kinoId}`
    try {
      const res = await fetch(urlWithParams, options)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await res.json()
      setFilmData({
        name: data.name,
        shortDescription: data.shortDescription,
        description: data.description,
        year: data.year,
        posterUrl: data.poster.previewUrl,
        genres: data.genres.map((genre) => genre.name).join(", "),
        rating: data.rating.kp.toFixed(2),
        movieLength: data.movieLength!=null ? `${Math.trunc(data.movieLength/60)}ч.${data.movieLength % 60}м.`: ''
      })
    } catch (error) {
      console.error("Ошибка запроса:", error)
    }
  }, [kinoId])

  useEffect(() => {
    getFilmData()
  }, [getFilmData])

  const resetFilmData = useCallback(() => {
    setFilmData(null)
  }, [])

  return {
    filmData,
    resetFilmData,
  }
}
