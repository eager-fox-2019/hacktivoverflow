require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorhandler');

// mongoose.connect(`mongodb://localhost/overflow2`, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// })
mongoose.connect(process.env.ATLAS_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => {
    app.emit('dbConnect')
    console.log('MongoDB connected')
  })
  .catch(err => console.log('MongoDB cannot connect'))

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use("/", routes);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));