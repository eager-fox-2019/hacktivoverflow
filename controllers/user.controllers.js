const Models = require('../models/')
const { User, Question, Answer } = Models
const verifyPassword = require('../helpers/bcrypt.js').verifyPassword
const generateToken = require('../helpers/jwt.js').generateToken
const verifyToken = require('../helpers/jwt.js').verifyToken

class ControllerUser {
  static update(req, res, next){
    let userId = req.decode.id
    let {name, password} = req.body
    let input = {name, password} //user cannot change email

    User.findOneAndUpdate({_id: userId}, input, {new: true})
    .then(updated => {
      res.json(updated)
    })
    .catch(next)
  }

  static findOne(req, res, next){
    let userId = req.decode.id
    User.findOne({_id: userId})
    .then (found => {
      res.json(found)
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
  static findAnswers(req, res, next){
    let userId = req.decode.id
    Answer.find({owner: userId})
      .then ( result => {
        res.json(result)
      })
      .catch(next)
  }

  static register(req, res, next) {
    const { email, password } = req.body
    if (!email || !password) throw ({message: 'invalid input for user registration'})
    
    let input = { email, password }
    if (email && email.includes('@')) input.name = email.split('@')[0]

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