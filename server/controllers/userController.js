const User = require('../models/user')
const Helper = require('../helpers/helper')

class UserController {
    static register(req, res) {
        const { username, email, password } = req.body
        User
            .create({ username, email, password })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                console.log(err, '----')
                res.status(500).json(err)
            })
    }

    static login(req, res) {
        const { email, password } = req.body
        User
            .findOne({ email })
            .then(user => {
                if (user) {
                    if (Helper.comparePassword(password, user.password)) {
                        const myToken = Helper.generateJWT({
                            _id: user._id,
                            username: user.username,
                            email: user.email
                        })
                        res.status(200).json({
                            token: myToken,
                            _id: user._id,
                            username: user.username,
                            email: user.email
                        })
                    } else {
                        res.status(400).json("Wrong email / password")
                    }
                } else {
                    res.status(400).json("Wrong email / password")
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static token(req, res){
        User
        .findOne({_id: req.decoded._id})
        .then(user =>{
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }

    static findOne(req, res) {
        User
            .findOne({ _id: req.params.id })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findAll(req, res) {
        User
            .find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController