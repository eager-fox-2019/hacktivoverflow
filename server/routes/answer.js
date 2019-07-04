const router= require('express').Router()
const answerController= require('../controllers/answerController')
const authentication = require('../middlewares/authentication')
const {authorizationAnswer} = require('../middlewares/authorization')

router.get('/:questionId', answerController.findAll)
router.use(authentication)
router.get('/details/:id', answerController.findOne)
router.post('/', answerController.create)
router.patch('/:id', authorizationAnswer, answerController.update)
router.patch('/upvotes/:id', answerController.updateUpvotes)
router.patch('/downvotes/:id', answerController.updateDownvotes)
router.delete('/:id', authorizationAnswer, answerController.remove)


module.exports= router