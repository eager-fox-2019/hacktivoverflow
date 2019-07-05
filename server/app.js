require("dotenv").config();

const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  cors = require("cors"),
  routes = require("./routes/index"),
  errHandler = require("./middlewares/errHandler"),
  morgan = require("morgan"),
  kue = require("kue"),
  { queue, task } = require("./helpers/nodemailer");

app.use(cors());
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json({ limit: "2mb" }));

let DB_TARGET = "";
if (process.env.NODE_ENV == "prod") {
  DB_TARGET = process.env.MONGODB_ATLAS;
} else {
  DB_TARGET = process.env.MONGODB_ATLAS;
  // DB_TARGET = process.env.MONGODB_LOCAL + "-" + process.env.NODE_ENV;
}

mongoose
  .connect(DB_TARGET, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Database:", DB_TARGET);
  })
  .catch(err => {
    console.log("Error connect MONGODB");
  });

app.use("/", routes);
app.use(errHandler);
app.use("/kue-ui", kue.app);

app.listen(port, () => {
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Port:", port);
});

task.start();

queue.process("qotw", (job, done) => {
  console.log("qotw sent");
  done();
});
