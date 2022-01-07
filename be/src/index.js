require('dotenv').config()
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const router = require('./routes')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/error')

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(helmet())

// set static folders
app.use(express.static(path.join(__dirname, 'public')))

// logger
app.use(logger)

// mount routes
router(app)

// handle errors
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`> Server online on ${PORT}`)

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
    .then(() => console.log("> DB connected"))
    .catch(err => {
      console.log('DB connection failed. Exiting now...\n', err)
      process.exit()
    })
})