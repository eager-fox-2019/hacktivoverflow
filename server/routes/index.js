const router= require('express').Router()
const userRoute= require('../routes/user')
const questionRoute= require('../routes/question')
const answerRoute= require('../routes/answer')

router('/users', userRoute)
router('/questions', questionRoute)
router('/answers', answerRoute)

export default router