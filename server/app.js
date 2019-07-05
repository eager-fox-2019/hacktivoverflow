require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const url = process.env.DATABASE_URL || 'mongodb://localhost/hacktiv-overflow'
const port = process.env.PORT || 3000
const routes = require('./routes')
const error = require('./middlewares/error')
const kue = require('kue')
const jobs = kue.createQueue();

mongoose.connect(url, {
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => { 
    console.log(err) 
  })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use("/", routes)
app.use(error)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

jobs.process("email", function(job, done) {
  job.data.datas.forEach(result => {
    const emailCont = `Hi ${result.name}, you've been away for quite some time, we miss you! Please visit us soon by clicking here ${process.env.WEBSITE}`;
    const mailOptions = {
      from: "<hacktiv-overflow.alvinchristian7@admin.com>",
      to: `${result.email}`,
      subject: "Hacktiv Overflow Alvin - Reminder",
      html: emailCont
    };

    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  });
});
var CronJob = require("cron").CronJob;
new CronJob(
  "0 0 0 1 * *", //once a month
  function() {
    console.log("cron jobbbbb");

    User.find()
      .then(results => {
        jobs
          .create("email", {datas: results
          })
          .priority("high")
          .save();
      })
      .catch(error => {
        console.log(error);
      });
  },
  null,
  true,
  "America/Los_Angeles"
);

module.exports = app
