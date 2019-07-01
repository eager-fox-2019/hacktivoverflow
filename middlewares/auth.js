const { User, Question, Answer } = require('../models/')
const verifyToken = require('../helpers/jwt.js').verifyToken
	
const authentication = (req, res, next) => {
	let token = req.headers.access_token
	// console.log({token})
	if(token) {
		try{
			let decode = verifyToken(token).input
			if(decode){
				req.decode = decode
				next()
			} else {
				//wrong token
				next({status: 403, message:"forbidden access, you are not logged in as this user"})
			}
		} catch (e){
			next({status: 400, message:"error at user token authentication"})
		}
	} else {
		//no token
		next({status: 403, message:"user not logged in"}) //forbidden
	}
}

//authorization user
const authUser = (req, res, next) => {
	let userId = req.decode.id //usually from params

	if (userId){
		User.findOne({_id: userId})
			.then(found => {
				if (!found) {
					throw ({status: 404}) //user not found
				} else if (found._id == req.decode.id){
					//user is registered in our database
					next()
				} else {
					//wrong user
					throw ({status:401}) //unauthorized
				}
			})
			.catch(next)
	} else {
		//no user id parameters
		next({status: 404}) //page not found
	}
}

//authorization question
const authQuestion = (req, res, next) => {
	let userId = req.decode.id
	let questionId = req.params.id
	console.log({userId})
	console.log({req})
	if (questionId){
		Question.findOne({_id: questionId, owner: userId})
			.then(found => {
				if (!found) {
					throw ({status: 404, message: 'question not found'}) //question not found
				} else if (found.owner == userId){
					//question is registered in our database and the owner is the logged in user
					next()
				} else {
					//wrong user
					throw ({status:401, message: 'only the question owner can edit the question'}) //unauthorized
				}
			})
			.catch(next)
	} else {
		//no question id parameters
		next({status: 404, message: 'no question selected'}) //page not found
	}
}

//authorization answer
const authAnswer = (req, res, next) => {
	let userId = req.decode.id
	let answerId = req.params.id

	if (answerId){
		Answer.findOne({_id: answerId})
			.then(found => {
				if (!found) {
					throw ({status: 404, message: 'answer not found'})
				} else if (found.owner.id == userId){
					//answer is registered in our database and the owner is the logged in user
					next()
				} else {
					//wrong user
					throw ({status:401, message: 'only the answer owner can edit the answer'}) //unauthorized
				}
			})
			.catch(next)
	} else {
		next({status: 404, message: 'no answer selected'})
	}
}

module.exports = {
	authentication,
	authUser,
	authQuestion,
	authAnswer
}