import express from 'express'
import cors from 'cors'
import router from './router/router.js'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

if (!process.env.mongoUri) throw new Error('mongoUri не задан в .env')
if (!process.env.CLIENT_URL) throw new Error('CLIENT_URL не задан в .env')

const app = express()
const { urlencoded, json } = bodyParser

const PORT = process.env.PORT || 5000

const corsOptions = {
  origin: process.env.CLIENT_URL,
}

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

app.use(urlencoded({ extended: true }))
app.use(json())

app.use(cors(corsOptions))

app.use('/api', router)

const start = async () => {
  console.log(`[${new Date().toISOString()}] Connecting to database...`)
  try {
    await mongoose.connect(process.env.mongoUri, mongoOptions)
    console.log(`[${new Date().toISOString()}] DB connected`)
    app.listen(PORT, () => console.log(`[${new Date().toISOString()}] Server is running on port ${PORT}`))
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

start()
