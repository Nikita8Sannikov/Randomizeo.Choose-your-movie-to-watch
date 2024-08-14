import { Router } from "express"
import WatchedMovie  from "../models/WatchedMovie.js"

const router = Router()

// Роут для добавления нового фильма
router.post("/add", async (req, res) => {
  try {
    const {
      id,
      title,
      img,
      shortDescription,
      description,
      year,
      genres,
      rating,
      movieLength,
      kinopoiskId,
      isSeries,
    } = req.body
    const newWatchedMovie= new WatchedMovie({
      id,
      title,
      img,
      shortDescription,
      description,
      year,
      genres,
      rating,
      movieLength,
      kinopoiskId,
      isSeries,
    })
    await newWatchedMovie.save()
    res.status(201).json(newWatchedMovie)
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Роут для получения всех фильмов
router.get("/", async (req, res) => {
  try {
    const movies = await WatchedMovie.find({ isSeries: false })
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})
// // Роут для получения всех сериалов
// router.get("/series", async (req, res) => {
//   try {
//     const series = await WatchedMovie.find({ isSeries: true })
//     res.json(series)
//   } catch (error) {
//     res.status(500).json({ message: "Server error" })
//   }
// })

// Роут для удаления фильма
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params
    const movie = await WatchedMovie.findOneAndDelete({ id })
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" })
    }
    res.json({ message: "Movie deleted" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
