import express from 'express'
import cors from 'cors'
import router from './router/router.js'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

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
  console.log('Connecting to database...')
  try {
    mongoose.connect(process.env.mongoUri, mongoOptions)
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  } catch (e) {
    console.error(e)
  }
}

start()
