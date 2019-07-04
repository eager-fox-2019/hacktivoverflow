const User = require('../models/user')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')
const { nodeMailer } = require('../helpers/nodeMailer')

class UserController{
    static login(req,res,next){
        User.findOne({email : req.body.email})
        .then(user =>{
            if(user){
                let check = compare(req.body.password, user.password)
                if(check){
                    let payload = {
                        id : user._id,
                        email : user.email
                    }
                    let token = sign(payload, `${process.env.SECRET_KEY}`)
                    res.status(200).send({
                        msg : 'logged in',
                        token,
                        email: user.email,
                        id : user._id,
                        username : user.username,
                        tags : user.watchedTags
                    })
                }else{
                    throw ({ code : 404, message : 'username / password wrong'})
                }
            }else{
                throw ({ code : 404, message : 'username / password wrong'})                
            }
        })
        .catch(next)
    }

    static register(req,res,next){
        console.log('masuk controller regist',req.body);
        
        let newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            watchedTags : req.body.selectedTags
        })

        newUser.save()
        .then(user =>{
            console.log('registered', user);
            nodeMailer('welcome', user.email)
            res.status(201).json(user)
        })
        .catch(next)
    }

    static updateWatchTag(req,res,next){
        console.log('masuk update tag',req.body.tags);
        let setVal = {}
        req.body.tags && (setVal.watchedTags = req.body.tags)

        User.findByIdAndUpdate(req.params.userId, setVal, {new : true})
        .then(user =>{
            console.log('updated ------------',user);
            res.status(200).json(user)
        })
        .catch(next)
    }
}

module.exports = UserController
