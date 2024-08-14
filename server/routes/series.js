import { Router } from "express"
import Movie from "../models/Movie.js"
console.log("Series routes file loaded");
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
    const newSeries = new Movie({
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
    await newSeries.save()
    res.status(201).json(newSeries)
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Роут для получения всех сериалов
router.get("/", async (req, res) => {
    try {
      const series = await Movie.find({ isSeries: true })
      res.json(series)
    } catch (error) {
      res.status(500).json({ message: "Server error" })
    }
  })

  export default router