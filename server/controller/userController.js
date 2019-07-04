require('dotenv').config()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

class userController{
    static authentication(req,res,next){
        let userId = req.decoded._id
        User
            .findById(userId)
            .then(response=>{
                res.status(200).json(response)
            })
            .catch(next)
    }
    static signin(req, res, next){
        let {email, password} = req.body
        User
            .findOne({email:email})
            .then((oneUser)=>{
                if(oneUser){
                    if(bcrypt.compareSync(password, oneUser.password)){
                        let payload = oneUser
                        let token = jwt.sign({payload}, process.env.SECRET) //don't forget to use .env
                        res.status(200).json({
                            data: oneUser,
                            token: token
                        })
                    } else {
                        res.status(400).json({msg: 'password/email wrong'})
                    }
                }else{
                    res.status(400).json({msg:'password/email wrong'})
                }
            })
            .catch(next)
    }
    static signup(req, res, next){
        let inputObj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            tags:[]
        }
        console.log(inputObj, '---<')
        User
            .create(inputObj)
            .then((newUser)=>{
                res.json(newUser)
            })
            .catch( next)
    }
    static update(req,res, next){
        let userId = req.decoded._id
        let {tags} = req.body
        User
            .findById(userId)
            .then(user =>{
                user.set({tags})
                return user.save()
            })
            .then(updated =>{
                res.status(200).json( updated)
            })
            .catch(next)
    }
}
module.exports= userController