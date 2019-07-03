require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const routes = require('./routes')
const mongoose = require('mongoose');
const cors = require('cors')
const kue = require('kue')

mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGODB_CONNECTION, {useNewUrlParser: true})
.then(function(success){
    console.log("succesfully connect to database")
})
.catch(function(err){
    console.log(err)
});

app.use('/public',express.static('./public'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})

kue.app.listen(3001, () => {
    console.log(`Running on http://localhost:3001`)
})