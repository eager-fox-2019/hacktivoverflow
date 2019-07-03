const router = require('express').Router()
const tagController = require('../controllers/tagController')

router.get('/all',tagController.findAll)
router.get('/one',tagController.findOne)
router.post('/add',tagController.create)
router.patch('/update',tagController.update)
router.delete('/delete',tagController.delete)

module.exports = router