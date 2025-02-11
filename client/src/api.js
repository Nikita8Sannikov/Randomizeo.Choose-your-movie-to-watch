import {fetchApi} from "./utils/utils"

// фильмы с главной
export const addMovie = (movie, userId) => fetchApi(`/api/movies/add?userId=${userId}`, "POST", movie)
export const getMovies = (userId) => fetchApi(`/api/movies?userId=${userId}`)
export const deleteMovie = (_id, userId) => fetchApi(`/api/movies/delete/${_id}?userId=${userId}`, "DELETE")

// фильмы со страницы просмотренных
export const addWatchedMovie = (movie, userId) => fetchApi(`/api/watched-movies/add?userId=${userId}`, "POST", movie)
export const getWatchedMovies = (userId) => fetchApi(`/api/watched-movies?userId=${userId}`)
export const deleteWatchedMovie = (_id, userId) => fetchApi(`/api/watched-movies/delete/${_id}?userId=${userId}`, "DELETE")

// Cериалы
export const addSeries = (movie, userId) => fetchApi(`/api/movies/series/add?userId=${userId}`, "POST", movie)
export const getSeries = (userId) => fetchApi(`/api/movies/series?userId=${userId}`)

// Просмотренные сериалы
export const addWatchedSeries = (movie, userId) => fetchApi(`/api/watched-movies/series/add?userId=${userId}`, "POST", movie)
export const getWatchedSeries = (userId) => fetchApi(`/api/watched-movies/series?userId=${userId}`)