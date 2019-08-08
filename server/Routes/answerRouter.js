const express = require('express')
const router = express.Router()
const answerController = require('../Controllers/answerController')

router.get('/showAll', answerController.findAll)
router.post('/create', answerController.create)

module.exports = router