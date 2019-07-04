const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
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
	owner: { 
		type: Schema.Types.ObjectId, 
		ref: 'User'
	},
	dateAdded: {
		type: Date,
		default: Date.now()
	}
});

const Question = mongoose.model('Question', questionSchema)

module.exports = Question