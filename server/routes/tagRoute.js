const Route = require('express').Router()
const TagController = require('../controllers/tagController')

Route.get('/', TagController.read)
Route.post('/', TagController.create)

module.exports = Route