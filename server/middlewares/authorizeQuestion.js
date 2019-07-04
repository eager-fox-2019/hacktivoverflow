const question = require('../models/question')
module.exports = function(req,res,next){
    // let todoId = req.params.id 
    // let userId = req.loggedUser.id
    question.findById(req.params.questionId)
    .then(question =>{
        if(question.userId.toString() === req.loggedUser.id.toString()){
            next()
        }else{
            next({code : 401, message : `you're not authorized`})
        }
    })
    
}