import mongoose from "mongoose"
import config from "config"
import Movie from "./models/Movie.js"
import WatchedMovie from "./models/WatchedMovie.js"
import dotenv from 'dotenv'

// Настройка dotenv для загрузки переменных окружения
dotenv.config();

const API_KEY = process.env.KINOPOISK_API_KEY
const KINOPOISK_API_URL = process.env.KINOPOISK_API_URL
const titlesToUpdate = ['Переполненная комната', 'Тёмная материя'];

async function fetchMovieData(title) {
    if (!API_KEY) {
        throw new Error('API key is not defined');
    }
    const options = {
        method: "GET",
        headers: {
            'accept': 'application/json',
            "X-API-KEY": API_KEY,
        },
      }

    const urlWithParams = `${KINOPOISK_API_URL}?query=${encodeURIComponent(title)}`
        
    const response = await fetch(urlWithParams, options);

    if (!response.ok) {
        throw new Error(`Fetch error: ${response.statusText}`);
    }
  const data = await response.json()

  if (data && data.docs && data.docs.length > 0) {
    const movie = data.docs[0] // Берём первый результат
    return {
       
      movieLength:  (movie.movieLength === null || movie.movieLength === undefined || movie.movieLength === 0) 
      ? '' 
      : `${Math.trunc(movie.movieLength / 60)}ч. ${movie.movieLength % 60}м.`,
    //   kinopoiskId: movie.id || null,
    //   isSeries: movie.isSeries,
    }
  }

  return null // Если фильм не найден
}

async function updateMovies() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
    })
    console.log("Connected to database")

    // Обновление коллекции Movie
    const movies = await Movie.find({ title: { $in: titlesToUpdate } })
    for (const movie of movies) {
      const movieData = await fetchMovieData(movie.title)
      if (movieData) {
        await Movie.updateOne({ _id: movie._id }, { $set: movieData })
        console.log(`Updated movie: ${movie.title}`)
      } else {
        console.log(`Movie not found on Kinopoisk: ${movie.title}`)
      }
    }

    console.log("Movie collection updated")

    // Обновление коллекции WatchedMovie
    // const watchedMovies = await WatchedMovie.find({})
    // for (const movie of watchedMovies) {
    //   const movieData = await fetchMovieData(movie.title)
    //   if (movieData) {
    //     await WatchedMovie.updateOne({ _id: movie._id }, { $set: movieData })
    //     console.log(`Updated watched movie: ${movie.title}`)
    //   } else {
    //     console.log(`Watched movie not found on Kinopoisk: ${movie.title}`)
    //   }
    // }

    // console.log("WatchedMovie collection updated")

    // await mongoose.connection.close()
  } catch (err) {
    console.error("Database connection error", err)
  }
}

updateMovies()
