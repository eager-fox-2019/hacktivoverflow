const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/UserController')
const Authentication = require('../middlewares/authenticate')

routes.get('/userLoggedIn', Authentication, UserController.findOne)
routes.patch('/tags/:type', Authentication, UserController.updateTags)

module.exports = routes