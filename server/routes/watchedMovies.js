import { Router } from "express"
import Movie  from "../models/Movie.js"
import UserMovies from "../models/UserMovies.js"

const router = Router()

// Роут для добавления нового фильма
router.post("/add", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

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

  // Проверка, существует ли фильм с таким kinopoiskId
    let movie = await Movie.findOne({ kinopoiskId });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found in the database" });
    }
       const userMovie = await UserMovies.findOne({
            userId,
            movieId:  movie._id ,
          });
          console.log(userMovie);

    if (!userMovie) {
      return res.status(404).json({ error: "Movie not found in user's list" });
    }

    userMovie.isWatched = true;
    await userMovie.save();

    res.status(201).json(movie)

  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Роут для получения всех фильмов
router.get("/", async (req, res) => {
  // try {
  //   const movies = await WatchedMovie.find({ isSeries: false })
  //   res.json(movies)
  // } catch (error) {
  //   res.status(500).json({ message: "Server error" })
  // }
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    // const movies = await Movie.find( 
    //   { isSeries: false }
    // )
    const movies = await UserMovies.find({
      userId,
      isWatched: true,
      isSeries: false,
      // inMainList: false
    }).populate("movieId").lean(); // Подгружаем инфу о фильме

    const modifiedMovies = movies.map(({ movieId, ...rest }) => ({
      ...rest,
      ...movieId,
    }))
    /**
    // Находим юзера по userId и получаем список его фильмов
    const user = await User.findById(userId).select("films");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Достаём фильмы по ID, которые есть у юзера
    const movies = await Movie.find({ _id: { $in: user.films }, isSeries: false });
    console.log(movies);
    **/
    // console.log(movies);
    res.json(modifiedMovies)
  } catch (error) {
    console.error("Ошибка в /movies:", error);
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
router.delete("/delete/:_id", async (req, res) => {
  try {
    const { userId } = req.query;
    const { _id } = req.params
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    //  const userMovie = await UserMovies.findOneAndDelete({
    //       userId,
    //       movieId: _id ,
    //     });
    // const movie = await WatchedMovie.findOneAndDelete({ id })
    // if (!movie) {
    //   return res.status(404).json({ message: "Movie not found" })
    // }

    const userMovie = await UserMovies.findOne({
          userId,
          movieId: _id ,
        });
    console.log(userMovie);
    
        if (!userMovie) {
          return res.status(404).json({ error: "Movie not found in user's list" });
        }
    
        userMovie.isWatched = false;
        console.log(userMovie.isWatched);
        
        await userMovie.save();

        if(!userMovie.isWatched && !userMovie.inMainList){
          await UserMovies.deleteOne({ _id: userMovie._id });
       
        const isNoOneUserHasMovie = await UserMovies.exists({
          movieId: _id ,
        });
        console.log('NoOneUser- watched',isNoOneUserHasMovie);
        if(!isNoOneUserHasMovie){
           await Movie.deleteOne({ _id: userMovie.movieId });
        }
       
        return res.status(200).json({ message: "Movie removed from user's list" });
      }    

       

    res.json({ message: "Movie deleted", userMovie })
  } catch (error) {
    console.error("Ошибка в /del:", error);
    res.status(500).json({ message: "Server error" })
  }
})

export default router
