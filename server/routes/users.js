const router = require('express').Router();
const Controller = require('../controllers/usercontroller');
const Authenticate = require('../middleware/authenticate');

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/check', Authenticate, Controller.checkLogin)
router.get('/cart', Authenticate, Controller.getCart)
router.patch('/cart', Authenticate, Controller.updateCart)
router.post('/checkout', Authenticate, Controller.checkout)

module.exports = router;