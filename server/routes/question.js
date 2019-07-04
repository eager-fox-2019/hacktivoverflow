const route = require('express').Router()
const { ControllerQuestion } = require('../controllers')
const { authenticate } = require('../middlewares/auth')
const { authorize } = require('../middlewares/auth')

route.post('/', authenticate, ControllerQuestion.create)
route.get('/', authenticate, ControllerQuestion.findAll)
route.post('/tag', authenticate, ControllerQuestion.findByTag)
route.get('/:id', authenticate, ControllerQuestion.findOne)
route.put('/:id', authenticate, authorize, ControllerQuestion.update)
route.delete('/:id', authenticate, authorize, ControllerQuestion.delete)
route.post('/upVotes/:id', authenticate, ControllerQuestion.upVote)
route.post('/downVotes/:id', authenticate, ControllerQuestion.downVote)

route.use('/*', (req, res) => res.status(404).json({error: 'Not Found :('}))

module.exports = route