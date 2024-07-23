import express from 'express'
import mongoose from 'mongoose'
import config from 'config'

const app = express()

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



