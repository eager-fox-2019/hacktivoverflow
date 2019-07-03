const {
    hash,
    verify
} = require('../helpers/jwtoken')
const userModel = require('../models/userModel')

module.exports = {
    authentication: function (req,res,next) {
        let token = req.headers.token
        if(!token){
            throw ({code: 400, message: `Unauthenticated`})
        }
        else {
            let decode = verify(token)
            userModel
                .findOne({
                    emial: decode.email
                })
                .then((found)=> {
                    let decode = verify(token)
                    req.decode = decode
                    req.user = found
                    next()
                })
                .catch((err)=> {
                    throw ({ code: 404, message: `User not found`})
                })
        }
    },
    authorization: function (rqe,res,next) {
        
    }
}
