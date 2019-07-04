const router = require('express').Router()
const questionController = require('../controllers/question')
const authenticate = require('../middlewares/authentication')
const authorize = require('../middlewares/authorizeQuestion')
router.get('/',questionController.getAll)

router.use(authenticate)
router.post('/',questionController.create)
router.get('/:questionId', questionController.getOne)
router.get('/profile/:userId',questionController.getUserQuestion)
router.patch('/:questionId', authorize, questionController.update)
router.patch('/:questionId/upvote',questionController.upvote)
router.patch('/:questionId/downvote',questionController.downvote)
router.delete('/:questionId', authorize,questionController.delete)

module.exports = router