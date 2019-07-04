const express = require('express')
const router = express.Router()
const question = require('../controllers/question')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorizationQ')

router.get('/', question.findAll)
router.get('/:id', question.findById)
router.get('/search/tags/:tag', question.tags)
router.get('/search/:input', question.search)

router.use(authentication)

router.get('/user/posts', question.findByUser)
router.post('/', question.create)
router.patch('/upvotes/:id', question.upvotes)
router.patch('/downvotes/:id', question.downvotes)
router.patch('/:id', authorization, question.patch)
router.delete('/:id', authorization, question.delete)

module.exports = router