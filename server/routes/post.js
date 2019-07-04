const express = require('express');
const Router = express.Router();
const postController = require('../controllers/postCon')
// const { Authentication, Authorization } = require('../middlewares/auth')

// Router.use(Authentication)
Router.get('/', postController.list)
Router.get('/id/:id', postController.findByPostId)
Router.get('/userId', postController.findByUserId)
Router.post('/', postController.create)
Router.put('/:id', postController.update)
Router.put('/addcomment/:id', postController.addComment)
Router.put('/upvotes/:id', postController.upvotes)
Router.put('/downvotes/:id', postController.downvotes)
Router.delete('/:id', postController.delete)

module.exports = Router;