if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
const mongoose = require('mongoose')
const url = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/hacktivoverflow-' + process.env.NODE_ENV
const cron = require('cron')
const kue = require('kue')
const nodemailer = require('./middlewares/nodemailer')
const { User, Question, Answer } = require('./models')

mongoose.connect(url, { useNewUrlParser: true }, function (err) {
    if (err) console.log('Connection database failed');
    else console.log('Connection database success');
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const CronJob = cron.CronJob
const queue = kue.createQueue()
queue.setMaxListeners(1000)

const job = new CronJob('0 0 0 */1 * *', async function () {
    try {
        let users = await User.find()
        for (let i = 0; i < users.length; i++) {
            let question = await Question.find({ owner: users[i]._id })
            let answer = await Answer.find({ owner: users[i]._id })
            queue.create('sendmail', {
                email: users[i].email,
                teks: 'Your activity:\nYou have asked '+question.length+' time(s)\nYou have answered '+answer.length+' time(s)',
            }).save()
        }
    }
    catch (err) {
        console.log(err)
    }
}, null, true)

queue.process('sendmail', function (job, done) {
    setTimeout(function(){
        nodemailer(job.data.email, job.data.teks)
        .then(_ => {
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
        console.log(job.data.email)
    }, 2000)
});

app.use('/kue-app', kue.app)

app.listen(port, function () {
    console.log('Listening to port ' + port)
})

module.exports = app