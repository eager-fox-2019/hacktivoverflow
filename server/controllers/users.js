const User = require('../models/users')
const comparePassword = require('../helpers/comparePassword')
const getToken = require('../helpers/getToken')

class ControllerUser {

  static findAll(req, res, next) {
    User.find()
    .then(result => {
      res.json(result)
    })
    .catch(next)
  }

  static create(req, res, next) {
    if(!req.body.email) {
      throw {status: 400, message: 'email is required !'}
    } else if (!req.body.username) {
      throw {status: 400, message: 'username is required !'}
    } else if(!req.body.username) {
      throw {status: 400, message: 'password is required !'}
    }
    const { email, password, username } = req.body
    const input = { email, password, username }
    User.create(input)
    .then(result => {
      res.json(result)
    })
    .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    const input = { email, password }
    // console.log(input)
    User.findOne({email: input.email})
    .then(user => {
      if(user){
        let check = comparePassword(user.password, input.password)
        if(check) {
          let token = getToken(user)
          let { _id, email, username } = user
          let payload = { _id, email, username } 
          res.json({token, payload})
        } else {
          throw {status: 400, message: 'Wrong email / password'}
        }
      } else {
        throw {status: 400, message: 'Wrong email / password'}
      }
    })
    .catch(next)
  }
}

module.exports = ControllerUser