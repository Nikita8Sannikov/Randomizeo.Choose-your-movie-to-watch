import {fetchApi} from "./utils/utils"
const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

// фильмы с главной
export const addMovie = (movie, userId) => fetchApi(`${SERVER_API_URL}/api/movies/add?userId=${userId}`, "POST", movie)
export const getMovies = (userId) => fetchApi(`${SERVER_API_URL}/api/movies?userId=${userId}`)
export const deleteMovie = (_id, userId) => fetchApi(`${SERVER_API_URL}/api/movies/delete/${_id}?userId=${userId}`, "DELETE")

// фильмы со страницы просмотренных
export const addWatchedMovie = (movie, userId) => fetchApi(`${SERVER_API_URL}/api/watched-movies/add?userId=${userId}`, "POST", movie)
export const getWatchedMovies = (userId) => fetchApi(`${SERVER_API_URL}/api/watched-movies?userId=${userId}`)
export const deleteWatchedMovie = (_id, userId) => fetchApi(`${SERVER_API_URL}/api/watched-movies/delete/${_id}?userId=${userId}`, "DELETE")

// Cериалы
export const addSeries = (movie, userId) => fetchApi(`${SERVER_API_URL}/api/movies/series/add?userId=${userId}`, "POST", movie)
export const getSeries = (userId) => fetchApi(`${SERVER_API_URL}/api/movies/series?userId=${userId}`)

// Просмотренные сериалы
export const addWatchedSeries = (movie, userId) => fetchApi(`${SERVER_API_URL}/api/watched-movies/series/add?userId=${userId}`, "POST", movie)
export const getWatchedSeries = (userId) => fetchApi(`${SERVER_API_URL}/api/watched-movies/series?userId=${userId}`)