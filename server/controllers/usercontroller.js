const User = require('../models/user');
const pwHelper = require('../helpers/password');
const tkHelper = require('../helpers/token');

class Controller {
  static register(req, res, next) {
    console.log(`Registering ${ req.body.email }`)
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        if(err.message.includes("invalid format")) {
          next({ status: 400, msg: "Invalid email format" })
        } else if(err.message.includes("not unique")) {
          next({ status: 409, msg: "Email already used" })
        }
        next({})
      })
  }

  static login(req, res, next) {
    console.log(`Logging in ${ req.body.email }`)
    User.findOne({ email: req.body.email })
      .exec()
      .then(user => {
        if(!user) {
          throw { status: 401, msg: "Invalid username/password" }
        }
        else {
          if(pwHelper.compare(req.body.password, user.password)) {
            let token = tkHelper.sign({ id: user._id, email: user.email, })
            res.json({
              id: user._id,
              email: user.email,
              token,
            })
          } else {
            throw { status: 401, msg: "Invalid username/password"}
          }
        }
      })
      .catch(next)
  }
}

module.exports = Controller;
