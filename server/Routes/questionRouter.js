const express = require('express')
const router = express.Router()
const questionController = require('../Controllers/questionController')
const {Authorization} = require('../Middleware/auth')

router.get('/showAll', questionController.showAll)
router.post('/create', questionController.create)
router.post('/answer/:idQuestion', questionController.generateAnswer)
router.get('/getOne/:Qid', questionController.findOne)

router.patch('/upvote/:Qid', questionController.Qupvote)
router.patch('/downvote/:Qid', questionController.Qdownvote)

router.patch('/editQuestion/:Qid/:userId', Authorization, questionController.Qedit)
router.delete('/delete/:Qid/:userId', Authorization, questionController.Qdelete)

module.exports = router