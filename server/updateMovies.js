import mongoose from 'mongoose'
import config from 'config'
import Movie from './models/Movie.js'
import WatchedMovie from './models/WatchedMovie.js'

mongoose.connect(config.get('mongoUri'), {
})
.then(async () => {
    console.log('Connected to database');
 
    // Обновление коллекции Movie
    await Movie.updateMany(
        {
            // Условие для фильтрации документов без поля
            $or: [
                { movieLength: { $exists: false } },
                { kinopoiskId: { $exists: false } },
                { isSeries: { $exists: false } }
            ]
        },
        {
            // Установка дефолтного значения
            $set: {
                movieLength: '',
                kinopoiskId: null,
                isSeries: false
            }
        }
    );

    console.log('Movie collection updated')

    // Обновление коллекции WatchedMovie
    await WatchedMovie.updateMany(
        {
            // Условие для фильтрации документов без поля
            $or: [
                { movieLength: { $exists: false } },
                { kinopoiskId: { $exists: false } },
                { isSeries: { $exists: false } }
            ]
        },
        {
            // Установка дефолтного значения
            $set: {
                movieLength: '',
                kinopoiskId: null,
                isSeries: false
            }
        }
    );

    console.log('WatchedMovie collection updated')

    mongoose.connection.close()
})
.catch(err => {
    console.error('Database connection error', err)
});