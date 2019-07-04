## Getting Started
Please follow this through before you start and use the server.
1. Run this script in the terminal to install all dependencies
```
npm install
```
2. Create .env file. You could copy paste value in .env, from .env-template.
- JWT_TOKEN is used for package
- CLIENT_ID is used for google oAuth. You could get it here https://developers.google.com/identity/sign-in/web/sign-in
- DATABASE_CONNECTION is uri of mongodb

3. Run this in your terminal to start the server
```
npm start
```

# Route
## User
### Register Customer
Register new customer as default login path, not using third party oAuth.
URL : /users/register
Method : Post
Request Header : NONE
Request Body : 
```
{
  full_name: Robby Caesar Putra,
  username: robbycp,
  password; robbycp,
  email: robby@mail.com,
  admin: false
}
```
Success Status Code : 201
Success Response : No Response
Error Status Code : 400, 500
Error Response :
```
{
  message: 'User validation failed: username: robbycp is already in our database. Please use other username. email: robby@mail.com is already in our database. Please use other email'
}
```
### Login Customer
Login for both default login or oAuth google login. The difference is in the request body.
URL : /users/login
Method : Post
Request Header : NONE
Request Body : 
```
{
  username: robbycp,
  password; robbycp,
  login_type: 'default'
}
```
Success Status Code : 200
Success Response : 
```
{ 
  token: 'jsfiowjoefi29sd9d8fsa0aef890ewf8s9a',
}
```
### Logout Customer
Logout for both default login user and google login user
URL : /users/register
Method : Post
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body : NONE
Success Status Code : 201
Success Response : 
```
{
  message: 'Successfully log out'
}
```
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
### MyProfile Customer
Get login user basic profile data : full name, username, and email
URL : /users/myprofile
Method : Post
Request Header : 
```
{
  token: 'sd9f90a8f9e0fda0dfas0d9f8eew0f98sd90fa09f'
}
```
Request Body : NONE
Success Status Code : 200
Success Response : 
```
{ 
  full_name: 'robby caesar putra',
  username: 'robbycp',
  email: 'robby@gmail.com',
  admin: true
}
```
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```

## Questions
### Get All Questions
Get all listed questions created by users and all data related like author data, answers data, author of the answers data.
URL : /questions
Method : GET 
Request Body : NONE
Success Status Code : 200
Success Response : 
```
[
    {
        "answers": [],
        "upvotes": [],
        "downvotes": [],
        "_id": "5d1da6416c03864cdbafa082",
        "title": "How to be awesome?",
        "content": "I'm having a problem how to be awesome",
        "user_id": {
            "_id": "5d198a497e1a21546a8ec7b5",
            "full_name": "Robby Caesar Putra",
            "email": "robbycaesar@gmail.com",
            "username": "robbycp"
        },
        "createdAt": "2019-07-04T07:09:53.400Z",
        "updatedAt": "2019-07-04T07:09:53.400Z",
        "__v": 0
    },
    {...}
]
```
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```

### Create One Question
Create one question.
URL : /questions
Method : POST
Header : 
```
{
  "token": "jfeiwfjoidsuf98asf79wefefweu8fw98fnufe89weuf98weuef"
}
```
Request Body : 
```
{
  "title": "How to be awesome?",
  "content": "I'm having problem to be an awesome guy"
}
```
Success Status Code : 200
Success Response : 
```
{
    "answers": [],
    "upvotes": [],
    "downvotes": [],
    "_id": "5d1dd2fade1bea7f41db44a0",
    "title": "test",
    "content": "test",
    "user_id": "5d198a497e1a21546a8ec7b5",
    "createdAt": "2019-07-04T10:20:42.568Z",
    "updatedAt": "2019-07-04T10:20:42.568Z",
    "__v": 0
}
```
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```

### Get One Question Data
Get one question data with all answers data (including author of answer data) and the question author data.
URL : /questions/:id
Method : GET
Success Status Code : 200
Success Response : 
```
{
    "answers": [],
    "upvotes": [],
    "downvotes": [],
    "_id": "5d1dd2fade1bea7f41db44a0",
    "title": "test",
    "content": "test",
    "user_id": "5d198a497e1a21546a8ec7b5",
    "createdAt": "2019-07-04T10:20:42.568Z",
    "updatedAt": "2019-07-04T10:20:42.568Z",
    "__v": 0
}
```
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
### Update Question
Update one question data. This route could only be accessed by the author of the quetion.
URL : /questions/:id
Method : PUT
Headers: 
```
{
  token: '02921019ejfsdfsnfs0f9we0wsdjfjf0ew9'
}
```
Request body: 
{
  title: 'test updated',
  content: 'test',
}
Success Status Code : 200
Success Response : 
```
{
    "answers": [],
    "upvotes": [],
    "downvotes": [],
    "_id": "5d1dd2fade1bea7f41db44a0",
    "title": "test updated",
    "content": "test",
    "user_id": "5d198a497e1a21546a8ec7b5",
    "createdAt": "2019-07-04T10:20:42.568Z",
    "updatedAt": "2019-07-04T10:20:42.568Z",
    "__v": 0
}
```
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
### Delete Question
Delete one question. This route could only be accessed by the author of the quetion.
URL : /questions/:id
Method : DELETE
Headers: 
```
{
  token: '02921019ejfsdfsnfs0f9we0wsdjfjf0ew9'
}
```
Request body: NONE
Success Status Code : 200
Success Response : NONE
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
### Upvote a question
Upvote one question. If the user have voted, will arise an error. And if the user have downvoted, it will changed to upvote.
URL : /questions/:id/upvote
Method : POST
Headers: 
```
{
  token: '02921019ejfsdfsnfs0f9we0wsdjfjf0ew9'
}
```
Request body: NONE
Success Status Code : 200
Success Response : 
```
{
    "answers": [
        "5d1c5b79bc20f6469782afc9",
        "5d1c6a9e5d562251f7a3bd9f"
    ],
    "upvotes": [
        "5d198a497e1a21546a8ec7b5"
    ],
    "downvotes": [],
    "_id": "5d1c4abeb691ea39e30090d9",
    "title": "How to post something here? edit",
    "content": "I'm having trouble post question here please help me edit",
    "user_id": "5d198a497e1a21546a8ec7b5",
    "createdAt": "2019-07-03T06:27:10.812Z",
    "updatedAt": "2019-07-04T10:32:26.763Z",
    "__v": 47
}
```
Error Status Code : 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
Error Status Code : 400
Error Response :
```
{
  "message": "You've upvote this answer"
}
```
### Downvote a question
Downvote one question. If the user have voted, will arise an error. And if the user have upvoted, it will changed to downvote.
URL : /questions/:id/downvote
Method : POST
Headers: 
```
{
  token: '02921019ejfsdfsnfs0f9we0wsdjfjf0ew9'
}
```
Request body: NONE
Success Status Code : 200
Success Response : 
```
{
    "answers": [
        "5d1c5b79bc20f6469782afc9",
        "5d1c6a9e5d562251f7a3bd9f"
    ],
    "upvotes": [
        "5d198a497e1a21546a8ec7b5"
    ],
    "downvotes": [],
    "_id": "5d1c4abeb691ea39e30090d9",
    "title": "How to post something here? edit",
    "content": "I'm having trouble post question here please help me edit",
    "user_id": "5d198a497e1a21546a8ec7b5",
    "createdAt": "2019-07-03T06:27:10.812Z",
    "updatedAt": "2019-07-04T10:32:26.763Z",
    "__v": 47
}
```
Error Status Code : 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
Error Status Code : 400
Error Response :
```
{
  "message": "You've upvote this answer"
}
```
### Get all questions one user
Get all questions that have been made by one user
URL : /questions/users/:userid
Method : GET
Headers: NONE
Request body: NONE
Success Status Code : 200
Success Response : 
```
[
    {
        "answers": [
            "5d1c5b79bc20f6469782afc9",
            "5d1c6a9e5d562251f7a3bd9f"
        ],
        "upvotes": [],
        "downvotes": [
            "5d198a497e1a21546a8ec7b5"
        ],
        "_id": "5d1c4abeb691ea39e30090d9",
        "title": "How to post something here? edit",
        "content": "I'm having trouble post question here please help me edit",
        "user_id": {
            "_id": "5d198a497e1a21546a8ec7b5",
            "full_name": "Robby Caesar Putra",
            "email": "robbycaesar@gmail.com",
            "password": "$2a$10$q45pF87Cma5LbWikekzzxeuIDWv1Ehhlx77Pbkj1WU4QzEPEeaczS",
            "username": "robbycp",
            "createdAt": "2019-07-01T04:21:29.811Z",
            "updatedAt": "2019-07-01T04:21:29.811Z",
            "__v": 0
        },
        "createdAt": "2019-07-03T06:27:10.812Z",
        "updatedAt": "2019-07-04T10:35:45.891Z",
        "__v": 48
    },
    {...}
]
```
Error Status Code : 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```

## Answers
### Create One Answer
Create one Answer for one question.
URL : /answers
Method : POST
Header : 
```
{
  "token": "jfeiwfjoidsuf98asf79wefefweu8fw98fnufe89weuf98weuef"
}
```
Request Body : 
```
{
  "title": "How to be awesome?",
  "content": "I'm having problem to be an awesome guy",
  "question_id": "414j5io12ij21ijoi323432ijo"
}
```
Success Status Code : 200
Success Response : 
```
{
    "upvotes": [],
    "downvotes": [],
    "_id": "5d1dd7c6de1bea7f41db44a1",
    "title": "test",
    "content": "test",
    "user_id": "5d198a497e1a21546a8ec7b5",
    "question_id": "5d1c4abeb691ea39e30090d9",
    "createdAt": "2019-07-04T10:41:10.526Z",
    "updatedAt": "2019-07-04T10:41:10.526Z",
    "__v": 0
}
```
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
### Update Answer
Update one answer data related to one quetion. This route could only be accessed by the author of the quetion.
URL : /answers/:id
Method : PUT
Headers: 
```
{
  token: '02921019ejfsdfsnfs0f9we0wsdjfjf0ew9'
}
```
Request body: 
{
  title: 'test updated',
  content: 'test',
}
Success Status Code : 200
Success Response : 
```
{
    "answers": [],
    "upvotes": [],
    "downvotes": [],
    "_id": "5d1dd2fade1bea7f41db44a0",
    "title": "test updated",
    "content": "test",
    "user_id": "5d198a497e1a21546a8ec7b5",
    "createdAt": "2019-07-04T10:20:42.568Z",
    "updatedAt": "2019-07-04T10:20:42.568Z",
    "__v": 0
}
```
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
### Delete Answer
Delete one answer. This route could only be accessed by the author of the quetion.
URL : /answers/:id
Method : DELETE
Headers: 
```
{
  token: '02921019ejfsdfsnfs0f9we0wsdjfjf0ew9'
}
```
Request body: NONE
Success Status Code : 200
Success Response : NONE
Error Status Code : 400, 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
### Upvote an answer
Upvote one answer. If the user have voted, will arise an error. And if the user have downvoted, it will changed to upvote.
URL : /answers/:id/upvote
Method : POST
Headers: 
```
{
  token: '02921019ejfsdfsnfs0f9we0wsdjfjf0ew9'
}
```
Request body: NONE
Success Status Code : 200
Success Response : 
```
{
    "answers": [
        "5d1c5b79bc20f6469782afc9",
        "5d1c6a9e5d562251f7a3bd9f"
    ],
    "upvotes": [
        "5d198a497e1a21546a8ec7b5"
    ],
    "downvotes": [],
    "_id": "5d1c4abeb691ea39e30090d9",
    "title": "How to post something here? edit",
    "content": "I'm having trouble post question here please help me edit",
    "user_id": "5d198a497e1a21546a8ec7b5",
    "createdAt": "2019-07-03T06:27:10.812Z",
    "updatedAt": "2019-07-04T10:32:26.763Z",
    "__v": 47
}
```
Error Status Code : 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
Error Status Code : 400
Error Response :
```
{
  "message": "You've upvote this answer"
}
```
Error status code : 404
Error response : 
```
{
  message: 'Answer not found'
}
```
### Downvote an answer
Downvote one answer. If the user have voted, will arise an error. And if the user have upvoted, it will changed to downvote.
URL : /answers/:id/downvote
Method : POST
Headers: 
```
{
  token: '02921019ejfsdfsnfs0f9we0wsdjfjf0ew9'
}
```
Request body: NONE
Success Status Code : 200
Success Response : 
```
{
    "answers": [
        "5d1c5b79bc20f6469782afc9",
        "5d1c6a9e5d562251f7a3bd9f"
    ],
    "upvotes": [
        "5d198a497e1a21546a8ec7b5"
    ],
    "downvotes": [],
    "_id": "5d1c4abeb691ea39e30090d9",
    "title": "How to post something here? edit",
    "content": "I'm having trouble post question here please help me edit",
    "user_id": "5d198a497e1a21546a8ec7b5",
    "createdAt": "2019-07-03T06:27:10.812Z",
    "updatedAt": "2019-07-04T10:32:26.763Z",
    "__v": 47
}
```
Error Status Code : 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
Error Status Code : 400
Error Response :
```
{
  "message": "You've upvote this answer"
}
```
Error status code : 404
Error response : 
```
{
  message: 'Answer not found'
}
```
### Get all answers one user
Get all answers that have been made by one user
URL : /answers/users/:userid
Method : GET
Headers: NONE
Request body: NONE
Success Status Code : 200
Success Response : 
```
[
    {
        "upvotes": [],
        "downvotes": [
            "5d198a497e1a21546a8ec7b5"
        ],
        "_id": "5d1c5b79bc20f6469782afc9",
        "title": "Kok bodo kali anjing",
        "content": "testing bangsat",
        "user_id": {
            "_id": "5d198a497e1a21546a8ec7b5",
            "full_name": "Robby Caesar Putra",
            "email": "robbycaesar@gmail.com",
            "username": "robbycp"
        },
        "question_id": "5d1c4abeb691ea39e30090d9",
        "createdAt": "2019-07-03T07:38:33.652Z",
        "updatedAt": "2019-07-04T10:43:41.294Z",
        "__v": 6
    },
    {...}
]
```
Error Status Code : 500
Error Response :
```
{
  message: 'Internal Server Error'
}
```
