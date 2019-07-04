require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = 3000 || process.env.PORT
const routes = require('./routes')
const axios = require("axios");
const http = require('http').Server(app)
const io = require("socket.io")(http)
const cron = require("node-cron")
const _ = require('underscore')


io.on("connection", socket => {
    console.log("new connection created..");
  });

const getJob = cron.schedule("*/15 * * * * *", async () => {
    try {
      console.log("getjob?");
  
      let { data } = await axios.get(
        `https://jobs.github.com/positions.json?description=developer`
      );
      data = _.shuffle(data).slice(0, 10);
      io.emit("getJobs", data);
    } catch (error) {
      console.log(error);
    }
});

getJob.start();

mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb://localhost/overflow`, { useNewUrlParser: true })
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', routes)

http.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})