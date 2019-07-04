const Answer = require('../models/Answer')

class AnswerController {
    
    static findAll(req, res){
        Answer.find({questionId : req.params.id})
            .populate('questionId')
            .populate('userId')
            .then(ques => {
                res.status(201).json(ques)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
    static findOne(req, res){
        Answer.findById(req.params.id)
            .populate('questionId')
            .populate('userId')
            .then(ques => {
                res.status(201).json(ques)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
    static update(req, res){
        let obj = {}
        let {title, description, upvote, downvote, answerId} = req.body

        if(title) obj.title = title
        if(description) obj.description = description
        if(upvote) obj.upvote = upvote
        if(downvote) obj.downvote = downvote
        if(answerId) obj.answerId = answerId
        Answer.findByIdAndUpdate(req.params.id, obj)
            .then(ques => {
                res.status(201).json(ques)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static setUpvote(req, res){
        Answer.findById(req.params.id)
            .then(ans => {
                let flag = true
                let index = null
                ans.upvote.forEach((el, i) => {
                    if(el == req.loggedUser._id){
                        flag = false
                        index = i
                    }
                })
                if(flag){
                    let idx = 0
                    ans.downvote.forEach((el, i) => {
                        if(el == req.loggedUser._id){
                            flag = false
                            idx = i
                        }
                    })
                    if(flag){
                        ans.upvote.push(req.loggedUser._id)
                        return ans.save()
                    } else {
                        ans.downvote.splice(idx, 1)
                        ans.upvote.push(req.loggedUser._id)
                        return ans.save()
                    }
                } else{
                    ans.upvote.splice(index, 1)
                    return ans.save()
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
        Answer.findById(req.params.id)
            .then(ans => {
                let flag = true
                let index = null
                ans.downvote.forEach((el, i) => {
                    if(el == req.loggedUser._id){
                        flag = false
                        index = i
                    }
                })
                if(flag){
                    let idx = 0
                    ans.upvote.forEach((el, i) => {
                        if(el == req.loggedUser._id){
                            flag = false
                            idx = i
                        }
                    })
                    if(flag){
                        ans.downvote.push(req.loggedUser._id)
                        return ans.save()
                    } else {
                        ans.upvote.splice(idx, 1)
                        ans.downvote.push(req.loggedUser._id)
                        return ans.save()
                    }
                } else{
                    ans.downvote.splice(index, 1)
                    return ans.save()
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
}

module.exports = AnswerController