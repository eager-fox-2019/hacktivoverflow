const express = require('express');
const routes = express.Router();
const users = require('./users')
const questions = require('./questions')
const answers = require('./answers')
const UserController = require('../controllers/UserController')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)

routes.use('/users', users)
routes.use('/questions', questions)
routes.use('/answers', answers)

routes.get('*', (req,res) => {
    res.status(404).json('Page not found')
})

module.exports = routes