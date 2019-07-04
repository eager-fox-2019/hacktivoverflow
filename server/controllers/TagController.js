const Question = require('../models/question')

class TagController {
    static filter(req, res) {
        const tags = req.body.tags.toLowerCase()
        
        Question
        .find({ tags: { $elemMatch: { 
            $regex: tags, 
            $options: 'i' 
        } } })
        .populate('userId', 'username')
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static userTags(req, res) {
        const tags = req.body.tags

        let optRegexp = [];
        
        tags.forEach((opt)=>{
                optRegexp.push(  new RegExp(opt, "i") );
        });

        Question
        .find({ tags: { $in: optRegexp } })
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
