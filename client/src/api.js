const axios = require('axios')
const ax = axios.create({
    baseURL : 'http://3.17.152.79:3000'
})

module.exports = ax