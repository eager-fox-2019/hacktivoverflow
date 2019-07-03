const route = require('express').Router();
const userRoute = require('./user');

route.use('/users', userRoute);

module.exports = route; 