const authentication = require('./authentication');
const authorization = require('./authorization');
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