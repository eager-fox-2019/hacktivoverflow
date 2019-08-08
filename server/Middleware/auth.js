const jwt = require('jsonwebtoken')
const Question = require('../Models/questionModel')
const User = require('../Models/userModel')

module.exports = {
    Authentication(req, res, next){
        console.log('masuk auth')
        let theToken = req.headers.token
        console.log('nemu token ga?')
        console.log(req.headers.token, 'ini kah token')
        //kalo eroorr disini. kalo tojken gaada, error
        console.log(theToken, 'token?')
        //else
        if(!theToken){
            console.log(theToken, 'to kren')
            res.json({code : 401 , msg : 'you have to login first'})
        }else{
            console.log('masuk sini ga?')
            try {
                let decode = jwt.verify(theToken, process.env.JWT_SECRET)
                // req.decode = decode
                // next()
                console.log('mau nyari satu')
                User.findOne({
                    email : decode.email
                })
                .then(found => {
                    console.log('pas ketemu satu')
                    if(found){
                        console.log('ini found', decode)
                        req.decode = decode
                        console.log('oke, next')
                        next()
                    }else{
                        throw({status : 404, msg : 'user not found'})
                    }
                })
                .catch(next)

            }catch(err) {
                res.json({code : 401 , msg : 'invalid token'})
            }
        }
    },
    Authorization(req, res, next){
        console.log('masuk ke auhor')
        console.log(req.params.Qid, 'apa ni?')
        Question.findOne({
            userId : req.params.userId
        })
        .then(found => {
            console.log(found.userId, 'params')
            console.log(req.params.userId, 'dari params')
            console.log('masuk authorizationg?', found)
            if(!found){
                console.log('not found')
                throw ({code : 404 , msg : 'resource not found'})
            }else{
                if(String(found.userId) == req.decode.id){
                    console.log('sampai')
                    next()
                }else{
                    console.log('tidak sammpai')
                    throw ({code : 401 , msg : 'not authorized'})   
                }
            }
        })
        .catch(next)
    }
}