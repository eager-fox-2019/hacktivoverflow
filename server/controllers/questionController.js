const Question = require('../models/Question')
const Answer = require('../models/Answer')

class QuestionController {
    static createAnswer(req, res){
        console.log(req.body)
        let newAnswer;
        let {title, description} = req.body
        Answer.create({
            title,
            description,
            userId : req.loggedUser._id
        })
            .then(answer => {
                console.log(answer, '11111111111111');
                newAnswer = answer
                return Question.findById(req.params.id)
            })
            .then(ques => {
                
                let answers = ques.answers
                answers.push(newAnswer)
                ques.set({answers})
                return ques.save()
                
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
        // try {
        //     let answer = await Answer.create({
        //         title,
        //         description,
        //         userId : req.loggedUser._id
        //     })
        //     let question = await Question.findById(req.params.id)
        //     console.log(answer)
        //     question.answers.push(answer._id)
        //     res.json(await question.save())
        // } catch (error) {
        //     console.log(error)
        // }
    }
    static create(req, res){
        let {title, description} = req.body
        Question.create({
            title,
            description,
            userId : req.loggedUser._id
        })
            .then(ques => {saved
                res.status(201).json(ques)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
    static findAll(req, res){
        Question.find({}).populate('userId').sort({'createdAt': 'descending'})
            .then(ques => {
                res.status(201).json(ques)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
    
    static findOne(req, res){
        Question.findById(req.params.id)
            .populate('userId')
            .populate({
                path : 'answers',
                populate : {
                    path : 'userId'
                }
            })
            .then(ques => {
                
                res.status(201).json(ques)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
    static update(req, res){
        let obj = {}
        let {title, description, upvote, downvote} = req.body
        if(title) obj.title = title
        if(description) obj.description = description
        if(upvote) obj.upvote = upvote
        if(downvote) obj.downvote = downvote
        
        Question.findByIdAndUpdate(req.params.id, obj)
            .then(ques => {
                res.status(201).json(ques)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res){
        Question.findByIdAndDelete(req.params.id)
            .then(ques => {
                res.status(201).json(ques)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static setUpvote(req, res){
        Question.findById(req.params.id)
            .then(ques => {
                let flag = true
                let index = null
                ques.upvote.forEach((el, i) => {
                    if(el == req.loggedUser._id){
                        flag = false
                    }
                })
                if(flag){
                    let idx = 0
                    ques.downvote.forEach((el, i) => {
                        if(el == req.loggedUser._id){
                            flag = false
                            idx = i
                        }
                    })
                    if(flag){
                        ques.upvote.push(req.loggedUser._id)
                        return ques.save()
                    } else {
                        ques.downvote.splice(idx, 1)
                        ques.upvote.push(req.loggedUser._id)
                        return ques.save()
                    }
                } else{
                    ques.upvote.splice(index, 1)
                    return ques.save()
                }
            })
            .then(saved => {
                res.json(saved)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static setDownvote(req, res){
        Question.findById(req.params.id)
            .then(ques => {
                let flag = true
                let index = null
                ques.downvote.forEach((el, i) => {
                    if(el == req.loggedUser._id){
                        flag = false
                        index = i
                    }
                })
                if(flag){
                    let idx = 0
                    ques.upvote.forEach((el, i) => {
                        if(el == req.loggedUser._id){
                            flag = false
                            idx = i
                        }
                    })
                    if(flag){
                        ques.downvote.push(req.loggedUser._id)
                        return ques.save()
                    } else {
                        ques.upvote.splice(idx, 1)
                        ques.downvote.push(req.loggedUser._id)
                        console.log(ques)
                        return ques.save()
                    }
                } else{
                    ques.downvote.splice(index, 1)   
                    return ques.save()
                }
            })
            .then(saved => {
                console.log(saved)
                res.json(saved)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
    
}

module.exports = QuestionController