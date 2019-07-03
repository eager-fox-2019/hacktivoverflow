const { verifyToken } = require('../helpers/token')
const Users = require('../models/user')
const Question = require('../models/question')

const auth = (req, res, next) => {
  if (req.headers.hasOwnProperty('token')) {
    try {
      const decode = verifyToken(req.headers.token)
      req.decode = decode

      Users.findOne({ email: decode.email })
      .then(user => {
        if (user) next()
        else next({ code: 400, message: `Invalid Token. Please re-login` })
      })
      .catch(next)
    }
    catch (err) { next({ code: 400, message: `Invalid Token. Please login/register` }) }
  }
  else next({ code: 400, message: `No token provided. Please login/register`})
}


module.exports = {
  auth
}