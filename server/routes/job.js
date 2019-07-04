const route = require('express').Router()
const { ControllerJob } = require('../controllers')

route.get('/', ControllerJob.find)

module.exports = route