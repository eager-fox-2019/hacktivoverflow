const express = require('express')
const router = express.Router()
const answer = require('../controllers/answer')
const authentication = require('../middlewares/authentication')


router.get('/', answer.findAll)
router.get('/:id', answer.findById)

router.use(authentication)

router.post('/', answer.create)
router.patch('/:id', answer.patch)
router.patch('/upvotes/:id', answer.upvotes)
router.patch('/downvotes/:id', answer.downvotes)
// router.delete('/:id', answer.delete)

module.exports = router