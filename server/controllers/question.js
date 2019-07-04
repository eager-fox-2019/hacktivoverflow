const { Question, Answer, User } = require('../models')

class QuestionController{
    static getAllQuestion(req, res, next){
        Question.find().populate('owner')
            .then(questions => {
                res.json(questions)
            })
            .catch(next)
    }

    static getQuestion(req, res, next){
        Question.findOne({ _id: req.params.questionId }).populate({ 
            path: 'answer',
            populate: {
              path: 'owner',
              model: 'User'
            } 
         })
            .then(question => {
                if(!question){
                    throw {code: 404, message: 'Question not found'}
                } else {
                    // User.populate(question, {path: 'answer.user'})
                    res.json(question)
                }
            })
            .catch(next)
    }

    static getUserQuestion(req, res, next){
        Question.find({ owner: req.params.userId })
            .then(questions => {
                res.json(questions)
            })
            .catch(next)
    }

    static addQuestion(req, res, next){
        const { title, description, question } = req.body
        const input = { title, description, question }
        input.owner = req.decode.id
        Question.create(input)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)
    }

    static update(req, res, next){
        let searchObj = {
            _id: req.params.questionId
        }
        let updateObj = {}
        let updateKeys = Object.keys(req.body)
        for(let i = 0; i < updateKeys.length; i++){
            updateObj[updateKeys[i]] = req.body[updateKeys[i]]
        }
        let setObj = {
            $set: updateObj
        }
        Question.updateOne(searchObj, setObj) 
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: 'Question not found'}
                } else {
                    res.json(result)
                }
            })
            .catch(next)
    }

    static nodetailUpdate(req, res, next){
        let searchObj = {
            _id: req.params.questionId
        }
        let updateObj = {}
        if(req.body.answer){
            updateObj = {
                answer: req.body.answer
            }
        } else {
            if(req.body.upvotes){
                updateObj[upvotes] = req.body.upvotes
            }
            if(req.body.downvotes){
                updateObj[downvotes] = req.body.downvotes
            }
        }
        let setObj = {
            $set: updateObj
        }
        Question.updateOne(searchObj, setObj) 
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: 'Question not found'}
                } else {
                    res.json(result)
                }
            })
            .catch(next)
    }

    static delete(req, res, next){
        console.log("Masuk ke delete question")
        let searchObj = {
            _id: req.params.questionId
        }
        Answer.deleteMany({question: req.params.questionId})
            .then(result => {
                console.log("Answers from this question deleted")
                return  Question.deleteOne(searchObj)
            })       
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: 'Question not found'}
                } else {
                    res.json(result)
                }
            })
            .catch(next)
    }
}

module.exports = QuestionController