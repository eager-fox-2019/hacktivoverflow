const router = require('express').Router()
const aController = require('../controllers/answer.controller')
const authMiddlware = require('../middleware/token.middleware')

router.post('/', authMiddlware, aController.postAnswer)

module.exports = router