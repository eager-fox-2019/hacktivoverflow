if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const cron = require('node-cron')
const express = require('express')
const app = express() 
const cors = require('cors')
const userRoute = require('./routes/user.routes')
const questionRoute = require('./routes/question.route')
const answerRoute = require('./routes/answer.route')

const errorMiddleware = require('./middleware/error.middleware')
const mongoConnect = require('./helpers/mongoose.connect.helper')
const PORT = process.env.PORT || 3000

mongoConnect()

let job = cron.schedule('* * * * *', () => {
  console.log('stoped job');
});

job.start()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/user', userRoute)
app.use('/question', questionRoute)
app.use('/answer', answerRoute)
app.use(errorMiddleware)

app.listen(PORT, () => {console.log('App jalan di:', PORT)})
module.exports = app