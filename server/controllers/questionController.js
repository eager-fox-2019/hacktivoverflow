const Question = require('../models/questionModel')

class QuestionController {
    static create(req, res, next) {
        let author = req.decoded.id
        let { title, description, tags } = req.body
        Question.create({
            title, description, tags, author
        })
            .then((newQuestion) => {
                return Question.findById(newQuestion._id)
                .populate('author')
                .populate('answers')
                .then((newQuestionPopulate) => {
                    res.status(201).json(newQuestionPopulate)
                })
            })
            .catch(next)
    }

    static read(req, res, next) {
        Question.find({})
            .populate('author')
            .populate('answers')
            .then((questions) => {
                res.status(200).json(questions)
            })
            .catch(next)
    }

    static getOne(req, res, next) {
        let id = req.params.id
        Question.findOne({
            _id : id
        })
        .populate('author')
        .populate('answers')
            .then((question) => {
                res.status(200).json(question)
            })
            .catch(next)
    }

    static upvotes(req, res, next) {
        console.log('masuk upvotes')
        let id = req.params.id
        let upvoter = req.decoded.id
        console.log(upvoter, 'upvoter')
        console.log(id, 'id')

        Question.findOne({ _id: id })
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
        Question.findOne({ _id: id })
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

    static updateAnswer(req, res, next) {
        console.log('masuk update')
        let id = req.params.questionId
        let dataUpdate = req.body
        console.log(dataUpdate, "in data update")
        Question.findOne({ _id: id })
        .then((found)=>{
            console.log(dataUpdate, " ini data update")
            console.log(found, " found ketemu tambah answer")
            console.log(found.answers, "in answer")
            found.answers.push(dataUpdate.answers)
            return found.save()
        })
        // .populate('author')
        // .populate('answers')
        .then((question)=>{
            res.status(200).json(question)
        })
        .catch(next)
    }

    static update(req, res, next) {
        console.log('masuk update')
        let id = req.params.questionId
        let dataUpdate = req.body
        Question.findByIdAndUpdate(id, dataUpdate, { new: true })
        .populate('author')
        .populate('answers')
            .then((updated) => {
                res.status(200).json(updated)
            })
            
        .catch(next)
    }

    static delete(req, res, next) {
        let id = req.params.questionId
        Question.findByIdAndDelete(id)
            .then((deleted) => {
                res.status(200).json(deleted)
            })
            .catch(next)
    }
}

module.exports = QuestionController
