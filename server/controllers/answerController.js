const Answer = require('../models/answerModel')

class AnswerController{
    static create(req, res, next) {
        let author = req.decoded.id
        let { title, description, questionId } = req.body
        Answer.create({
            title, description, questionId, author
        })
            .then((newAnswer) => {
                return Answer.findById(newAnswer._id)
                .populate('author')
                .then((newAnswerPopulate) => {
                    res.status(201).json(newAnswerPopulate)
                })
            })
            .catch(next)
    }

    static read(req, res, next) {
        Answer.find({})
        .then((answers) => {
            res.status(200).json(answers)
        })
        .catch(next)
    }

    static update(req, res, next) {
        let id = req.params.answerId
        let dataUpdate = req.body
        Todo.findByIdAndUpdate(id, dataUpdate, { new: true })
            .then((updated) => {
                res.status(200).json(updated)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        let id = req.params.answerId
        Todo.findByIdAndDelete(id)
            .then((deleted) => {
                res.status(200).json(deleted)
            })
            .catch(next)
    }

    static upvotes(req, res, next) {
        console.log('masuk upvotes')
        let id = req.params.id
        let upvoter = req.decoded.id
        console.log(upvoter, 'upvoter')
        console.log(id, 'id')

        Answer.findOne({ _id: id })
        .then((found)=>{
            console.log(found, 'ini found')
            if(found.upvotes.includes(upvoter)){
                found.upvotes.pull(upvoter)
            }else if(found.downvotes.includes(upvoter)){
                console.log('masuk sini')
                found.downvotes.pull(upvoter)
                found.upvotes.push(upvoter)
            }else{
                found.upvotes.push(upvoter)
            }
            return found.save()
        })
        // .populate('answers')
        .then((question)=>{
            console.log('saveeeeeeeeeeeeeeeeee')
            res.status(200).json(question)
        })
        .catch(next)
    }

    static downvotes(req, res, next) {
        console.log('masuk downvotes')
        let id = req.params.id
        let downvoter = req.decoded.id
        console.log(downvoter)
        Answer.findOne({ _id: id })
        .then((found)=>{
            console.log(found, " ini found")
            if(found.downvotes.includes(downvoter)){
                found.downvotes.pull(downvoter)
            }else if(found.upvotes.includes(downvoter)){
                console.log('masuk sini')
                found.upvotes.pull(downvoter)
                found.downvotes.push(downvoter)
            }else{
                found.downvotes.push(downvoter)
            }
            return found.save()
        })
        // .populate('answers')
        .then((question)=>{
            console.log('masuk ini')
            res.status(200).json(question)
        })
        .catch(next)
    }
}

module.exports = AnswerController