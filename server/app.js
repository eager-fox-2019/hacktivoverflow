require('dotenv').config()

const express = require("express")
const app = express()
const cors = require('cors')
const port = 3000
const route = require('./routes/index')
const mongoose = require('mongoose')
const nodeMailer = require('./helpers/nodeMailer')
const errorhandler = require('./middlewares/errorHandler')

mongoose.connect('mongodb+srv://admin:admin@cluster0-efobx.gcp.mongodb.net/tanya-aja?retryWrites=true&w=majority',{ useNewUrlParser: true } );
// mongoose.connect('mongodb://localhost/tanyaAja',{useNewUrlParser : true})

// var CronJob = require('cron').CronJob;
// new CronJob('0 9 1,15 * *', function() {
//   console.log('You will see this message every second');
// }, null, true, 'America/Los_Angeles');

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/',route)
app.use(errorhandler)

app.listen(port, ()=>{
    console.log(`listening to port: ${port}`);
})