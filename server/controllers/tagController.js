const Tag = require('../models/tagModel')

class TagController{
    static create(req, res, next) {
        let { name } = req.body.name
        Tag.create({
            name
        })
        .then((newTag) => {
            res.status(201).json(newTag)
        })
        .catch(next)
    }

    static read(res, res, next) {
        Tag.find({})
        .then((tags) => {
            res.status(200).json(tags)
        })
        .catch(next)
    }
}

module.exports = TagController