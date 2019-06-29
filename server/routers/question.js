const router = require('express').Router()
const question = require('../controllers/question')
const auth = require('../middlewares/auth')
const autho = require('../middlewares/autho-question')

router.get('/list', question.list);
router.get('/:id', question.detail);
router.use(auth)
router.post('/create', question.create);
router.patch('/update/non-detail/:id', question.updateNonDetail);
router.patch('/update/detail/:id', autho, question.updateDetail);
router.delete('/delete/:id', autho, question.delete)

module.exports = router