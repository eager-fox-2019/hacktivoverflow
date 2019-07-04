const router = require('express').Router();
const Controller = require('../controllers/questioncontroller');
const { AuthorizeQues } = require('../middlewares/auth');

router.post('/', Controller.create);
router.get('/', Controller.find);
router.patch('/:questionId', AuthorizeQues, Controller.update);
router.delete('/:questionId', AuthorizeQues, Controller.delete);
router.patch('/upvote/:questionId', Controller.upvote);
router.patch('/downvote/:questionId', Controller.downvote);

module.exports = router;