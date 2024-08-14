import { Router } from "express"
import Movie from "../models/Movie.js"

const router = Router()

// router.get('/', (req, res) => {
//   res.send('Hello from the server!');
// })

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
    const newMovie = new Movie({
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
    await newMovie.save()
    res.status(201).json(newMovie)
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Роут для получения всех фильмов
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find( 
      { isSeries: false }
    )
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})
// // Роут для получения всех сериалов
// router.get("/", async (req, res) => {
//     try {
//       const series = await Movie.find({ isSeries: true })
//       res.json(series)
//     } catch (error) {
//       res.status(500).json({ message: "Server error" })
//     }
//   })


// // Роут для получения просмотренных фильмов
// router.get("/watched", async (req, res) => {
//   try {
//     const movies = await Movie.find({ watched: true })
//     res.json(movies)
//   } catch (error) {
//     res.status(500).json({ message: "Server error" })
//   }
// })

// // Роут для обновления статуса фильма
// router.put("/update/:id", async (req, res) => {
//   try {
//     const { id } = req.params
//     const { watched } = req.body
//     const movie = await Movie.findOne({ id })
//     if (!movie) {
//       return res.status(404).json({ message: "Movie not found" })
//     }
//     movie.watched = watched
//     await movie.save()
//     res.json(movie)
//   } catch (error) {
//     res.status(500).json({ message: "Server error" })
//   }
// })

// Роут для удаления фильма
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params
    const movie = await Movie.findOneAndDelete({ id })
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" })
    }
    res.json({ message: "Movie deleted" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
