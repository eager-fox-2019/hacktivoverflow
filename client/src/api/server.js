const axios = require('axios').create({
    baseURL : 'http://13.229.70.19',
    headers : {
        access_token : localStorage.getItem('access_token')
    }
})

module.exports = axios
