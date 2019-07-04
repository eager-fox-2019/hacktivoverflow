const Answer = require('../models/answer')

class AnswerController{
    static fetch(req,res,next){
        Answer.find({question_id: req.params.questionid}).populate('user_id').exec(function (err, data) {
            if(err){
                next
            }else{
                res.status(200).json(data)
            }
        })
    }

    static create(req,res,next){
        console.log(req.body);
        
        Answer.create({
            description: req.body.description,
            question_id: req.body.questionid,
            user_id: req.decoded.id
        })
        .then(newdata =>{
            res.status(201).json(newdata)
        })
        .catch(next)
    }

    static updateDownVote(req, res, next) {
        console.log('masuk');
        
        console.log(req.params);
        
        Answer.findById(req.params.answerid, function (err, data) {
            if (err) {
                next
            } else {
                if(data.downvotes.includes(req.decoded.id)){
                    Answer.updateOne({_id: req.params.answerid},{$pull: { downvotes: req.decoded.id }},{new:true})
                    .then((result)=>{
                        console.log(result);
                        res.json(result)
                    })
                    .catch(next)

                }else if(data.upvotes.includes(req.decoded.id)){
                        Answer.updateOne({ _id: req.params.answerid }, { $pull: { upvotes: req.decoded.id } }, {new:true})
                        .then((result)=>{
                            console.log(result);
                            return Answer.updateOne({ _id: req.params.answerid }, { $push: { downvotes: req.decoded.id } })                
                        })
                        .then((result)=>{
                            console.log(result);
                            res.json(result)
                        })
                        .catch(next)
                    }
                    else{
                        Answer.updateOne({ _id: req.params.answerid }, { $push: { downvotes: req.decoded.id } })
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
        Answer.findById(req.params.answerid, function (err, data) {
            if (err) {
                next
            } else {
                if(data.upvotes.includes(req.decoded.id)){
                    Answer.updateOne({_id: req.params.answerid},{$pull: { upvotes: req.decoded.id }},{new:true})
                    .then((result)=>{
                        console.log(result);
                        res.json(result)
                    })
                    .catch(next)

                }else if(data.downvotes.includes(req.decoded.id)){
                        Answer.updateOne({ _id: req.params.answerid }, { $pull: { downvotes: req.decoded.id } }, {new:true})
                        .then((result)=>{
                            console.log(result);
                            return Answer.updateOne({ _id: req.params.answerid }, { $push: { upvotes: req.decoded.id } })                
                        })
                        .then((result)=>{
                            console.log(result);
                            res.json(result)
                        })
                        .catch(next)
                    }
                    else{
                        Answer.updateOne({ _id: req.params.answerid }, { $push: { upvotes: req.decoded.id } })
                        .then((result)=>{
                            console.log(result);
                            res.json(result)
                        })
                        .catch(next)
                    }
                }
        })
    }
    static EditAnswer(req,res,next){
        console.log(req.body);
        
        Answer.updateOne({ _id: req.params.answerid },{
            description: req.body.description,
            user_id: req.decoded.id
        })
        .then((result)=>{
            res.json(result)
        })
        .catch(next)
    }
}

module.exports= AnswerController

