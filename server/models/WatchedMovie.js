import mongoose from 'mongoose'

const { Schema, model } = mongoose

const watchedMovieSchema = new Schema({
  // id: { type: Number, unique: true }, // id фильма
    id: { type: Number }, // id фильма
    title: { type: String, required: true }, // Название фильма 
    img: { type: String, required: true }, // URL изображения
    shortDescription: String, // Краткое описание фильма
    description: String, // Полное описание фильма
    year: Number, // Год выпуска фильма
    genres: String, // Жанры фильма
    rating: String, // Рейтинг фильма
    movieLength: String, //Продолжительность фильма
  })

export default model('WatchedMovie', watchedMovieSchema)
