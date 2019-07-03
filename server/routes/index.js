const route = require('express').Router();
const userRoute = require('./user');
const questionRoute = require('./question');
const answerRoute = require('./answer');

route.use('/users', userRoute);
route.use('/questions', questionRoute);
route.use('/answers', answerRoute);

module.exports = route;