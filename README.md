# hacktivoverflow


# User Routes

Routes| Method | Request Body | Response Description | Response Success | Response Error 
------|--------|--------------|----------------------|--------------|---------------
/users/register | POST | { <br> &nbsp; "firstName": String (**required**), <br> &nbsp; "lastName": String (**required**), <br> &nbsp; "username": String (**required**), <br> &nbsp; "email": String (**required**), <br> &nbsp; "password": String (**required**) <br> } | Registers a new user| res status: 201, *user created*  | res.status: 400, *Email has already been registered*
/users/login | POST |  `{ <br> &nbsp; "email": String (**required**), <br> &nbsp; "password": String (**required**) <br> } | login with an existing user*| res status: 200, <br> { <br> &nbsp; "accessToken": (token value) <br> } | res.status: 400, *Username/password incorrect 
/users/decode | POST | { <br> &nbsp; "access_token" : access_token <br>} | decodes jsonwebtoken to retrieve user data | { <br> &nbsp; "id": user._id,  <br> &nbsp; "firstName": user.firstName,  <br> &nbsp; "lastName": user.lastName,  <br> &nbsp; "email": user.email <br>} | res.status: 404, *resource not found*

# Question Routes

Routes| Method | Request Body | Response Description | Response Success | Response Error 
------|--------|--------------|----------------------|--------------|---------------
/questions/all | GET | none | Retrieve array of all posted questions | res.status: 200, [ <br> &nbsp; { <br> &nbsp; "_id": question._id, <br> &nbsp; "question": question title, <br> &nbsp; "description": question.description, <br> &nbsp; "user" : ObjectId user, <br> &nbsp; "upvotes": [ ObjectId upvotes ], <br> &nbsp; "downvotes": [ ObjectId downvotes], <br> &nbsp;  "answers": [ Object Id answers ] <br> &nbsp; } <br> ] | res.status: 500, *internal server error*
/questions | GET | none | Retrieve array of all posted questions based on logged in user | res.status: 200, <br> [ <br> &nbsp; { <br> &nbsp; "_id": question._id, <br> &nbsp; "question": question title, <br> &nbsp; "description": question.description, <br> &nbsp; "user" : ObjectId user, <br> &nbsp; "upvotes": [ ObjectId upvotes ], <br> &nbsp; "downvotes": [ ObjectId downvotes], <br> &nbsp;  "answers": [ Object Id answers ] <br> &nbsp; } <br> ] | res.status: 401, *Unauthorized*
/questions/:id | GET | none | Retrieve question object based on id | res.status: 200, <br> { <br> &nbsp; "_id": question._id, <br> &nbsp; "question": question title, <br> &nbsp; "description": question.description, <br> &nbsp; "user" : ObjectId user, <br> &nbsp; "upvotes": [ ObjectId upvotes ], <br> &nbsp; "downvotes": [ ObjectId downvotes], <br> &nbsp;  "answers": [ Object Id answers ] <br> &nbsp; } | res.status: 404, *Resource not found*
/questions/:id | PATCH | { <br> &nbsp; "question": String (**required**),<br> &nbsp; "description": String (**required**) <br>} | Edits an existing question | res.status: 200, <br> { <br> &nbsp; "_id": question._id, <br> &nbsp; "question": question title, <br> &nbsp; "description": question.description, <br> &nbsp; "user" : ObjectId user, <br> &nbsp; "upvotes": [ ObjectId upvotes ], <br> &nbsp; "downvotes": [ ObjectId downvotes], <br> &nbsp;  "answers": [ Object Id answers ] <br> &nbsp; } | res.status: 401, *Unauthorized*. <br> res.status: 400, *Resource not found*
/questions/:id | DELETE | none | Deletes an existing question based on its id | res.status: 200, *question deleted* | res.status: 401, *Unauthorized*, <br>res.status: 400: *Resource not found*
/questions | POST | { <br> &nbsp; "question": String (**required**),<br> &nbsp; "description" (**required**)<br>} | Submits a question | res.status: 201, <br> { <br> &nbsp; "_id": question._id, <br> &nbsp; "question": question title, <br> &nbsp; "description": question.description, <br> &nbsp; "user" : ObjectId user, <br> &nbsp; "upvotes": [ ], <br> &nbsp; "downvotes": [ ], <br> &nbsp;  "answers":  [] <br> &nbsp; } | res.status: 401, *Unauthorized*<br> res.status: 400, *missing required parameteres*
/questions/vote/:id | PATCH | Upvotes or downvotes question based on client feedback | res.status: 200, *question upvote/downvote arrays updated* | res.status: 401, *Unauthorized*, <br> res.status: 400, *Resource not found*

# Answer routes 

Routes| Method | Request Body | Response Description | Response Success | Response Error 
------|--------|--------------|----------------------|--------------|---------------
/answers | POST | { <br> &nbsp; "title": String (**required**),<br> &nbsp;  "description": String (**required**) <br>} | res.status: 201, { <br> &nbsp; "_id": ObjectId, <br> &nbsp; "title": answer.title, <br> &nbsp; "description": answer.description, <br> &nbsp; "upvotes": [ ObjectId users ], <br> &nbsp;  "downvotes": [ ObjectId users ] <br>} |  res.status: 401, *Unauthorized*
/answers/:id | PATCH | { <br> &nbsp; "title": String (**required**),<br> &nbsp;  "description": String (**required**) <br>} | Edits an existing answer | { <br> &nbsp; "_id": ObjectId, <br> &nbsp; "title": answer.title, <br> &nbsp; "description": answer.description, <br> &nbsp; "upvotes": [ ObjectId users ], <br> &nbsp;  "downvotes": [ ObjectId users ] <br>} | res.status: 401, *Unauthorized*, <br> res.status: 400, *Missing required parameters*
/answers/:id | DELETE | none | Deletes an existing answer based on its id | res.status: 200, *answer deleted successfully* | res.status: 401, *Unauthorized*, res.status: 400, *Resource not found*
/answers/vote/:id | PATCH | { <br> &nbsp; "title": String (**required**),<br> &nbsp; "description": String (**required**) <br>} | Upvotes or downvotes an answer based on client feedback | res.status: 200, *answer upvote/downvote arrays updated* | res.status: 401, *Unauthorized*, res.status: 400, *Resource not found* 