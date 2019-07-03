const User = require('../models/model-user')
const Token = require('../models/model-blacklist-token')
const { compareHash } = require('../helpers/hash-helpers')
const { generateToken } = require('../helpers/jwt-helper')

class ControllerUser {
  static login(req, res, next) {
    if (!req.body.username || !req.body.password) {
      throw ({ code: 404, message: 'Please input username / password' })
    }
    if (req.body.login_type == 'default') {
      // default login
      let { username, password } = req.body
      let userData
      User.findOne({ username: username })
        .then((user) => {
          userData = user
          if (!user) return next({code: 401, message: 'Username / password Invalid'})
          else {
            return compareHash(password, user.password)
          }
        })
        .then(result => {
          if (!result) return next({code: 401, message: 'Username / password Invalid'})
          else {
            let payload = {
              userId: userData._id
            }          
            let token = generateToken(payload)
            res.json({
              token: token
            })
          }
        })
        .catch(next)
    } else if (req.body.login_type == 'google') {
      // google login
      let { full_name, username, email } = req.body
      let userData
      User.findOne({ email: email, username: username })
        .then((user) => {
          userData = user
          if (!user) {
            let randomPass = customPassword();
            return User.create({
              email: email,
              username: username,
              full_name: full_name,
              password: randomPass
            })
          }
        })
        .then(result => {
          let payload = {
            userId: (userData) ? userData._id : result._id
          }          
          let token = generateToken(payload)
          res.json({
            token: token
          })
        })
        .catch(next)
    }
  }
  
  static logout(req, res, next) {
    let token = req.headers.token
    Token.create({ token: token })
      .then((token) => {
        res.status(201).json({ message: 'Successfully log out' })
      })
      .catch(next)
  }

  static register(req, res, next) {
    if (!req.body.email || !req.body.password) {
      throw { code: 400, message: 'Please input email / password'}
    }
    let newUser = {
      full_name: req.body.full_name,
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    }
    User.create(newUser)
      .then((user) => {
        let sendUser = {
          _id: user._id,
          full_name: user.full_name,
          email: user.email,
          username: user.username
        }
        res.status(201).json(sendUser)
      })
      .catch(next)
  }

  static myProfileData(req, res, next) {
    User.findById(req.userId)
      .then((result) => {
        let sendData = {
          full_name: result.full_name,
          username: result.username,
          email: result.email,
          id: result._id
        }
        res.json(sendData)
      })
      .catch((err) => {
        console.log(err);
        next()
      })
  }
}

module.exports = ControllerUser