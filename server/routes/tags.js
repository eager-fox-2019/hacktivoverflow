const routes = require('express').Router();
const TagController = require('../controllers/TagController')

routes.post('/', TagController.filter)

module.exports = routes