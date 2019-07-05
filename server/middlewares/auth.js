const {
    hash,
    verify
} = require('../helpers/jwtoken')
const userModel = require('../models/userModel')
const questionModel = require('../models/questionModel')
const answerModel = require('../models/answerModel')

module.exports = {
    authentication: function (req, res, next) {
        let token = req.headers.token
        console.log(token)
        console.log('=-=-=-=--=-=-inii dineaa~~')
        if (!token) {
            throw ({
                code: 400,
                message: `Unauthenticated`
            })
        } else {
            let decode = verify(token)
            userModel
                .findOne({
                    email: decode.email
                })
                .then((found) => {
                    let decode = verify(token)
                    req.decode = decode
                    req.user = found
                    next()
                })
                .catch((err) => {
                    throw ({
                        code: 404,
                        message: `User not found`
                    })
                })
        }
    },
    questionAuthorization: function (req, res, next) {
        console.log(req.params.questionId, 'ini question id')
        console.log(req.decode._id,'ini id yang login')

        questionModel
            .findById({
                _id: req.params.questionId
            })
            .then((question) => {
                console.log(question)
                if (question === {}) {
                    throw ({
                        code: 404,
                        message: `Post not found`
                    })
                } else {
                    // console.log(question)
                    // let authorized = (req.decode._id == question.userId)
                    // console.log(typeof req.decode._id, '<== ini yang login...ini yang bikin ==>', typeof question.userId)
                    // console.log(authorized)
                    if (req.decode._id == question.userId) {
                        next()
                    } else {
                        throw ({
                            code: 400,
                            message: `User Unauthorized`
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err)
                res.status().json({
                    errors: err
                })
            })
    },
    answerAuthorization: function (req, res, next) {
        console.log(req.params.answerId, '<== ini answer ID')
        console.log(req.decode._id, '<=== ini user ID')

        answerModel
            .findOne({
                _id: req.params.answerId
            })
            .then((answer) => {
                if (answer === {}) {
                    throw ({
                        code: 404,
                        message: `Answer not found`
                    })
                }
                else {
                    if(req.decode._id == answer.userId){
                        // console.log(answer,'ketemu yang ini')
                        next()
                    }
                    else {
                        throw({
                            code: 401,
                            message: `User unauthorized`
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(200).json({
                    errors: err
                })
            })
    }
}