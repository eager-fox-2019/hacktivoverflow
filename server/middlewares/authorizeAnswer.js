const answer = require('../models/answer')
module.exports = function(req,res,next){
    // let todoId = req.params.id 
    // let userId = req.loggedUser.id
    answer.findById(req.params.answerId)
    .then(answer =>{
        if(answer.userId.toString() === req.loggedUser.id.toString()){
            next()
        }else{
            next({code : 401, message : `you're not authorized`})
        }
    })
    .catch(next)
}