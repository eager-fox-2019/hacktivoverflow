if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
  const router = require('./routes')
//   const { errHandler } = require('./middleware/errHandler')

const port = process.env.PORT
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
    useNewUrlParser: true
}, (err) => {
    if (err) console.log(err), console.log('Connection Error. ');
    else console.log('Success connect to mongoose. ')
})

app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

  app.use('/', router)

//   app.use(errHandler)

app.listen(port, () => {
    console.log('Connection Success !!!')
})