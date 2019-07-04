require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const url = process.env.DATABASE_URL || 'mongodb://localhost/hacktiv-overflow'
const port = process.env.PORT || 3000
const routes = require('./routes')
const error = require('./middlewares/error')

mongoose.connect(url, {
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => { 
    console.log(err) 
  })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use("/", routes)
app.use(error)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

module.exports = app
