import { Router } from "express"
import WatchedMovie  from "../models/WatchedMovie.js"

const router = Router()

// Роут для добавления нового сериала
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
    const newWatchedSeries= new WatchedMovie({
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
    await newWatchedSeries.save()
    res.status(201).json(newWatchedSeries)
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Роут для получения всех сериалов
router.get("/", async (req, res) => {
    try {
      const series = await WatchedMovie.find({ isSeries: true })
      res.json(series)
    } catch (error) {
      res.status(500).json({ message: "Server error" })
    }
  })
  
  export default router
