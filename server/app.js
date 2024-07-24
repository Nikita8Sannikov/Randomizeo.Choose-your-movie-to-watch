import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import movieRoutes from './routes/movie.js'
import watchedMovieRoutes from './routes/watchedMovies.js'

const app = express()

app.use(express.json()); // Миддлвар для обработки JSON-тел запросов

// Использование роутов для обработки запросов по пути /api/movies
app.use('/api/movies', movieRoutes);
// Использование роутов для обработки запросов по пути /api/watched-movies
app.use('/api/watched-movies', watchedMovieRoutes);

const PORT = config.get('port') || 5000

async function start() {
    try{
        await mongoose.connect(config.get('mongoUri'), {
        })
        app.listen(5000, () => console.log(`App has been started on port ${PORT}...`))
    }catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()



