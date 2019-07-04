const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorizationQuestion');
const verifyPassword = require('./verifyPassword');
const encryptPassword = require('./encryptPassword');
const generateToken = require('./generateToken');
const decodeToken = require('./decodeToken');

module.exports = {
  authentication,
  authorization,
  verifyPassword,
  encryptPassword,
  generateToken,
  decodeToken
};