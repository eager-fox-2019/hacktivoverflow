const router= require('express').Router()
const answerController= require('../controllers/answerController')

router.get('/:questionId', answerController.findAll)
router.get('/details/:id', answerController.findOne)
router.post('/', answerController.create)
router.patch('/:id', answerController.update)
router.patch('/upvotes/:id', answerController.updateUpvotes)
router.patch('/downvotes/:id', answerController.updateDownvotes)
router.delete('/:id', answerController.remove)


export default router