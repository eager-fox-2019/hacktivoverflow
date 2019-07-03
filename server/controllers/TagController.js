const Question = require('../models/question')

class TagController {
    static filter(req, res) {
        const tags = req.body.tags

        Question
        .find({ tags: { $in: [tags] } })
        .populate('userId', 'username')
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TagController
