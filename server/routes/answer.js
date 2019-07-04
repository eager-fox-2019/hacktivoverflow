const route = require('express').Router()
const { ControllerAnswer } = require('../controllers')
const { authenticate } = require('../middlewares/auth')


route.post('/:questionId', authenticate, ControllerAnswer.create)
route.get('/', ControllerAnswer.findAll)
route.get('/:id', ControllerAnswer.findOne)
route.put('/:id', ControllerAnswer.update)
route.delete('/:questionId', ControllerAnswer.delete)
route.post('/upVotes/:id',authenticate,ControllerAnswer.upVote)
route.post('/downVotes/:id',authenticate,ControllerAnswer.downVote)

route.use('/*', (req, res) => res.status(404).json({error: 'Not Found :('}))

module.exports = route