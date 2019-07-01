const axios = require('axios')

const ax = axios.create({
  baseURL: 'http://hacktiv-overflow-server.lyxcious.xyz'
})

export default ax
