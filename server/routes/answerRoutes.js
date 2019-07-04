const route = require('express').Router()
const answerController = require('../controller/answer')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

// route.use(authentication)
route.get('/',answerController.findAll)
route.get('/:id', answerController.findByPk)
route.post('/create',answerController.create)
// route.delete('/:id',authorization,answerController.delete)
// route.put('/:id',authorization, answerController.update)
    
module.exports = route


