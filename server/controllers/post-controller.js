const Post = require("../models/post")
class PostController {
    static create (req, res, next) {
        var newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            author: req.body.userId,
            upvotes: [req.body.userId]
        })
        return newPost.save()
        .then(created =>{
            res.status(201).json(created)
        })
        .catch(next)
    }

    static findAll (req, res, next) {
        Post.find({}).populate("author")
        .then(posts =>{
            res.status(201).json(posts)
        })
        .catch(next)
    }

    static findMyPosts (req, res, next) {
        return Post.find({author: req.query.userid}).populate("author")
        .then(posts =>{
            res.status(201).json(posts)
        })
        .catch(next)
    }

    static upvote (req, res, next) {
        Post.findOne({_id: req.body.postId})
        .then(post =>{
            post.upvotes.push(req.body.userId)
            var found = post.downvotes.indexOf(req.body.userId)
            if(found !== -1) {
                post.downvotes.splice(found, 1)
            }
            return post.save()
        })
        .then(upvoted =>{
            res.status(201).json(upvoted)
        })
        .catch(next)
    }

    static downvote (req, res, next) {
        Post.findOne({_id: req.body.postId})
        .then(post =>{
            post.downvotes.push(req.body.userId)
            var found = post.upvotes.indexOf(req.body.userId)
            if(found !== -1) {
                post.upvotes.splice(found, 1)
            }
            return post.save()
        })
        .then(downvoted =>{
            res.status(201).json(downvoted)
        })
        .catch(next)
    }

    static unvote (req, res, next) {
        Post.findOne({_id: req.body.postId})
        .then(post =>{
            post.upvotes = req.body.upvotes
            post.downvotes = req.body.downvotes
            return post.save()
        })
        .then(unvoted =>{
            res.status(201).json(unvoted)
        })
        .catch(next)
        
    }

    static delete (req, res, next) {
        console.log(req.query)
        Post.deleteOne({_id: req.query.postid})
        .then(deleted =>{
            res.status(200).json(deleted)
        })
        .catch(next)
    }

    static update (req, res, next) {
        Post.findOne({_id: req.query.postid})
        .then(post =>{
            post.title = req.body.title,
            post.description = req.body.description
        })
        .catch(next)
    }
}

module.exports = PostController