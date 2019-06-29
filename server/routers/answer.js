const router = require('express').Router()
const answer = require('../controllers/answer')
const auth = require('../middlewares/auth')
const autho = require('../middlewares/autho-answer')

router.get('/list', answer.list);
router.get('/:id', answer.detail);
router.use(auth)
router.post('/create', answer.create);
router.patch('/update/non-detail/:id', answer.updateNonDetail);
router.patch('/update/detail/:id', autho, answer.updateDetail);
router.delete('/delete/:id', autho, answer.delete)

module.exports = router