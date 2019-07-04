const Question = require('../models/question')
const User = require('../models/user')

class questionController {
    static create(req, res) {
        const { title, description, UserId, tags} = req.body
        let tagsArray = []
        for(let tag of tags){
            tagsArray.push(tag.value)
        }
        Question
            .create({
                title,
                description,
                UserId,
                upvotes: [],
                downvotes: [],
                tags:tagsArray
            })
            .then((createdQuestion) => { 
                res.status(201).json(
                    { message: 'Posted a question!', createdQuestion }
                ) 
            })
            .catch((err) => { res.status(500).json(err) })
    }

    static findAll(req, res) {
        if(req.query.tags == 'AllWatchedTags'){
            let tags = []
            console.log(req.authenticatedUser.tags)
            User
                .findById(req.authenticatedUser.id)
                .then((user) => {
                    tags = user.tags
                    return Question
                        .find({ tags:{ $in:tags} })
                        .populate('UserId')
                        .sort([['createdAt','descending']])
                })
                .then((allQuestions) => { 
                    res.status(200).json(allQuestions)}
                )
                .catch((err) => { 
                    res.status(500).json(err) 
                })
        }
        else if(req.query.tags){
            Question
                .find({ tags:{ $in:req.query.tags} })
                .populate('UserId')
                .then((allQuestions) => { 
                    res.status(200).json(allQuestions)}
                )
                .catch((err) => { 
                    res.status(500).json(err) 
                })
        }
        else{
            Question
                .find({})
                .populate('UserId')
                .sort([['createdAt','descending']])
                .then((allQuestions) => { 
                    res.status(200).json(allQuestions) 
                })
                .catch((err) => { 
                    res.status(500).json(err) 
                })
        }
    }

    static findOne(req, res) {
        const { QuestionId } = req.params
        Question
            .findById(QuestionId)
            .populate('UserId')
            .then((findOneQuestion) => { 
                res.status(200).json(findOneQuestion) 
            })
            .catch((err) => { 
                res.status(500).json(err) 
            })
    }

    static findUserQuestions(req, res) {
        const { id } = req.authenticatedUser
        Question
            .find({ UserId: id })
            .populate('UserId')
            .then((userQuestions) => { 
                res.status(200).json(userQuestions) 
            })
            .catch((err) => { res.status(500).json(err) })
    }

    static upVote(req, res) {
        const { QuestionId } = req.params
        Question
            .findById(QuestionId)
            .then((findOneQuestion) => {
                let { upvotes, downvotes } = findOneQuestion
                const { id } = req.authenticatedUser
                let foundUserUpvote = upvotes.find((user) => {
                    return user == id
                })
                let foundUserDownvote = downvotes.find((user) => {
                    return user == id
                })
                if (foundUserUpvote) res.status(400).json({ 
                    message: 'You are not allowed to upvote again!' 
                })
                else if (foundUserDownvote) {
                    downvotes = downvotes.filter((user) => {
                        return user != id
                    })
                } else {
                    upvotes.push(id)
                }
                return Question
                    .findByIdAndUpdate(QuestionId, {
                        upvotes,
                        downvotes
                    }, { new: true })
            })
            .then((updatedQuestion) => {
                res.status(200).json({ 
                    message: 'Upvoted a question!', updatedQuestion 
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static downVote(req, res) {
        const { QuestionId } = req.params
        Question
            .findById(QuestionId)
            .then((findOneQuestion) => {
                let { upvotes, downvotes } = findOneQuestion
                const { id } = req.authenticatedUser
                let foundUserDownvote = downvotes.find((user) => {
                    return user == id
                })
                let foundUserUpvote = upvotes.find((user) => {
                    return user == id
                })
                if (foundUserDownvote) res.status(400).json({ 
                    message: 'You are not allowed to downvote again!' 
                })
                else if (foundUserUpvote) {
                    upvotes = upvotes.filter((user) => {
                        return user != id
                    })
                } else {
                    downvotes.push(id)
                }
                return Question
                    .findByIdAndUpdate(QuestionId, {
                        upvotes,
                        downvotes
                    }, { new: true })
            })
            .then((updatedQuestion) => { 
                res.status(200).json({ 
                    message: 'Downvoted a question!', updatedQuestion
                }) 
            })
            .catch((err) => { res.status(500).json(err) })
    }

    static update(req, res) {
        const { QuestionId } = req.params
        const { title, description } = req.body
        Question
            .findByIdAndUpdate(QuestionId, { title, description, createdAt: new Date() }, { new: true })
            .then((updatedQuestion) => { 
                res.status(200).json({ 
                    message: 'Updated a question!', updatedQuestion 
                }) 
            })
            .catch((err) => { 
                res.status(500).json(err) 
            })
    }

    static delete(req, res) {
        const { QuestionId } = req.params
        Question
            .findByIdAndDelete(QuestionId)
            .then((deletedQuestion) => { 
                res.status(200).json({ 
                    message: 'Deleted a question!', deletedQuestion 
                }) 
            })
            .catch((err) => { 
                res.status(500).json(err) 
            })
    }

    static findAllTag(req,res){
        Question
            .find({})
            .then((allQuestion) => {
                let tags = []
                for(let question of allQuestion){
                    for(let tag of question.tags){
                        if(!tags.includes(tag)){
                            tags.push(tag)
                        }
                    }
                }
                res.status(200).json(tags)
            })
            .catch((err) => { res.status(500).json(err)})
    }
}

module.exports = questionController