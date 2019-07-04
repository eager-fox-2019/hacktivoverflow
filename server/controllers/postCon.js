const { decoded } = require('../helpers/jwt')
const Post = require('../models/post')
const Comment = require('../models/comment')

class PostController {
    static list(req, res, next) {
        Post.find({})
        .then(data => {
            res.status(200).json(data.sort(function(a,b){return b.createdAt - a.createdAt}))
        })
        .catch(next)
    }

    static findByPostId(req, res, next) {
        Post.findById(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findByUserId(req, res, next) {
        let token = decoded(req.headers.token)
        Post.find({userId : token.id})
        .then(data => {
            res.status(200).json(data.sort(function(a,b){return b.createdAt - a.createdAt}))
        })
        .catch(next)
    }

    static create(req, res, next) {
        let token = decoded(req.headers.token)
        let obj = {
            title: req.body.title,
            desc: req.body.desc,
            upvotes: [],
            downvotes: [],
            userId: token.id,
        }
        Post.create(obj)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static update(req, res, next) {
        let token = decoded(req.headers.token)
        let obj = {
            title: req.body.title,
            desc: req.body.desc,
            upvotes: req.body.upvotes,
            downvotes: req.body.downvotes,
            answer: req.body.answer,
            userId: token.id,
        }
        console.log(obj)
        Post.findOne({_id : req.params.id})
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

    static addComment(req, res, next) {
        let id =req.params.id
        Post.findByIdAndUpdate(id, 
            {$push:
                {answer: req.body.idComment}
            },
            { new:true }
        )
        .then(updated => {
            res.status(200).json( { data: updated } )
        })
        .catch(next)
    }

    static upvotes(req, res, next) {
        let token = decoded(req.headers.token)
        Post.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                let id = req.params.id
                let checkUpvotes = data.upvotes.includes(token.id)
                let checkDownvotes = data.downvotes.includes(token.id)

                if (checkUpvotes) {
                    Post.findByIdAndUpdate(id,
                        {$pull:
                            {upvotes: token.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                } else if (!checkUpvotes && checkDownvotes) {
                    Post.findByIdAndUpdate(req.params.id,
                        {$pull:
                            {downvotes: token.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        // res.status(200).json( { data: updated } )
                        Post.findByIdAndUpdate(req.params.id,
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
                    Post.findByIdAndUpdate(req.params.id,
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
        Post.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                let id = req.params.id
                let checkUpvotes = data.upvotes.includes(token.id)
                let checkDownvotes = data.downvotes.includes(token.id)

                if (checkDownvotes) {
                    Post.findByIdAndUpdate(id,
                        {$pull:
                            {downvotes: token.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                } else if (checkUpvotes && !checkDownvotes) {
                    Post.findByIdAndUpdate(req.params.id,
                        {$pull:
                            {upvotes: token.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        // res.status(200).json( { data: updated } )
                        Post.findByIdAndUpdate(req.params.id,
                            {$push:
                                {downvotes: token.id}
                            },
                            {new:true}
                        )
                        .then( updated => {
                            res.status(200).json( { data: updated } )
                        })
                    })
                } else if (!checkUpvotes && !checkDownvotes) {
                    Post.findByIdAndUpdate(req.params.id,
                        {$push:
                            {downvotes: token.id}
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

    static delete(req, res, next) {
        Post.findById(req.params.id)
        .then(post => {
            if (post.answer < 1) {
                Post.findByIdAndDelete(req.params.id)
                .then(data => {
                    if (!data) res.status(404).json({ message: 'Not Found' })
                        else res.status(200).json(req.params.id)
                })
                .catch(next)
            } else {
                Post.findByIdAndDelete(req.params.id)
                .then(data => {
                    Comment.deleteMany({ postId : data._id})
                    .then(datas => {
                        console.log(datas)
                    })
                    .catch(next)
                }) 
                .catch(next)
            }
        })
        .catch(next)
    }
}
module.exports = PostController