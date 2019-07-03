const express = require('express')
const route = express.Router()
const UserController = require('../controllers/userController')
const Authentication = require('../middlewares/authentication')


// Register
route.post('/register', UserController.register)

// Login
route.post('/login', UserController.login)


// Find All
route.get('/', UserController.findAll)

// Find One
route.get('/:id', UserController.findOne)

// Stay logged in
route.use(Authentication)
route.post('/token', UserController.token)

module.exports = route