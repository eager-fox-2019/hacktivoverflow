if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config();
}

const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const kue = require('kue')
const app = express()

const { errorHandler } = require('./middlewares/error-handlers')
const routeIndex = require('./routes')
const Port = process.env.PORT
const PortKue = process.env.PORT_KUE
const mongoDbUrl = process.env.DATABASE_CONNECTION

console.log('env used', process.env)
// connect mongodb
mongoose.connect(mongoDbUrl, { 
  useCreateIndex: true,
  useNewUrlParser: true
})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected");  
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', routeIndex)
app.use(errorHandler)

app.listen(Port, () => {
  console.log(`Listening to Port ${Port}`);
})

kue.app.listen(PortKue, () => {
  console.log(`Kue running on Port ${PortKue}`)
})

module.exports = app

