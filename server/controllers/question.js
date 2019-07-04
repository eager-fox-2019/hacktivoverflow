const Question = require('../models/question')

class QuestionController {
    static fetch(req, res, next) {
        Question.find({}).populate('user_id').exec(function (err, data) {
            if (err) {
                next
            } else {
                res.status(200).json(data)
            }
        })
    }

    static fetchMine(req, res, next) {
        console.log('mine');

        Question.find({ user_id: req.decoded.id }, function (err, data) {
            if (err) {
                next
            } else {
                res.status(200).json(data)
            }
        })
    }

    static fetchOne(req, res, next) {
        console.log(req.params);

        Question.findOne({ _id: req.params.questionid }).populate('user_id').exec(function (err, data) {
            if (err) {
                next
            } else {
                res.status(200).json(data)
            }
        })
    }

    static create(req, res, next) {
        console.log(req.body);

        Question.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.decoded.id
        })
            .then(newdata => {
                res.status(201).json(newdata)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Question.deleteOne({ _id: req.params.questionid }, function (err, data) {
            if (err) {
                next
            } else {
                res.status(200).json(data)
            }
        })
    }

    static updateDownVote(req, res, next) {
        Question.findById(req.params.questionid, function (err, data) {
            if (err) {
                next
            } else {
                if(data.downvotes.includes(req.decoded.id)){
                    Question.updateOne({_id: req.params.questionid},{$pull: { downvotes: req.decoded.id }},{new:true})
                    .then((result)=>{
                        console.log(result);
                        res.json(result)
                    })
                    .catch(next)

                }else if(data.upvotes.includes(req.decoded.id)){
                        Question.updateOne({ _id: req.params.questionid }, { $pull: { upvotes: req.decoded.id } }, {new:true})
                        .then((result)=>{
                            console.log(result);
                            return Question.updateOne({ _id: req.params.questionid }, { $push: { downvotes: req.decoded.id } })                
                        })
                        .then((result)=>{
                            console.log(result);
                            res.json(result)
                        })
                        .catch(next)
                    }
                    else{
                        Question.updateOne({ _id: req.params.questionid }, { $push: { downvotes: req.decoded.id } })
                        .then((result)=>{
                            console.log(result);
                            res.json(result)
                        })
                        .catch(next)
                    }
                }
                
            
        })
    }

    static updateUpVotes(req, res, next) {
        Question.findById(req.params.questionid, function (err, data) {
            if (err) {
                next
            } else {
                if(data.upvotes.includes(req.decoded.id)){
                    Question.updateOne({_id: req.params.questionid},{$pull: { upvotes: req.decoded.id }},{new:true})
                    .then((result)=>{
                        console.log(result);
                        res.json(result)
                    })
                    .catch(next)

                }else if(data.downvotes.includes(req.decoded.id)){
                        Question.updateOne({ _id: req.params.questionid }, { $pull: { downvotes: req.decoded.id } }, {new:true})
                        .then((result)=>{
                            console.log(result);
                            return Question.updateOne({ _id: req.params.questionid }, { $push: { upvotes: req.decoded.id } })                
                        })
                        .then((result)=>{
                            console.log(result);
                            res.json(result)
                        })
                        .catch(next)
                    }
                    else{
                        Question.updateOne({ _id: req.params.questionid }, { $push: { upvotes: req.decoded.id } })
                        .then((result)=>{
                            console.log(result);
                            res.json(result)
                        })
                        .catch(next)
                    }
                }
        })
    }
    

    static EditQuestion(req,res,next){
        console.log(req.body);
        
        Question.updateOne({ _id: req.params.questionid },{
            title: req.body.title,
            description: req.body.description,
            user_id: req.decoded.id
        })
        .then((result)=>{
            res.json(result)
        })
        .catch(next)
    }
}

module.exports = QuestionController

