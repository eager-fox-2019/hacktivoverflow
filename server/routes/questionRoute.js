const router = require('express').Router()
const questionController = require('../controllers/questionController')

router.get('/all', questionController.findAll)
router.get('/one', questionController.findOne)
router.post('/add', questionController.create)
router.patch('/update', questionController.update)
router.delete('/delete', questionController.delete)

module.exports = router