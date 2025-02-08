import { Router } from "express"
import Movie from "../models/Movie.js"
import User from "../models/User.js"

console.log("Series routes file loaded");
const router = Router()

// Роут для добавления нового сериала
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
    
    // Проверка, существует ли сериал с таким kinopoiskId
        const existingSeries = await Movie.findOne({ kinopoiskId });
        if (existingSeries) {
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { films: existingSeries._id } },
            { new: true, upsert: false },
          );
          return res.status(200).json({ message: "Movie already exists in BD", user: updatedUser });
        }
    
    const newSeries = new Movie({
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
    await newSeries.save()

     const updatedUser = await User.findByIdAndUpdate(
              userId,
              { $addToSet: { films: newSeries._id } },
              { new: true, upsert: false },
            );
            console.log('User updated:', updatedUser);

    res.status(201).json(newSeries)
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Роут для получения всех сериалов
router.get("/", async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      // const series = await Movie.find({ isSeries: true })
      
      // Находим юзера по userId и получаем список его фильмов
       const user = await User.findById(userId).select("films");
      
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }

          // Достаём сериалы по ID, которые есть у юзера
              const series = await Movie.find({ _id: { $in: user.films }, isSeries: true });

      res.json(series)
    } catch (error) {
      res.status(500).json({ message: "Server error" })
    }
  })

  export default router