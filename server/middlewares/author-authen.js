const { decodeToken } = require('../helpers/jwt-helper')
const User = require('../models/model-user')
const Token = require('../models/model-blacklist-token')
const ObjectId = require('mongoose').Types.ObjectId; 

module.exports = {
  authentication: (req, res, next) => {
    try {
      console.log('########## Checking authentication');
      let payload = decodeToken(req.headers.token)
      Promise.all([User.findOne({_id: payload.userId}), Token.findOne({token: req.headers.token})])
        .then(result => {
          let [user, token] = result
          if (!user) {
            console.log('user fail');
            next({ code: 401 })
          }
          if (token) {
            console.log('token fail');
            next({ code: 404, message: 'Please logout and login again'})
          }
          console.log('authentication done');
          req.userId = payload.userId
          next()
        })
        .catch(next)
    } catch (err) {
      next({error: err})
    }
    
  }
}