const jwt = require('jsonwebtoken')

function sign(data){
    return jwt.sign(data, process.env.SECRET_JWT)
}
function decode(data){
    // console.log(data, "masuk jwt");
    
    return jwt.verify(data, process.env.SECRET_JWT)
}

module.exports = {
    sign,decode
}