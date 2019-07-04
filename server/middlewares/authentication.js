const jwt = require('../helpers/jwt')
const User = require('../models/User')


function authentication(req, res, next){
    // console.log("asdddddddddddddddddddddddddddd");
    
    
    if(req.headers.hasOwnProperty('token')){
        // console.log(req.headers.token);
        
        
        try {
            req.decoded = jwt.decode(req.headers.token)
            // console.log(req.decoded.username, "decode auhten");
            
            User.findOne({username : req.decoded.username})
            .then((gotData)=>{
                if(!gotData){
                    throw {code : 404, message:"user not found"}
                } else {
                    next()
                }
            })
        .catch(next)
          } catch(err) {
            throw {code : 401, message : "Unauthorized"}
          }
        
    } else {
        throw {code : 401, message : "Unauthorized"}
    }
}

module.exports = authentication