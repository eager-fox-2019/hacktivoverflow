const express = require('express')
const router = express.Router()
const answer = require('../controllers/answer')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorizationA')


router.get('/', answer.findAll)
router.get('/:id', answer.findById)

router.use(authentication)

router.post('/', answer.create)
router.patch('/upvotes/:id', answer.upvotes)
router.patch('/downvotes/:id', answer.downvotes)
router.patch('/:id', authorization, answer.patch)
// router.delete('/:id', answer.delete)

module.exports = router