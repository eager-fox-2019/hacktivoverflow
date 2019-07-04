const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userCon')

Router.post('/signup', userController.signUp)
Router.post('/signin', userController.signIn)
Router.get('/id/:id', userController.findId)

module.exports = Router;