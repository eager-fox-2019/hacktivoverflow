const User = require("../models/user.js");
const register = require("../helpers/bcrypt.js");
const jwt = require("../helpers/jwt.js");
const { login } = require("../helpers/error.js");
// const kue = require("kue");
// const queue = kue.createQueue();

class UserController {
  static register(req, res, next) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    User.create(newUser)
      .then(result => {
        // var CronJob = require("cron").CronJob;
        // new CronJob(
        //   "0 0 0 1 * *",
        //   function() {
        //     console.log("You will see this message every month");
        //     const emailJob = queue
        //       .create("sendEmail", {
        //         title: "Welcome to HacktivOverflow",
        //         email: newUser.email,
        //         message: `<h1> Welcome ${
        //           newUser.email
        //         }, Thanks for registering to our website!</h1>`
        //       })
        //       .save();
        //     emailJob.on("failed", error => {
        //       console.log(JSON.parse(error));
        //     });
        //   },
        //   null,
        //   true,
        //   "America/Los_Angeles"
        // );
        res.status(201).json(result);
      })
      .catch(next);
  }
  static login(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
      email: email
    })
      .then(result => {
        if (result) {
          let check = register.checkPassword(password, result.password);
          if (check == true) {
            let userSign = {
              id: result._id,
              email: result.email
            };
            let temp = jwt.sign(userSign);
            let token = {
              token: temp,
              id: result._id
            };
            res.status(200).json(token);
          } else {
            throw {
              code: 404,
              message: login
            };
          }
        } else {
          throw {
            code: 404,
            message: login
          };
        }
      })
      .catch(next);
  }
}

module.exports = UserController;
