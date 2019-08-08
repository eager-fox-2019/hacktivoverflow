let Answer = require('../Models/aswerModel')

class answerController{
    static findAll(req, res, next){
        Answer.find({})
        .then(allData => {
            res.status(200).json(allData)
        })
        .catch(next)
    }
    static create(req, res, next){
        let {title, description, upvotes, downvotes} = req.body
        let newAnswer = new Answer({userId : req.decode.id, title, description, upvotes, downvotes})
        Answer.create(newAnswer)
        .then(created => {
            res.status(201).json(created)
        })
        .catch(next)
    }
}

module.exports = answerController