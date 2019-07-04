const axios = require('axios').create({
    baseURL : 'http://localhost:3000/',
    headers : {
        access_token : localStorage.getItem('access_token')
    }
})

module.exports = axios
