const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
	title: {
		type: String,
		default: "no title"
	},
	description: {
		type: String,
		default: "no description"
	},
	upvotes: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'User'
	}],
	downvotes: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'User'
	}],
	question: {
		type: Schema.Types.ObjectId,
		ref: 'Question'
	},
	owner: { 
		type: Schema.Types.ObjectId, 
		ref: 'User'
	}
});

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer