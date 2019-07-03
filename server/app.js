//Variable Declaration
if (process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes')
const errHandler = require('./helpers/errHandler')
const port = process.env.PORT || 3000;

//Initial middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Connect to MongoDB via mongoose
mongoose.connect(process.env.MONGO_HACKTIVOVERFLOW_URI, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//Cors, Router, Error Handling
app.use(cors())
app.use('/', router)
app.use(errHandler)

//Start thr app server
app.listen(port, console.log('App is starting on port:', port))