if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const kue = require('kue')
const cron = require('node-cron')
const mongoConnect = require('./helpers/mongoose.connect.helper')
const cariDiGoogle = require('./get.from.google')
const Question = require('./models/question')

mongoConnect()

const queue = kue.createQueue({
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
  }
})

let job = cron.schedule('*/5 * * * *', async () => {
  let questions = await Question.find({ botAnswerLink: null, botAnswerTitle: null }).exec()
  console.log('etst', questions.length)
  if (questions.length > 0) {
    questions.forEach(question => {
      queue.create('cariinJawabanDigoogle', {
        judul: question.title,
        id: question._id
      }).save()
    })
  }
})
job.start()

queue.process('cariinJawabanDigoogle', async function (job, done) {
  try {
    console.log('do tugas carijawabagkegoogle')
    let question = await Question.findOne({_id: job.data.id}).exec()
    let { judul, link } = await cariDiGoogle(job.data.judul)
    console.log({judul, link})
    question.botAnswerTitle = judul
    question.botAnswerLink = link
    await question.save()
    done()
  } catch (err) {
    console.log('do tugas carijawabagkegoogle gagal')
    done(new Error('nggak jalan'))
  }
})