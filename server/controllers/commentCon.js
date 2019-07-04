const { decoded } = require('../helpers/jwt')
const Comment = require('../models/comment')

class CommentController {
    static create(req, res, next) {
        let token = decoded(req.headers.token)
        let obj = {
            title: req.body.title,
            desc: req.body.desc,
            upvotes: 0,
            downvotes: 0,
            userId: token.id,
            postId: req.body.postId
        }
        Comment.create(obj)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findByUserId(req, res, next) {
        let token = decoded(req.headers.token)
        Comment.find({userId : token.id})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findByPostId(req, res, next) {
        Comment.find({postId : req.params.id})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static update(req, res, next) {
        let obj = {
            title: req.body.title,
            desc: req.body.desc,
            upvotes: 0,
            downvotes: 0,
            userId: token.id,
            postId: req.body.postId
        }
        Comment.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                data.set(obj)
                return data.save()
            }
        }) 
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static upvotes(req, res, next) {
        let token = decoded(req.headers.token)
        Comment.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                let id = req.params.id
                let checkUpvotes = data.upvotes.includes(token.id)
                let checkDownvotes = data.downvotes.includes(token.id)
                if (checkUpvotes) {
                    Comment.findByIdAndUpdate(id,
                        {$pull:
                            {upvotes: token.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                } else if (!checkUpvotes && checkDownvotes) {
                    Comment.findByIdAndUpdate(req.params.id,
                        {$pull:
                            {downvotes: token.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        // res.status(200).json( { data: updated } )
                        Comment.findByIdAndUpdate(req.params.id,
                            {$push:
                                {upvotes: token.id}
                            },
                            {new:true}
                        )
                        .then( updated => {
                            res.status(200).json( { data: updated } )
                        })
                    })
                } else if (!checkUpvotes && !checkDownvotes) {
                    Comment.findByIdAndUpdate(req.params.id,
                        {$push:
                            {upvotes: token.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                }
            }
        })
        .catch(next)
    }

    static downvotes(req, res, next) {
        let token = decoded(req.headers.token)
        Comment.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                let id = req.params.id
                let checkUpvotes = data.upvotes.includes(token.id)
                let checkDownvotes = data.downvotes.includes(token.id)

                if (checkDownvotes) {
                    Comment.findByIdAndUpdate(id,
                        {$pull:
                            {downvotes: token.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json(updated)
                    })
                } else if (checkUpvotes && !checkDownvotes) {
                    Comment.findByIdAndUpdate(req.params.id,
                        {$pull:
                            {upvotes: token.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        // res.status(200).json( { data: updated } )
                        Comment.findByIdAndUpdate(req.params.id,
                            {$push:
                                {downvotes: token.id}
                            },
                            {new:true}
                        )
                        .then( updated => {
                            res.status(200).json(updated)
                        })
                    })
                } else if (!checkUpvotes && !checkDownvotes) {
                    Comment.findByIdAndUpdate(req.params.id,
                        {$push:
                            {downvotes: token.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json(updated)
                    })
                }
            }
        })
        .catch(next)
    }
}
module.exports = CommentController