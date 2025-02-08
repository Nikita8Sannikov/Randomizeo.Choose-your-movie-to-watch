import { Router } from "express"
import Movie from "../models/Movie.js"
import User from "../models/User.js"
import { Types } from "mongoose"

const router = Router()

// router.get('/', (req, res) => {
//   res.send('Hello from the server!');
// })

// Роут для добавления нового фильма
router.post("/add", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const {
      // id,
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

    // Проверка, существует ли фильм с таким kinopoiskId
    const existingMovie = await Movie.findOne({ kinopoiskId });
    if (existingMovie) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { films: existingMovie._id } },
        { new: true, upsert: false },
      );
      return res.status(200).json({ message: "Movie already exists in BD", user: updatedUser });
    }

    // if (!existingMovie) {
    const newMovie = new Movie({
      // id,
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
    // console.log(newMovie);
    
    await newMovie.save()
    // }
     const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $addToSet: { films: newMovie._id } },
          { new: true, upsert: false },
        );
        console.log('User updated:', updatedUser);

    res.status(201).json(newMovie)
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Роут для получения всех фильмов
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    // const movies = await Movie.find( 
    //   { isSeries: false }
    // )
    // Находим юзера по userId и получаем список его фильмов
    const user = await User.findById(userId).select("films");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Достаём фильмы по ID, которые есть у юзера
    const movies = await Movie.find({ _id: { $in: user.films }, isSeries: false });
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
router.delete("/delete/:_id", async (req, res) => {
  try {
    const { userId } = req.query;
    const { _id } = req.params
    // const objectId = mongoose.Types.ObjectId(_id);
    // if (!mongoose.Types.ObjectId.isValid(_id)) {
    //   return res.status(400).json({ error: "Invalid movie ID" });
    // }
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    console.log('Before update - userId:', userId);
    console.log('Before update - movieId:', _id);
    // console.log('Before update - objectId:', objectId);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { films: _id } }, // Удаляем фильм из массива
      { new: true }
    );
    console.log('User updated:', updatedUser);
    
    
    // const movie = await Movie.findOneAndDelete({ id })
    // if (!movie) {
    //   return res.status(404).json({ message: "Movie not found" })
    // }
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Movie deleted", user: updatedUser })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
