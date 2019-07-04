const Comment = require("../models/comment")
const Post = require("../models/post")

class CommentController {
    static create (req, res, next) {
        var comment = null
        var newComment = new Comment({
            description: req.body.description,
            author: req.body.userId,
            upvotes: [req.body.userId],
            post: req.body.postId
        })
        return newComment.save()
        .then(created =>{
            comment = created
            return Post.findOne({_id: req.body.postId})
        })
        .then(post =>{
            post.comments.push(comment._id)
            return post.save()
        })
        .then(saved =>{
            res.status(201).json(saved)
        })
        .catch(next)
    }

    static findAll (req, res, next) {
        Comment.find({post: req.query.postid}).populate("author")
        .then(comments =>{
            res.status(201).json(comments)
        })
        .catch(next)
    }

    static upvote (req, res, next) {
        Comment.findOne({_id: req.body.commentId})
        .then(comment =>{
            comment.upvotes.push(req.body.userId)
            var found = comment.downvotes.indexOf(req.body.userId)
            if(found !== -1) {
                comment.downvotes.splice(found, 1)
            }
            return comment.save()
        })
        .then(upvoted =>{
            res.status(201).json(upvoted)
        })
        .catch(next)
    }

    static downvote (req, res, next) {
        Comment.findOne({_id: req.body.commentId})
        .then(comment =>{
            comment.downvotes.push(req.body.userId)
            var found = comment.upvotes.indexOf(req.body.userId)
            if(found !== -1) {
                comment.upvotes.splice(found, 1)
            }
            return comment.save()
        })
        .then(downvoted =>{
            res.status(201).json(downvoted)
        })
        .catch(next)
    }

    static unvote (req, res, next) {
        Comment.findOne({_id: req.body.commentId})
        .then(comment =>{
            comment.upvotes = req.body.upvotes
            comment.downvotes = req.body.downvotes
            return comment.save()
        })
        .then(unvoted =>{
            res.status(201).json(unvoted)
        })
        .catch(next)
        
    }

    static del (req, res, next) {
        Post.findOne({_id: req.query.post})
        .then(found =>{
            // console.log(found, req.query.post, "+=========================")
            var index = found.comments.indexOf(req.query.commentid)
            if(index !== -1) {
                found.comments.splice(index, 1)
            }
            return found.save()
        })
        .then(() =>{
        return Comment.deleteOne({_id: req.query.commentid})

        })
        .then(deleted =>{
            res.status(200).json(deleted)
        })
        .catch(next)
    }

    static update (req, res, next) {
        Comment.findOne({_id: req.query.commentid})
        .then(comment =>{
            comment.description = req.body.description
            return comment.save()
        })
        .catch(next)

    }
}

module.exports = CommentController