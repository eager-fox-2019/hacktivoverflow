// const {
//   decodeToken
// } = require('../helpers');
const decodeToken = require('../helpers/decodeToken')

module.exports = (req, res, next) => {
  if (req.headers.hasOwnProperty('access_token')) {
    
    try {
      const decode = decodeToken(req.headers.access_token);
      req.decode = decode;
      next();
    } catch(e){
      next({
        code: 401
      })
    }
  } else {
    next({
      code: 401
    })
  }
}