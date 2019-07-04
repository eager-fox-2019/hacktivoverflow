const routes = require('express').Router();
const JobController = require('../controllers/JobController')

routes.post('/', JobController.create)

module.exports = routes