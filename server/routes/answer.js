const router = require('express').Router();
const Controller = require('../controllers/answercontroller');
const { AuthorizeAns } = require('../middlewares/auth');

router.post('/:questionId', Controller.create);
router.get('/:questionId', Controller.find);
router.patch('/:id', AuthorizeAns, Controller.update);
router.delete('/:id', AuthorizeAns, Controller.delete);
router.patch('/upvote/:id', Controller.upvote);
router.patch('/downvote/:id', Controller.downvote);

module.exports = router;