import { Router } from "express"
// import WatchedMovie  from "../models/WatchedMovie.js"
import Movie  from "../models/Movie.js"
import UserMovies from "../models/UserMovies.js"

const router = Router()

// Роут для добавления нового сериала
router.post("/add", async (req, res) => {
  try {
    const userId = req.userId;

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
    let series = await Movie.findOne({ kinopoiskId });

        if (!series) {
          return res.status(404).json({ error: "Movie not found in the database" });
        }

      const userMovie = await UserMovies.findOne({
              userId,
              movieId:  series._id ,
            });
            console.log(userMovie);
  
      if (!userMovie) {
        return res.status(404).json({ error: "Movie not found in user's list" });
      }

      userMovie.isWatched = true;
      await userMovie.save();
  
      res.status(201).json(series)
    // const newWatchedSeries= new WatchedMovie({
    //   id,
    //   title,
    //   img,
    //   shortDescription,
    //   description,
    //   year,
    //   genres,
    //   rating,
    //   movieLength,
    //   kinopoiskId,
    //   isSeries,
    // })
    // await newWatchedSeries.save()
    // res.status(201).json(newWatchedSeries)
  } catch (error) {
    console.error('Error adding series:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Роут для получения всех сериалов
router.get("/", async (req, res) => {
    // try {
    //   const series = await WatchedMovie.find({ isSeries: true })
    //   res.json(series)
    // } catch (error) {
    //   res.status(500).json({ message: "Server error" })
    // }
    try {
      const userId = req.userId;
 const series = await UserMovies.find({
      userId,
      isWatched: true,
      isSeries: true,
      // inMainList: true
    }).populate("movieId").lean();

    const modifiedSeries = series.map(({ movieId, ...rest }) => ({
      ...rest,
      ...movieId,
    }))

    res.json(modifiedSeries)
  } catch (error) {
    console.error("Ошибка в /wathced series:", error);
    res.status(500).json({ message: "Server error" })
  }
  })
  
  export default router
