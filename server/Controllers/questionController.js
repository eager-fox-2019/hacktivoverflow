const Question = require('../Models/questionModel')
const Answer = require('../Models/aswerModel')
class questionController{
    static create(req, res, next){
        console.log('sampai sini?')
        let {title, description, upvotes, downvotes} = req.body
        let newQuestion = new Question({title, description, upvotes, downvotes, userId : req.decode.id})
        Question.create(newQuestion)
        .then(created => {
            console.log('CREATED    ')
            res.status(201).json(created)
        })
        .catch(next)
    }
    static showAll(req, res, next){
        Question.find({}).populate('answer').populate('userId')
        .then(allData => {
            res.status(201).json(allData)
        })
        .catch(next)
    }
    static generateAnswer(req, res, next){
        let anser = null
        let {title, description} = req.body
        let newAnswer = new Answer({userId : req.decode.id, title, description})
        Answer.create(newAnswer)
        .then(ans => {
            anser = ans
            return Question.findOne({
                _id : req.params.idQuestion
            }).populate('userId')
        })
        .then(compile => {
            compile.answer.push(anser)
            compile.save()
            res.status(201).json(compile)
        })
        .catch(next)
    }
    static findOne(req, res, next){
        console.log('kok ga masuk sini lagi?')
        Question.findOne({
            _id : req.params.Qid
        }).populate({
            path : 'answer',
            populate : {
                path : 'userId'
            }
        }).populate("userId")
        .then(getOne =>{
            res.status(200).json(getOne)
        })
        .catch(next)
    }
    static Qupvote(req, res, next){
        console.log('sampe mana?')
        Question.findOne({_id : req.params.Qid})
        .then(data => {
            console.log(data, 'ini data')
            // res.json(data)
            if(data.downvotes.indexOf(req.decode.id) !== -1){
                return Question.findByIdAndUpdate({_id : req.params.Qid}, {
                    $pull: {downvotes : req.decode.id}
                })
            }else if(data.upvotes.indexOf(req.decode.id) === -1){
                return Question.findByIdAndUpdate({_id : req.params.Qid}, {
                    $push: {upvotes : req.decode.id}
                })
            }else{
                return Question.findByIdAndUpdate({_id : req.params.Qid}, {
                    $pull: {upvotes : req.decode.id}
                })
            }
        })
        .then(final => {
            res.status(200).json({final})
        })
        .catch(next)
    }
    static Qdownvote(req, res, next){
        console.log('sampai?')
        Question.findOne({_id : req.params.Qid})
        .then(data => {
            // console.log(data, 'ini data')
            // res.json(data)
            if(data.upvotes.indexOf(req.decode.id) !== -1){
                return Question.findByIdAndUpdate({_id : req.params.Qid}, {
                    $pull: {upvotes : req.decode.id}
                })
            }else if(data.downvotes.indexOf(req.decode.id) === -1){
                return Question.findByIdAndUpdate({_id : req.params.Qid}, {
                    $push: {downvotes : req.decode.id}
                })
            }else{
                return Question.findByIdAndUpdate({_id : req.params.Qid}, {
                    $pull: {downvotes : req.decode.id}
                })
            }
        })
        .then(final => {
            res.status(200).json({final})
        })
        .catch(next)
    }
    static Qedit(req, res, next){
        console.log('here?', req.body.title, req.body.description)
        let updated = {}
        let msg = 'updated'
        if(req.body.title){
            updated.title = req.body.title
        }
        if(req.body.description){
            updated.description = req.body.description
        }
        Question.findOneAndUpdate({
            _id : req.params.Qid
        }, { $set: updated }, { new: true })
        .then(() => {
            res.json(msg)
        })
        .catch(next)
    }
    static Qdelete(req, res, next){
        Question.deleteOne({
            _id : req.params.Qid
        })
        .then(()=>{
            res.status(200).json('question was deleted')
        })
        .catch(next)
    }
}

module.exports = questionController


// static setUpvote(req, res){
//     Answer.findById(req.params.id)
//         .then(ans => {
//             let flag = true
//             let index = null
//             ans.upvote.forEach((el, i) => {
//                 if(el == req.loggedUser._id){
//                     flag = false
//                     index = i
//                 }
//             })
//             if(flag){
//                 let idx = 0
//                 ans.downvote.forEach((el, i) => {
//                     if(el == req.loggedUser._id){
//                         flag = false
//                         idx = i
//                     }
//                 })
//                 if(flag){
//                     ans.upvote.push(req.loggedUser._id)
//                     return ans.save()
//                 } else {
//                     ans.downvote.splice(idx, 1)
//                     ans.upvote.push(req.loggedUser._id)
//                     return ans.save()
//                 }
//             } else{
//                 ans.upvote.splice(index, 1)
//                 return ans.save()
//             }
//         })
//         .then(saved => {
//             res.json(saved)
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json(err)
//         })
// }
// static setDownvote(req, res){
//     Answer.findById(req.params.id)
//         .then(ans => {
//             let flag = true
//             let index = null
//             ans.downvote.forEach((el, i) => {
//                 if(el == req.loggedUser._id){
//                     flag = false
//                     index = i
//                 }
//             })
//             if(flag){
//                 let idx = 0
//                 ans.upvote.forEach((el, i) => {
//                     if(el == req.loggedUser._id){
//                         flag = false
//                         idx = i
//                     }
//                 })
//                 if(flag){
//                     ans.downvote.push(req.loggedUser._id)
//                     return ans.save()
//                 } else {
//                     ans.upvote.splice(idx, 1)
//                     ans.downvote.push(req.loggedUser._id)
//                     return ans.save()
//                 }
//             } else{
//                 ans.downvote.splice(index, 1)
//                 return ans.save()
//             }
//         })
//         .then(saved => {
//             res.json(saved)
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json(err)
//         })
// }
// Collapse



// Message Input


// Message Fadlul Azmi