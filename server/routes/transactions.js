const router = require('express').Router();
const Controller = require('../controllers/transactioncontroller');
const Authenticate = require('../middleware/authenticate');
const Authorize = require('../middleware/authorize').transaction;
const AuthorizeAdmin = require('../middleware/authorize').admin;


router.get('/all', Authenticate, AuthorizeAdmin, Controller.findAll);
router.get('/', Authenticate, Authorize, Controller.findMine);
router.patch('/:id', Authenticate, Authorize, Controller.shipped);

module.exports = router;