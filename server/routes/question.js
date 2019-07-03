const express = require('express')
const router = express.Router()
const question = require('../controllers/question')
const authentication = require('../middlewares/authentication')

router.get('/', question.findAll)
router.get('/:id', question.findById)

router.use(authentication)

router.post('/', question.create)
router.patch('/:id', question.patch)
router.delete('/:id', question.delete)
router.patch('/upvotes/:id', question.upvotes)
router.patch('/downvotes/:id', question.downvotes)

module.exports = router