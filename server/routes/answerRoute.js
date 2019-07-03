const router = require('express').Router()
const answerController = require('../controllers/answerController')

router.get('/all',answerController.findAll)
router.get('/one',answerController.findOne)
router.post('/add',answerController.create)
router.patch('/update',answerController.update)
router.delete('/delete',answerController.delete)

module.exports = router