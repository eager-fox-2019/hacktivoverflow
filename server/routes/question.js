const router= require('express').Router()
const questionController= require('../controllers/questionController')

router.get('/', questionController.findAll)
router.get('/details/:id', questionController.findOne)
router.post('/', questionController.create)
router.patch('/:id', questionController.update)
router.patch('/upvotes/:id', questionController.updateUpvotes)
router.patch('/downvotes/:id', questionController.updateDownvotes)
router.delete('/:id', questionController.remove)


export default router