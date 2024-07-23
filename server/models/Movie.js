import mongoose from 'mongoose'

const { Schema, model } = mongoose

const movieSchema = new Schema({
    id: { type: Number, required: true, unique: true }, // id фильма
    title: { type: String, required: true }, // Название фильма 
    img: { type: String, required: true }, // URL изображения
    shortDescription: { type: String, required: true }, // Краткое описание фильма
    description: { type: String, required: true }, // Полное описание фильма
    year: { type: Number, required: true }, // Год выпуска фильма
    genres: { type: String, required: true }, // Жанры фильма
    rating: { type: String, required: true }, // Рейтинг фильма
    watched: { type: Boolean, default: false } // Флаг, указывающий, просмотрен ли фильм 
  })

export default model('Movie', movieSchema)