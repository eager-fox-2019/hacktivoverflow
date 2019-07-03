const User = require('../models/user')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class UserController{
    static login(req,res,next){
        User.findOne({username : req.body.username})
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
                        username : user.username
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
            res.status(201).json(user)
        })
        .catch(next)
    }
}

module.exports = UserController
