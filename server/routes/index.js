const router = require("express").Router();
const { Authenticate } = require('../middlewares/auth');

router.use('/', require('./users'));
router.use(Authenticate);
router.use('/question', require('./question'));
router.use('/answer',  require('./answer'));

module.exports = router;