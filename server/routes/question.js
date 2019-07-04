const router = require('express').Router()
const Questions = require('../controllers/question')
const { auth } = require('../middlewares/access')

router.get('/', Questions.listAll)

router.use(auth)
router.post('/', Questions.create)
router.post('/upvotes/:qid', Questions.upvote)
router.post('/downvotes/:qid', Questions.downvote)
router.put('/:qid', Questions.update)
router.delete('/:qid', Questions.delete)

module.exports = router