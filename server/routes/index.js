const route = require('express').Router()
const { authenticate } = require('../middlewares/auth')
const user = require('./user')
const question = require('./question')
const answer = require('./answer')
const job = require('./job')

route.get('/', (req, res) => {res.status(200).json({message: 'Connect'})})
route.get('/authenticate',authenticate,(req,res)=>{ res.status(200).json({}) })

route.use('/users', user)
route.use('/questions',question)
route.use('/answers',answer)
route.use('/jobs',job)

route.use('/*', (req, res) => res.status(404).json({error: 'Not Found :('}))

module.exports = route