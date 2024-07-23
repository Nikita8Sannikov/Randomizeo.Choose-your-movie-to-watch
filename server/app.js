import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import movieRoutes from './routes/movies.js'

const app = express()

app.use(express.json()); // Миддлвар для обработки JSON-тел запросов

// Использование роутов для обработки запросов по пути /api/movies
app.use('/api/movies', movieRoutes);



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



