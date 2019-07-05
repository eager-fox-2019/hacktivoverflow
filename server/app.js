require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const mongoose = require('mongoose')
// const url = `mongodb://localhost/Eager-HacktivOverflow`
const url = `mongodb+srv://admin:${process.env.ATLAS_PASSWORD}@cluster0-cqqwo.mongodb.net/test?retryWrites=true&w=majority`
const myRoute = require('./routes/index')
const errHandling = require('./middlewares/errHandling')
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', myRoute)
app.use(errHandling)

new CronJob('0 11 */5 */1 *', function() {
    console.log('You will see this message every friday')
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth: {
            user: 'eagerfoxhacktiv8demo@gmail.com',
            pass: 'bethebesteager'
        }
    });
    let mailOptions = {
        from: '"stackoverflow" eagerfoxhacktiv8demo@gmail.com', // sender address
        to: `adit.netral@gmail.com`, // list of receivers
        subject: 'cronjob', // Subject line
        text: `reminder`, // plain text body
        html: `<h1>Happy Friday :) 
        Planningnya random job, cuman blum dapet api random job nya</h1>` // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    })
    }, null, true, 'America/Los_Angeles');

mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (err) console.log('Database not connect!')
    else console.log(`Database connected`)
})

app.listen(port, () => {
    console.log(`server running at port ` + port)
})