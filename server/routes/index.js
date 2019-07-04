const router = require('express').Router()
const userController = require('../controllers/userController.js')
const images = require('../helpers/images.js')
const axios = require('axios')

router.use('/users', require('./userRoutes.js'))
router.use('/questions', require('./questionRoutes.js'))
router.post('/signin', userController.signin)
router.post('/register', userController.register)
router.get('/gitjobs/:job', (req, res, next) => {
    axios({
        url: `https://jobs.github.com/positions.json?description=${req.params.job}&location=new+york`,
        method: "GET"
    }).then(({
        data
    }) => {
        res.json(data)
    }).catch(next)
})
router.post('/upload',
    images.multer.single('image'),
    images.sendUploadToGCS,
    (req, res) => {
        res.send({
            status: 200,
            message: 'Your file is successfully uploaded',
            link: req.file.cloudStoragePublicUrl
        })
    })

module.exports = router