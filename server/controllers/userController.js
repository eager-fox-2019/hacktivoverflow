const userModel = require('../models/userModel')
const { sign } =require('../helpers/jwtoken')

class UserController {
    static register(req, res) {
        console.log('inside register')
        let newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        userModel.create(newUser)
            .then((newUser) => {
                console.log(newUser)
                res.status(201).json(newUser)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static login(req, res) {
        console.log('inside login')
        let loginData = {
            username: req.body.username,
            passwor: req.body.password
        }

        userModel.findOne({
                username: loginData.username
            })
            .then((foundUser) => {
                if (!foundUser) {
                    res.status(400).json({
                        message: `Invalid username / password`
                    })
                }
                else {
                    let payload = {
                        _id: foundUser._id,
                        username: foundUser.username,
                        email: foundUser.email
                    }
                    
                    let token = sign(payload)
                    res.status(200).json({token})
                }
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController