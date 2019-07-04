const User = require('../models/user')
const { decrypt } = require("../helpers/bcryptjs")
const { sign } = require("../helpers/jwt")

class UserController {
    static signIn(req, res, next) {
        let signInItem = {
            email : req.body.email,
            password : req.body.password
        }
        User.findOne({ email: signInItem.email })
        .then(user => {
            if (!user) {
                throw res.status(404).json({ message: "User not found, please sign up" })
            } else {
                let checkPassword = decrypt(signInItem.password, user.password)
                if (checkPassword) {
                    let payload = {
                      id: user._id,
                      name: user.name,
                      email: user.email
                    }
                    let token = sign(payload)
                    res.status(200).json({token: token, name: payload.name, email: payload.email, userId: payload.id})
                } else {
                    res.status(404).json({ message: "Invalid email / password" })
                }
                res.json(user);
            }
        })
        .catch(next);
    }

    static signUp(req, res, next) {        
        let newUser = {
            name : req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
    }

    static findId(req, res, next) {
        User.findById(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
    }
}

module.exports = UserController