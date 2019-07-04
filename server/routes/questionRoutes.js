const route = require('express').Router()
const questionController = require('../controller/question')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.use(authentication)
route.get('/',questionController.findAll)
route.get('/:id', questionController.findByPk)
route.get('/mypost', questionController.mypost)
route.post('/create',questionController.create)
route.patch('/like/:QuestionId', questionController.likeVote)
route.patch('/dislike/:QuestionId', questionController.dislikeVote)
// route.delete('/:id',authorization,questionController.delete)
    
module.exports = route


