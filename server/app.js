require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// const routes = require('./routes/');
const errorHandler = require('./middleware/errorhandler')

// local mongodb connection
// mongoose.connect(`mongodb://localhost/ecom-${process.env.NODE_ENV}`, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// })
//   .then(() => {
//     app.emit('dbConnect')
//     console.log('MongoDB connected')
//   })
//   .catch(err => console.log('MongoDB cannot connect'))

// atlas connection
// mongoose.connect(process.env.ATLAS_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
// })
  
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// aws test
app.get('/', (req, res, next) => {
  res.json({msg: 'This is max'})
})
// app.use('/', routes)
app.use(errorHandler);
  
const PORT = 3000;
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })

module.exports = app;