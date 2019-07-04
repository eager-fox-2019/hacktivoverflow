const { Answer } = require('../models')

class AnswerController{
    static getAllAnswer(req, res, next){
        Answer.find()
            .then(answers => {
                res.json(answers)
            })
            .catch(next)
    }

    static getAnswer(req, res, next){
        Answer.findOne({ _id: req.params.answerId })
            .then(answer => {
                if(!answer){
                    throw {code: 404, message: 'Answer not found'}
                } else {
                    res.json(answer)
                }
            })
            .catch(next)
    }

    static getUserAnswer(req, res, next){
        Answer.findOne({ ownerId: req.params.userId })
            .then(answer => {
                if(!answer){
                    throw {code: 404, message: 'Answer not found'}
                } else {
                    res.json(answer)
                }
            })
            .catch(next)
    }

    static addAnswer(req, res, next){
        const { title, description, question } = req.body
        const input = { title, description, question }
        input.owner = req.decode.id
        Answer.create(input)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)
    }

    static update(req, res, next){
        let searchObj = {
            _id: req.params.answerId
        }
        let updateObj = {}
        let updateKeys = Object.keys(req.body)
        for(let i = 0; i < updateKeys.length; i++){
            if(updateKeys[i] !== 'question'){
                updateObj[updateKeys[i]] = req.body[updateKeys[i]]
            }
        }
        let setObj = {
            $set: updateObj
        }
        Answer.updateOne(searchObj, setObj) 
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: 'Answer not found'}
                } else {
                    res.json(result)
                }
            })
            .catch(next)
    }

    static likesUpdate(req, res, next){
        let searchObj = {
            _id: req.params.answerId
        }        
        let updateObj = {}
        if(req.body.upvotes){
            updateObj['upvotes'] = req.body.upvotes
        }
        if(req.body.downvotes){
            updateObj['downvotes'] = req.body.downvotes
        }
        let setObj = {
            $set: updateObj
        }
        Answer.updateOne(searchObj, setObj) 
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: 'Answer not found'}
                } else {
                    return Answer.findOne({ _id: req.params.answerId })
                }
            })
            .then(answer => {
                if(!answer){
                    throw {code: 404, message: 'Answer not found'}
                } else {
                    res.json(answer)
                }
            })
            .catch(next)
    }

    static delete(req, res, next){
        let searchObj = {
            _id: req.params.answerId
        }
        Answer.deleteOne(searchObj)
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: 'Answer not found'}
                } else {
                    res.json(result)
                }
            })
            .catch(next)
    }
}

module.exports = AnswerController