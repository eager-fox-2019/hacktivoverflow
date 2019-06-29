const User = require("../models/user.js")
const register = require('../helpers/bcrypt.js')
const jwt  = require('../helpers/jwt.js')
const { login } = require('../helpers/error.js');

class UserController{
    static register(req,res,next){
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
        console.log(newUser)
        User.create(newUser)
        .then((result) => {
            res.status(201).json(result)
        })
        .catch(next)
    }
    static login(req,res,next){
        let email = req.body.email
        let password = req.body.password
        User.findOne({
            email: email
        })
        .then((result) => {
            if (result){
                let check = register.checkPassword(password, result.password)
                if (check == true){
                    let userSign = {
                        id: result._id,
                        email: result.email
                    }
                    let temp = jwt.sign(userSign)
                    let token = {
                        token: temp,
                        id: result._id
                    }
                    console.log(token)
                    res.status(200).json(token)
                } else {
                    throw {
                        code: 404, 
                        message: login
                    }
                }
            } else {
                throw {
                    code: 404, 
                    message: login
                }
            }
        })
        .catch(next)
    }
}

module.exports = UserController