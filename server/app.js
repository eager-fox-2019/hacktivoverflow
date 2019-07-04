require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

const mongoose = require('mongoose')
const URLMONGO = process.env.URLMONGO || 'mongodb://localhost:27017/HacktivOverflow'
mongoose.connect( `${URLMONGO}`, {useNewUrlParser: true})
.catch((err)=>{
    console.log(err)
})

const index = require('./router/index.js')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', index)

app.listen(port, ()=> {
    console.log(`Connected to port :${port}`)
})