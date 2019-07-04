const User = require('../models/user')
const Helper = require('../helpers/helper')
const transporter = require("../helpers/nodemailer")
const kue=require("kue")
const queue = kue.createQueue();

const emailObj = {
    from:"lutfii.dev@gmail.com",
    subject: "Welcome to hiJarvis",
    html:`<p>Selamat datang di hiJarvis</p>`
}

queue.process("email-register", function(job, done){
    emailObj.to = job.data.to;
    transporter.sendMail(emailObj);
    done()
})

class UserController {
    static register(req, res) {        
        const {email, password, username} = req.body

        User.create({
            username, email, password
        })
        .then(user=> {
            res.status(201).json(user)

            var job = queue.create("email-register",{to:user.email})
            .priority("high")
            .save(function(err){
                if(!err){
                    console.log(job.id)
                }
            })
        })
        .catch(err => {
            res.status(400).json({msg: err})
        })
    }

    static list(req, res) {
        User.find({})
        .then(user=> {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json({msg:err})
        })
    }

    static login(req, res) {
        const {email, password} = req.body

        User.findOne({
            email
        })
        .then(user => {
            if(!user) {
                throw 'Username/password wrong'
            } else {
                if( Helper.comparePassword(password, user.password) ) {
                    let token = Helper.generateJWT({
                        email: user.email,
                        username: user.username,
                        id: user._id
                    });

                    let finalToken = {
                        token,
                        id: user._id,
                        username: user.username,
                        email: user.email
                    };

                    res.status(200).json(finalToken)
                }else{
                    throw 'Username/password wrong'
                }
            }
        })
        .catch(err => {
            res.status(400).json({msg: err})
        })
    }

    static findOne(req, res) {
        const id = req.params.id ? req.params.id : req.decoded.id

        User
        .findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static delete(req, res) {
        User
        .findByIdAndDelete(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static updateTags(req, res) {
        User
        .findOne({_id: req.decoded.id})
        .then(user => {
            if( req.params.type === 'push' && !user.watchedTags.includes(req.body.tags) ) {
                user.watchedTags.push(req.body.tags)
            } else if( req.params.type === 'pull' && user.watchedTags.includes(req.body.tags) ) {
                user.watchedTags.pull(req.body.tags)
            }else {
                res.status(400).json('Invalid input')
            }

            return user.save({ validateBeforeSave: false })
        })
        .then(user2=> {
            res.status(200).json(user2)
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController
