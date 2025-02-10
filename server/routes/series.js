import { Router } from "express"
import Movie from "../models/Movie.js"
import UserMovies from "../models/UserMovies.js"

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
        let series = await Movie.findOne({ kinopoiskId });
        if (!series) {
           series = new Movie({
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

          await series.save()
        }
       // Создаем запись в UserMovies, если ее еще нет
         const userMovie = await UserMovies.findOne({
                userId,
                movieId:  series._id ,
              });
              console.log(userMovie);
    
    if (!userMovie) {
        const newEntry = await UserMovies.create({
          userId,
          movieId: series._id,
          isWatched: false,
          isSeries: series.isSeries,
          inMainList: true,
        });
            console.log('User updated:', newEntry);
          }
    
    
   

   

    res.status(201).json(series)
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

const series = await UserMovies.find({
      userId,
      isWatched: false,
      isSeries: true,
      inMainList: true
    }).populate("movieId").lean(); // Подгружаем инфу о сериале

    const modifiedSeries = series.map(({ movieId, ...rest }) => ({
      ...rest,
      ...movieId,
    }))

      /**
      // Находим юзера по userId и получаем список его фильмов
       const user = await User.findById(userId).select("films");
      
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }

          // Достаём сериалы по ID, которые есть у юзера
              const series = await Movie.find({ _id: { $in: user.films }, isSeries: true });
**/
      res.json(modifiedSeries)
    } catch (error) {
      console.error("Ошибка в /movies:", error);
      res.status(500).json({ message: "Server error" })
    }
  })

  export default router