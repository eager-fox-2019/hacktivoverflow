const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Question = require('../models/Question')
const Answer = require('../models/Answer')

async function Authenticate(req, res, next) {
    try {
        if (req.headers.hasOwnProperty('token')) {
            const decode = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            let user = await User.findById(decode.id)
            req.loggedUser = user
            console.log(req.loggedUser);
            next()
        } else {
            throw ({
                code: 401,
                message: "you have to login first"
            })
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

async function AuthorizeQuestion(req, res, next) {
    try {
        let question = await Question.findById(req.params.questionId)
        console.log(question.author);
        console.log(req.loggedUser._id);
        if (question.author.toString() === req.loggedUser._id.toString()) {
            next()
        } else {
            throw {
                code: 401,
                message: "not authorized"
            }
        }
    } catch (error) {
        next(error)
    }
}

async function AuthorizeAnswer(req, res, next) {
    try {
        let answer = await Answer.findById(req.params.answerId)
        // console.log(answer.author);
        // console.log(req.loggedUser._id);
        if (answer.author.toString() === req.loggedUser._id.toString()) {
            next()
        } else {
            throw {
                code: 401,
                message: "not authorized"
            }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    Authenticate,
    AuthorizeQuestion,
    AuthorizeAnswer
}