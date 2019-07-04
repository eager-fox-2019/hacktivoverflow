const { compare } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')
const { User } = require('../models')

class ControllerUser {
   static login(req, res, next) {
      let { email, password } = req.body
      User
       .findOne({ email })
       .then(user => {
           if (!user) {
              throw({ code : 400, message: 'Username/ password invalid' })
           } else {
               if (!password){
                  throw ({ code : 400, message: 'Username/ password invalid' })
               }
               if (!compare(password, user.password)) {
                  throw({ code : 400, message: 'Username/ password invalid' })
               } else {
                  let token = sign({email: user.email})
                  res.status(200).json({ 
                      token,
                      username: user.username,
                      userId: user._id
                  })
               }
           }
       })
       .catch(next)
   }
   static create (req,res, next) {
      let { email, password, username, tags } = req.body
      User
       .create({
          email,
          password,
          username,
          tags
       })
       .then(user =>{
            
          let token = sign({email: user.email})
          res.status(201).json({ 
            token,
            username: user.username,
            userId: user._id
          })
       })
       .catch(next)
   }
   static findOne (req, res, next) {
      let userId = req.user._id
      User.findOne({ _id: userId })
       .then(( user ) => {
         res.status(200).json(user)
       })
       .catch(next)
   }
   static update (req, res, next) {
      let userId = req.user._id
      let newTag = req.body
      User.findOneAndUpdate({ _id: userId }, newTag, { new: true } )
       .then(user => {
          res.status(200).json(user)
       })
       .catch(next)
   }
}
module.exports = ControllerUser