const Models = require('../models/')
const { User, Question, Answer } = Models
const verifyPassword = require('../helpers/bcrypt.js').verifyPassword
const generateToken = require('../helpers/jwt.js').generateToken
const verifyToken = require('../helpers/jwt.js').verifyToken

class ControllerUser {
  static update(req, res, next){
    let userEmail = req.decode.email
    let {name, password} = req.body
    let input = {name, password} //user cannot change email

    User.findOneAndUpdate({email: userEmail}, input, {new: true})
    .then(updated => {
      res.json(updated)
    })
    .catch(next)
  }

  static findQuestions(req, res, next){
    let userId = req.decode.id
    Question.find({owner: userId})
      .then ( result => {
        res.json(result)
      })
      .catch(next)
  }

  static register(req, res, next) {
    const { email, password } = req.body
    let name = email.split('@')[0]
    const input = { name, email, password }

    User.create(input)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    const input = { email, password }

    User.findOne({email: input.email})
    .then(user => {
      if(user){
        let check = verifyPassword(input.password, user.password)
        if(check) {
          let token = generateToken({id: user._id, email: user.email})
          res.json({access_token: token, name: user.name, address: user.address})
        } else {
          throw {status: 400, message: 'Wrong password'}
        }
      } else {
        throw {status: 400, message: 'Wrong email'}
      }
    })
    .catch(next)
  }
}

module.exports = ControllerUser