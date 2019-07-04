const axios = require('axios')

class ControllerJob {
   static find(req, res, next) {
    axios.get('https://jobs.github.com/positions.json?description=javascript&page=1')
        .then(({ data }) => {
          res.status(200).json(data)
        })
        .catch(next)
   }
}

module.exports = ControllerJob