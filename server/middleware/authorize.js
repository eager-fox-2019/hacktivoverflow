const Transaction = require('../models/transaction');

module.exports = {
  admin: (req, res, next) => {
    if(req.userData.email === 'admin@m.com') {
      next();
    } else {
      console.log('Authorization failed');
      next({ status: 403, msg: "Unauthorized" });
    }
  },
  transaction: (req, res, next) => {
    Transaction.findById(req.params.id)
      .exec()
      .then(transaction => {
        if(String(transaction.buyer) === String(req.userData.id)) {
          next();
        } else {
          console.log('Authorization failed');
          next({ status: 403, msg: "Unauthorized" });
        }
      })
      .catch(next)
  },
}