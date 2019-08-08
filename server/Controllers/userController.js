const User = require('../Models/userModel')
const {comparePassword, generateJWT} = require('../Helpers/crypt')

class UserController{
    static create(req, res, next){
        let {username, password, email} = req.body
        let obj = new User({username, password, email})
        console.log('halo?')
        obj.save()
        .then(created => {
            res.status(200).json(created)
        })
        .catch(next)
    }
    static login(req, res, next){
        console.log('pasti masuk')
        User.findOne({email : req.body.email})
        .then(found => {
            console.log('ketemu 1')
            if(found){
                let checker = comparePassword(req.body.password, found.password)
                if(checker) {
                    let payload = {
                        username : found.username,
                        email : found.email,
                        id : found._id
                    }
                    let token = generateJWT(payload)
                    res.status(200).json({token, payload})
                }else{
                    throw ({status : 401, msg : 'wrong inputs'})
                }
            }else{
                console.log('else luar')
                throw {msg : 'salah uiy'}
            }
        })
        .catch(next)
    }
}

module.exports = UserController