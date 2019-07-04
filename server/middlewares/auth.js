const Helper = require('../helpers/helper')
const Question = require('../models/Question')
const Answer = require('../models/Answer')
const User = require('../models/User')

module.exports = {
    authentication : (req, res, next) => {
        try {
            // console.log(req.headers.access_token, 'ini token di middleware')
            const decoded = Helper.verifyJWT(req.headers.access_token);
            console.log(decoded)
            User.findById(decoded._id)
                .then(( data ) => {
                    if(decoded._id == data._id){
                        req.loggedUser = decoded
                        console.log(req.loggedUser)                        
                        next()
                    } else {
                        res.status(401).json({message : 'not authorized.'})
                        // next(error)
                    }
                })
                .catch(err => {
                    res.status(401).json({message : 'not authorized'})
                })
           
        } catch (err) {
            res.status(500).json(err)
        }
    },
    authorization : {
        question :(req, res, next) => {
            Question.findById(req.params.id)
                .then(( data ) => {
                    if(req.loggedUser._id == data.userId){
                        next()
                    } else {
                        res.status(401).json({message : 'not authorized'})
                        // next(error)
                    }
                })
                .catch(err => {
                    res.status(401).json({message : 'not authorized'})
                })
        },
        answer : (req, res, next) => {
            Answer.findById(req.params.id)
                .then(( data ) => {
                    if(req.loggedUser._id == data.userId){
                        next()
                    } else {
                        res.status(401).json({message : 'not authorized'})
                        // next(error)
                    }
                })
                .catch(err => {
                    res.status(401).json({message : 'not authorized'})
                })
        },
    }
}