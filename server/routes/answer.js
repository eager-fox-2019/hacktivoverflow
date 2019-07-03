const router = require('express').Router()
const Answers = require('../controllers/answer')
const { auth } = require('../middlewares/access')

router.get('/:aid', Answers.listById)

router.use(auth)
router.post('/:qid', Answers.create)
router.post('/upvotes/:aid', Answers.upvote)
router.post('/downvotes/:aid', Answers.downvote)

module.exports = router