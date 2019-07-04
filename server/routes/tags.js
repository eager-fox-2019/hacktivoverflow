const routes = require('express').Router();
const TagController = require('../controllers/TagController')

routes.post('/', TagController.filter)
routes.post('/watchedtags', TagController.userTags)

module.exports = routes