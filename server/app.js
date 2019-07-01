if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const index = require('./routers/index.js')
const cors = require('cors')
const mongoose = require('mongoose')
const error = require('./helpers/error')
const kue = require('kue')
const kue_app = require('./middlewares/kue_app')
const CronJob = require('cron').CronJob
let url
if (process.env.NODE_ENV === 'test') {
  url = process.env.DATABASE_URL_TEST
} else if (process.env.NODE_ENV === 'development') {
  url = process.env.DATABASE_URL_DEV
} else {
  url = process.env.DATABASE_URL_PROD
}

mongoose.connect(url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(err => {
    console.log(err)
  })

app.use(cors())

app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())

const job = new CronJob('0 0 6 1 */1 *', function() {
  kue_app()
});
job.start();

app.use('/', index)
app.use(error)

app.listen(port, () => {
  console.log('listening to port', port)
})

kue.app.listen(3001, () => {
  console.log('listening to port', 3001)
})
// module.exports = app