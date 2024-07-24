import mongoose from 'mongoose'

const { Schema, model } = mongoose

const movieSchema = new Schema({
    id: { type: Number, unique: true }, // id фильма
    title: { type: String, required: true }, // Название фильма 
    img: { type: String, required: true }, // URL изображения
    shortDescription: String, // Краткое описание фильма
    description: String, // Полное описание фильма
    year: Number, // Год выпуска фильма
    genres: String, // Жанры фильма
    rating: String, // Рейтинг фильма
    watched: { type: Boolean, default: false } // Флаг, указывающий, просмотрен ли фильм 
  })

export default model('Movie', movieSchema)