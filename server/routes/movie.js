import { Router } from "express"
import Movie from "../models/Movie.js"
import UserMovies from "../models/UserMovies.js"
import { Types } from "mongoose"

const router = Router()

// router.get('/', (req, res) => {
//   res.send('Hello from the server!');
// })

// Роут для добавления нового фильма
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
    let movie = await Movie.findOne({ kinopoiskId });
    
    if (!movie) {
   movie = new Movie({
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
    
    await movie.save()
    }
    //  const updatedUser = await User.findByIdAndUpdate(
    //       userId,
    //       { $addToSet: { films: newMovie._id } },
    //       { new: true, upsert: false },
    //     );

       // Создаем запись в UserMovies, если ее еще нет
       const userMovie = await UserMovies.findOne({
        userId,
        movieId:  movie._id ,
      });
      // console.log(userMovie);

      if(userMovie){
        userMovie.inMainList = true;
        await userMovie.save();
      }
      

      if (!userMovie) {
    const newEntry = await UserMovies.create({
      userId,
      movieId: movie._id,
      isWatched: false,
      isSeries: movie.isSeries,
      inMainList: true,
    });
        console.log('User updated:', newEntry);
      }



        // if (existingMovie) {
      
        //   // const updatedUser = await User.findByIdAndUpdate(
        //   //   userId,
        //   //   { $addToSet: { films: existingMovie._id } },
        //   //   { new: true, upsert: false },
        //   // );
        //    const newEntry = await UserMovies.create({
        //   userId,
        //   movieId: existingMovie._id,
        //   isWatched: false,
        //   isSeries: existingMovie.isSeries,
        //   inMainList: true,
        // });
        //   return res.status(200).json({ message: "Movie already exists in BD", user: newEntry });
        // }

    res.status(201).json(movie)
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Роут для получения всех фильмов
router.get("/", async (req, res) => {
  try {
    const userId = req.userId;
    // const movies = await Movie.find( 
    //   { isSeries: false }
    // )
    const movies = await UserMovies.find({
      userId,
      // isWatched: false,
      isSeries: false,
      inMainList: true
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

// Роут для обновления постера фильма по kinopoiskId (ленивая перезагрузка)
router.post("/refresh-poster/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    if (!movie.kinopoiskId) {
      return res.status(400).json({ error: "Movie has no kinopoiskId" });
    }

    const kpResponse = await fetch(
      `http://localhost:5000/api/kinopoisk/movie/${movie.kinopoiskId}`
    );

    if (!kpResponse.ok) {
      return res
        .status(kpResponse.status)
        .json({ error: "Kinopoisk API error" });
    }

    const data = await kpResponse.json();
    const newPosterUrl = data?.poster?.previewUrl;

    if (!newPosterUrl) {
      return res.status(400).json({ error: "No poster in Kinopoisk data" });
    }

    movie.img = newPosterUrl;
    await movie.save();

    res.json({ img: newPosterUrl });
  } catch (error) {
    console.error("Error in /refresh-poster:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

// Роут для удаления фильма
router.delete("/delete/:_id", async (req, res) => {
  try {
    const userId = req.userId;
    const { _id } = req.params;
    // console.log('Before update - userId:', userId);
    // console.log('Before update - movieId:', _id);
    // console.log('Before update - objectId:', objectId);

    const userMovie = await UserMovies.findOne({
      userId,
      movieId: _id ,
    });

    if (!userMovie) {
      return res.status(404).json({ error: "Movie not found in user's list" });
    }

    userMovie.inMainList = false;
    await userMovie.save();
    // const updatedUser = await User.findByIdAndUpdate(
    //   userId,
    //   { $pull: { films: _id } }, // Удаляем фильм из массива
    //   { new: true }
    // );
    // console.log('User updated:', updatedUser);

    
    
    // const movie = await Movie.findOneAndDelete({ id })
    // if (!movie) {
    //   return res.status(404).json({ message: "Movie not found" })
    // }
    // if (!updatedUser) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    if(!userMovie.isWatched && !userMovie.inMainList){
      await UserMovies.deleteOne({ _id: userMovie._id });
    
    const isNoOneUserHasMovie = await UserMovies.exists({movieId: _id });
    console.log('NoOneUser - movie',isNoOneUserHasMovie);

    if(!isNoOneUserHasMovie){
       await Movie.deleteOne({ _id: userMovie.movieId });
       console.log("Movie deleted from movies collection");
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
