# hacktivoverflow

# User Docs
Routes| Method | Headers | Request Body | Response Data| Response Error | Description 
------|--------|---------|--------------|--------------|----------------|-------------
`/users/register` | POST | - | firstName:String , lastName:String, email:String, password:String | `{_id ,firstName , lastName , email, password }` | 422 (validation error), 500 (internal server error)| register user
`/users/login` | POST | - | email:String, password:String | `{access_token , user }` | 422 (validation error), 500 (internal server error)| login user


# Question Docs
Routes| Method | Headers | Request Body | Response Data| Response Error | Description 
------|--------|---------|--------------|--------------|----------------|-------------
`/questions` | POST | token | title:String **required** , description:Number **required**, author:ObjectId, upvotes:Array, downvotes:Array, answers:array | `{_id ,title , description , author, upvotes, downvotes, answers }` | 422 (validation error), 500 (internal server error)| add question data into database
`/questions` | GET | - | - | `[{_id ,title , description , author, upvotes, downvotes, answers }]` | 404 (Not found), 401 (Unauthorized user), 500 (internal server error)  | get list of questions
`/questions/:questionId` | PATCH | token | title:String **required** , description:Number **required**, author:ObjectId, upvotes:Array, downvotes:Array, answers:array  | `{n ,ok , updatedCount }` | 404 (Not found), 401 (Unauthorized user), 500 (internal server error)  | edit a question base on its id
`/questions/votes/:questionId` | PATCH | token | title:String **required** , description:Number **required**, author:ObjectId, upvotes:Array, downvotes:Array, answers:array  | `{n ,ok , updatedCount }` | 404 (Not found), 401 (Unauthorized user), 500 (internal server error)  | edit a question specificly for updating upvote and downvote
`/questions/:questionId` | DELETE | token | - | `{n ,ok , deletedCount }` | 404 (Not found), 401 (Unauthorized user), 500 (internal server error)  | delete a question base on its id

# Answer Docs
Routes| Method | Headers | Request Body | Response Data| Response Error | Description 
------|--------|---------|--------------|--------------|----------------|-------------
`/answers` | POST | token | title:String **required** , description:Number **required**, author:ObjectId, upvotes:Array, downvotes:Array | `{_id ,title , description , author, upvotes, downvotes }` | 422 (validation error), 500 (internal server error)| add answer data into database
`/answers` | GET | - | - | `[{_id ,title , description , author, upvotes, downvotes }]` | 404 (Not found), 401 (Unauthorized user), 500 (internal server error)  | get list of answers
`/answers/:answerId` | PATCH | token | title:String **required** , description:Number **required**, author:ObjectId, upvotes:Array, downvotes:Array  | `{n ,ok , updatedCount }` | 404 (Not found), 401 (Unauthorized user), 500 (internal server error)  | edit an answer base on its id
`/answers/votes/:answerId` | PATCH | token | title:String **required** , description:Number **required**, author:ObjectId, upvotes:Array, downvotes:Array | `{n ,ok , updatedCount }` | 404 (Not found), 401 (Unauthorized user), 500 (internal server error)  | edit an answer specificly for updating upvote and downvote
`/answers/:answerId` | DELETE | token | - | `{n ,ok , deletedCount }` | 404 (Not found), 401 (Unauthorized user), 500 (internal server error)  | delete an answer base on its id