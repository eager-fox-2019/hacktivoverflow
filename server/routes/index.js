const express = require('express');
const route = express.Router();
const questionRoutes = require('./questionRoutes')
const answerRoutes = require('./answerRoutes')
const userRoutes = require('./userRoutes')
route.use('/question', questionRoutes)
route.use('/user',userRoutes)
route.use('/answer',answerRoutes)


module.exports = route