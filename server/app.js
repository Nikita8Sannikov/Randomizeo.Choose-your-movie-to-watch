import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import movieRoutes from './routes/movie.js'
import watchedMovieRoutes from './routes/watchedMovies.js'
import seriesRoutes from './routes/series.js'
import watchedSeriesRoutes from './routes/watchedSeries.js'
import authRoutes from './routes/auth.js'
import finalConfig from './config/index.js'
import cors from "cors";

const app = express()

app.use(cors()); // Включает CORS для всех запросов
app.use(express.json()); // Миддлвар для обработки JSON-тел запросов
app.use(express.urlencoded({ extended: true })); // Миддлвар для обработки URL-кодированных запросов
app.use(cookieParser()); //Мидлвар cookie-parser разбирает cookies и делает их доступными через req.cookies

// Использование роутов для обработки запросов по пути /api/movies
app.use('/api/movies', movieRoutes);
// Использование роутов для обработки запросов по пути /api/watched-movies
app.use('/api/watched-movies', watchedMovieRoutes);
// // Использование роутов для обработки запросов по пути /api/movies/series
app.use('/api/movies/series', seriesRoutes);
// // Использование роутов для обработки запросов по пути /api/watched-movies
app.use('/api/watched-movies/series', watchedSeriesRoutes);
// Использование роутов для обработки запросов по пути /api/auth
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000

async function start() {
    try{
        await mongoose.connect(finalConfig.mongoUri, {
        })
        console.log("Connected to MongoDB!");
        console.log("process.env.PORT:", process.env.PORT);
        console.log("finalConfig.port:", finalConfig.port);
        console.log("Using PORT:", PORT);
        
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    }catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()



