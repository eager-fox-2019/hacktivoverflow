const Question= require('../models/question')
const Answer= require('../models/answer')

class questionController{

    static create(req, res, next){
        let newQuestion= new Question({
            title: req.body.title,
            description: req.body.description,
            upVotes: [],
            donwVotes: [],
            userId: req.decode.id
        })

        newQuestion.save()
        .then(question=>{
            res.status(201).json(question)
        })
        .catch(next)
    }

    static findAll(req, res, next){
        Question.find({sort: {createdAt: -1}}).populate('userId')
        .then(questions =>{
            res.status(200).json(questions)
        })
        .catch(next)
    }

    static findOne(req, res, next){
        Question.findById(req.params.id)
        .then(question =>{
            if(question){
                res.status(200).json(question)
            }else{
                throw {code: 404, message: 'Question not found! '}
            }
        })
        .catch(next)
    }

    static update(req, res, next){
        let updateValue={
            title: req.body.title,
            description: req.body.description
        }
        Question.findByIdAndUpdate(req.params.id, updateValue)
        .then(question=>{
            if(question){
                res.status(200).json(question)
            }else{
                throw {code: 404, message: 'Question not found! '}
            }
        })
        .catch(next)
    }

    static updateUpvotes(req, res, next){
        let questionId= req.params.id
        let userId= req.decode.userId

        Promise.all([
            Question.findByIdAndUpdate(questionId, {$addToSet : { upvotes: userId }}),
            Question.findByIdAndUpdate(questionId , {$pull : { downvotes: userId }})
        ])
        .then(question =>{
            res.status(200).json(question)
        })
        .catch(next)

    }

    static udpateDownvotes(req, res, next){
        let questionId= req.params.id
        let userId= req.decode.userId

        Promise.all([
            Question.findByIdAndUpdate(questionId , {$addToSet : { downvotes: userId }}),
            Question.findByIdAndUpdate(questionId , {$pull : { upvotes: userId }})
        ])
        .then(question =>{
            res.status(200).json(question)
        })
        .catch(next)

    }

    static remove(req, res, next){
        let _id= req.params.id

        Promise.all([
            Answer.deleteMany({ questionId : _id }),
            Question.findOneAndDelete({ _id })
        ])
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

}

export default questionController