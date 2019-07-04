const User = require('../models/userModel')
const { verifyPassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        console.log(req.body)
        let { name, email, password } = req.body
        User.create({
            name, email, password
        })
            .then((newUser) => {
                console.log(newUser)
                res.status(201).json(newUser)
            })
            .catch(next)
    }

    static login(req, res, next) {
        let { email, password } = req.body
        User.findOne({
            email
        })
            .then(found => {
                if (found && verifyPassword(password, found.password)) {
                    console.log(found)
                    let access_token = createToken({ id: found.id, name: found.name, email: found.email })
                    res.status(200).json({
                        token: access_token,
                        id: found.id,
                        name: found.name,
                        email: found.email
                    });
                } else {
                    next({ status: 400, messages: 'email/password wrong!' })
                }
            })
            .catch(next)
    }

    static getUsers(req, res, next) {
        User.find({})
            .then((users) => {
                res.json(users)
            })
            .catch(next)
    }

    static verifyUser(req, res, next) {
        console.log(req.decoded)
        res.status(200).json(req.decoded)
    }

    static updateWatch(req, res, next) {
        console.log('masuk updateWatch')
        let id = req.params.userId
        let watchtags = req.body
        User.findOne({ _id: id })
        .then((found)=>{
            console.log(watchtags, " ini data update")
            console.log(found, " found ketemu tambah watchtags")
            // console.log(found.answers, "in answer")
            found.watchtags.push(watchtags.watchtags)
            return found.save({validateBeforeSave: false })
        })
        .then((user)=>{
            console.log('data usdah diupdate', user)
            res.status(200).json(user)
        })
        .catch(next)
    }

    static removeWatch(req, res, next) {
        console.log('masuk remove watch')
        let id = req.params.userId
        let watchtags = req.body
        User.findOne({ _id: id })
        .then((found)=>{
            console.log(found.watchtags, " ini found.watchtags")
            let index = found.watchtags.indexOf(watchtags.watchtags);
            console.log(index, " index", watchtags ," watchtags")
            if (index !== -1) {
                console.log(index, "------------------")
                found.watchtags.splice(index, 1)
            }
            return found.save({validateBeforeSave: false })
        })
        .then((user)=>{
            console.log('data usdah diremove')
            res.status(200).json(user)
        })
        .catch(next)
    }
}

module.exports = UserController