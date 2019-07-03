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
        Question.find({}).sort({createdAt: -1})
        .populate({
            path: 'userId',
            select: ['name','_id']
        })
        .then(questions =>{
            res.status(200).json(questions)
        })
        .catch(next)
    }

    static findOne(req, res, next){
        Question.findById(req.params.id).populate('userId')
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
        let userId= req.decode.id

        Question.findById(questionId)
        .then(question =>{
            if(!question){
                throw {code: 404, message: 'Question not found'}
            }else{
                if(question.upvotes.includes(userId)){
                    throw {code: 404, message: 'You have been vote'}
                }else{
                    Promise.all([
                        Question.findByIdAndUpdate(questionId, {$addToSet : { upvotes: userId }}),
                        Question.findByIdAndUpdate(questionId , {$pull : { downvotes: userId }})
                    ])
                    .then(question =>{
                        res.status(200).json(question[0])
                    })
                    .catch(next)
                }
            }
        })
        .catch(next)

        

    }

    static updateDownvotes(req, res, next){
        let questionId= req.params.id
        let userId= req.decode.id

        Question.findById(questionId)
        .then(question =>{
            if(!question){
                throw {code: 404, message: 'Question not found!'}
            }else{
                if(question.downvotes.includes(userId)){
                    throw {code: 400, message: 'You have been vote'}
                }else{
                    Promise.all([
                        Question.findByIdAndUpdate(questionId , {$addToSet : { downvotes: userId }}),
                        Question.findByIdAndUpdate(questionId , {$pull : { upvotes: userId }})
                    ])
                    .then(question =>{
                        res.status(200).json(question[0])
                    })
                    .catch(next)
                }
            }
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

module.exports= questionController