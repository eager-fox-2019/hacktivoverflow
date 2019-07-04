const router = require('express').Router()
const questionRoute = require('./question')
const answerRoute = require('./answer')
const userController = require('../controllers/user')
const axios = require('axios')

router.use('/questions',questionRoute)
router.use('/answers',answerRoute)

router.post('/login',userController.login)
router.post('/register',userController.register)
router.patch('/users/:userId/watchTag',userController.updateWatchTag)
router.get('/api', function(req,res,next){
    axios({
        method : 'get',
        url : 'https://jobs.github.com/positions.json?description=software+engineer'
    })
    .then(({data})=>{
        console.log(data);
        res.status(200).json(data)
    })
    .catch(next)
})

module.exports = router