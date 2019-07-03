const User= require('../models/user')
const {compare}= require('../helpers/bcrypt')
const {generateToken}= require('../helpers/jwt')

class userController{

    static register(req, res, next){
            let newUser= new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            
            newUser.save()
            .then(user=>{
                res.status(201).json(user)
            })
            .catch(next)
        }
    
    static login(req, res, next){
            User.findOne({email: req.body.email})
            .then(user=>{
                if(user){
                    if(compare(req.body.password, user.password)){
                        let payload= {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                        }
    
                        let token= generateToken(payload)
    
                        res.status(200).json({
                            token,
                            userId: user._id,
                            name: user.name,
                        })
                    }else{
                        throw {code: 404, message: 'Wrong Email/Password'}
                    }
                }else{
                    throw {code: 404, message: 'Wrong Email/Password'}
                }
            })
            .catch(next)
        }
}

module.exports= userController