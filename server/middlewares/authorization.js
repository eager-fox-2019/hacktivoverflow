const jwt = require('../helpers/jwt')
const Question = require('../models/Question')


function authorization(req, res, next){
    // let decodeToken = jwt.decode(req.headers.token)
    Question.findById(req.params.id)    
    .then((gotData)=>{
        if(gotData){
            if(gotData.UserId == req.decoded.id){
                next()
            } else {
                throw {code : 401, message : "Unauthorized"}
            }
        } else {
        }
    })
    .catch(next)
}

module.exports = authorization