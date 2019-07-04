const router= require('express').Router()
const questionController= require('../controllers/questionController')
const authentication =require('../middlewares/authentication')
const {authorizationQuestion} = require('../middlewares/authorization')

router.get('/', questionController.findAll)
router.get('/details/:id', questionController.findOne)
router.use(authentication)
router.get('/mypost', questionController.findMyPost)
router.post('/', questionController.create)
router.patch('/:id', authorizationQuestion, questionController.update)
router.patch('/upvotes/:id', questionController.updateUpvotes)
router.patch('/downvotes/:id', questionController.updateDownvotes)
router.delete('/:id', authorizationQuestion,questionController.remove)


module.exports= router