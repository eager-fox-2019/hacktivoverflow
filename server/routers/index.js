const router = require('express').Router()

//routers
const questionRouter = require('./questionRouter')
const answerRouter = require('./answerRouter')

//controllers
const userController = require('../controller/userController')

//middlewares
const authentication = require('../middleware/authentication')


// router.get('/', (req,res)=>{
//     res.send('hello')
// })
router.post('/signin', userController.signin)
router.post('/signup', userController.signup)


router.use('/questions', questionRouter)
router.use('/answers', answerRouter)

router.use(authentication)
router.use('/authentication', userController.authentication)
router.patch('/users/updateTags', userController.update)


module.exports = router

