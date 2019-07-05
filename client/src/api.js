const axios = require('axios')
const ax = axios.create({
    baseURL : 'http://18.221.211.144'
})

module.exports = ax