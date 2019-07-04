const route = require('express').Router()
const { ControllerUser } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

route.post('/register', ControllerUser.create)
route.post('/login', ControllerUser.login)
route.get('/', authenticate, ControllerUser.findOne)
route.put('/', authenticate, ControllerUser.update)



module.exports = route