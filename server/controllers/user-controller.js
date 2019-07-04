require("dotenv").config()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const secret = process.env.SECRET
const jwt = require("jsonwebtoken")

class UserController {
    static register (req, res, next) {
        var newUser = new User ({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
        return newUser.save()
         .then(created =>{
            const token = jwt.sign({_id: created._id, email: created.email, username: created.username}, secret, {expiresIn: "6h"})
            res.status(200).json({"access_token": token, _id: created._id, "username": created.username, "email": created.email})
         })
         .catch(next)
    }
    static login (req, res, next) {
        User.findOne({username: req.body.username})
        .then(userFound =>{
            if(userFound){
                res.locals.userData = userFound
                return bcrypt.compare(req.body.password, userFound.password)
            }else{
                throw ({
                    code: 400,
                    message: "Invalid Username/Password"
                })
            }
        })
        .then(valid =>{
            console.log(res.locals.userData)
            if(valid){
                console.log(res.locals.userData)
                const token = jwt.sign({_id: res.locals.userData._id, email: res.locals.userData.email, username: res.locals.userData.username}, secret, {expiresIn: "6h"})
                res.status(200).json({"access_token": token, _id: res.locals.userData._id, "username": res.locals.userData.username, "email": res.locals.userData.email})
            }else{
                throw ({
                    code: 400,
                    message: "Invalid Username/Password"
                })
            }
        })
        .catch(next)
    }
}

module.exports = UserController