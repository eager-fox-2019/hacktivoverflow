const User = require('../models/user')
const { sign, verify } = require('../helpers/jwt')
const { hash, compare } = require('../helpers/bcrypt')

class userController {
    static signUp(req, res) {
        const { first_name, last_name, email, password } = req.body
        User
            .create({ first_name, last_name, email, password })
            .then((createdUser) => { 
                res.status(201).json(
                    { message: 'Thank you for registering!', createdUser }) 
                })
            .catch((err) => { 
                res.status(500).json(err) 
            })
    }

    static signIn(req, res) {
        const { email, password } = req.body
        User
            .findOne({ email })
            .then((findOneUser) => {
                if (!findOneUser) {
                    res.status(401).json({ 
                        message: 'Wrong Email/Password' 
                    })
                }
                else {
                    if (!compare(password, findOneUser.password)) {
                        res.status(401).json(
                            { message: 'Wrong Email/Password' }
                            )
                    }
                    else {
                        const { id, first_name, last_name, email , tags} = findOneUser
                        const payload = { id, first_name, last_name, email, tags}
                        const token = sign(payload)
                        req.headers.token = token
                        res.status(200).json(
                            { message: 'Welcome back again to hacktivoverflow', token, details: payload }
                        )
                    }
                }
            })
            .catch((err) => { 
                res.status(500).json(err) 
            })
    }

    static addTag(req,res){
        const { tags } = req.body       
        let tagsArray = []
        for(let tag of tags){
            tagsArray.push(tag.value)
        }
        User
            .findById(req.authenticatedUser.id)
            .then((findOneUser) => {
                for(let usertag of findOneUser.tags){
                    if(!tagsArray.includes(usertag)){
                        tagsArray.push(usertag)
                    }
                }
                return User.findByIdAndUpdate(req.authenticatedUser.id, { tags:tagsArray},{ new:true })
            })
            .then((updatedUser) => {
                res.status(200).json({
                    updatedUser,
                    message:'Tags is Updated'
                })
            })
            .catch((err) =>{
                res.status(500).json(err)
            })
    }

    static myTag(req,res){
        User
            .findById(req.authenticatedUser.id)
            .then((findOneUser) => {
                res.status(200).json({
                    tags:findOneUser.tags
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static deleteTag(req,res){
        console.log('masukkkkk server')
        const { tag } = req.body
        User
            .findByIdAndUpdate( req.authenticatedUser.id, { $pull: { tags: tag } }, {new:true})
            .then(({data}) => {
                res.status(200).json({
                    message:'Success Deleted'
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}

module.exports = userController