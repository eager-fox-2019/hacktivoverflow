require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const errorHandler = require("./helpers/error-handler.js");
const User = require("./models/user.js");

let local = "mongodb://localhost/hacktiv-overflow";
let uri =
  "mongodb+srv://admin:admin@cluster0-ezblw.gcp.mongodb.net/hacktiv-overflow?retryWrites=true&w=majority";
mongoose.connect(local, { useNewUrlParser: true });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`connected to localhost ${PORT}`);
});

var CronJob = require("cron").CronJob;
new CronJob(
  "0 0 0 1 * *", //once a month
  function() {
    console.log("cron jobbbbb");
    User.find()
      .then(results => {
        results.forEach(result => {
          const emailCont = `Hi ${
            result.name
          }!. This is a friendly reminder to visit our website again!`;
          const mailOptions = {
            from: "<no-reply-overflow@admin.com>",
            to: `${result.email}`,
            subject: "HackTodo Reminder",
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
      })
      .catch(error => {
        console.log(error);
      });
  },
  null,
  true,
  "America/Los_Angeles"
);
