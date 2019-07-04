const express = require('express');
const Router = express.Router();
const postRoutes = require('./post');
const userRoutes = require('./user');
const commentRoutes = require('./comment');

// Resource routes
Router.use('/users', userRoutes);
Router.use('/posts', postRoutes);
Router.use('/comments', commentRoutes);

module.exports = Router;