# hacktivoverflow



## Geting Started
- npm init
- npm install
- Run `nodemon app.js or npm run dev` to start the server.
- Run `npm run serve` to start the client

## Feature
- Register
- Login
- Logout
- Add Question
- Update Question
- Delete Question
- Upvote Question
- Downvote Question
- Add Answer
- Update Answer
- Delete Answer
- Upvote Answer
- Downvote Answer
- Note:
    - Scoring for vote: if 1 user give upvote and another user give downvote the score is 0


## Routes
### User Route
#### Register

    URL: /users/register
    Method: POST
    Headers: none
    params: none
    body: {name: String, email: String, password: String}
    Success Response: 
        Code 201:
            {
                "_id":"5d10a8fb6776a53e8f8f12ed",
                "name":"Ana",
                "email":"ana@mail.com",
                "password":"$2b$10$iZWscBJjoGT8keRIOthySuwOIFMgIpHChImQtG5ZqdaJ/.MxnD8Fi",
                "__v":0
            }
    Error Response:
        Code 500:
        Content: {message: <error message>}

#### Login

    URL: /users/login
    Method: POST
    Headers: none
    params: none
    body: {email: String, password: String}
    Success Response: 
        Code 200:
            {
                "token":       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMWMxNDIzMjY3YjdiMzMxYzE1ZTFjNCIsImVtYWlsIjoiYW5hQG1haWwuY29tIiwibmFtZSI6ImFuYSIsImlhdCI6MTU2MjEyMTY0MSwiZXhwIjoxNTYyMTI1MjQxfQ.kGmC5R7kMop5EmQFNIlYPyeD7feoHQ8iroqAJ_jaick",
                "userId": "5d1c1423267b7b331c15e1c4",
                "name": "ana"
            }
    Error Response:
        Code 404:
        Content: {message: 'Wrong Email/Password}


### Question Route

#### Create Question

    URL: /questions
    Method: POST
    Headers: token
    params: none
    body: {title: String, descriptions: String}
    Success Response: 
        Code 201:
            {
                "upvotes": [],
                "downvotes": [],
                "_id": "5d1c17300f724e73661f10f2",
                "title": "arti javascript",
                "description": "apakah arti javascript itu?",
                "userId": "5d1c1423267b7b331c15e1c4",
                "createdAt": "2019-07-03T02:47:12.258Z",
                "updatedAt": "2019-07-03T02:47:12.258Z",
                "__v": 0
            }
    Error Response:
        Code 505:
        Content: {message: 'Internal server error'}

#### Find All Question

    URL: /questions
    Method: GET
    Headers: none
    params: none
    body: NONE
    Success Response: 
        Code 200:
            [
                {
                    "upvotes": [],
                    "downvotes": [],
                    "_id": "5d1c17ee0f724e73661f10f3",
                    "title": "error vue #app not found",
                    "description": "saya sudah insert el app tapi masih error",
                    "userId": {
                        "_id": "5d1c1423267b7b331c15e1c4",
                        "name": "ana"
                    },
                    "createdAt": "2019-07-03T02:50:22.322Z",
                    "updatedAt": "2019-07-03T02:50:22.322Z",
                    "__v": 0
                },
                {
                    "upvotes": [],
                    "downvotes": [],
                    "_id": "5d1c17300f724e73661f10f2",
                    "title": "arti javascript",
                    "description": "apakah arti javascript itu?",
                    "userId": {
                        "_id": "5d1c1423267b7b331c15e1c4",
                        "name": "ana"
                    },
                    "createdAt": "2019-07-03T02:47:12.258Z",
                    "updatedAt": "2019-07-03T02:47:12.258Z",
                    "__v": 0
                },
                ......
            ]
    Error Response:
        Code 500:
        Content: {message: <error message>}

#### Find One Question

    URL: /questions/details/:id
    Method: GET
    Headers: none
    params: none
    body: NONE
    Success Response: 
        Code 200:
            {
                "upvotes": [],
                "downvotes": [],
                "_id": "5d1c17ee0f724e73661f10f3",
                "title": "error vue #app not found",
                "description": "saya sudah insert el app tapi masih error",
                "userId": {
                    "_id": "5d1c1423267b7b331c15e1c4",
                    "name": "ana",
                    "email": "ana@mail.com",
                    "password": "$2b$10$Pwy85pNKR8zTltezyTwGZeAVxD31lLKpxdz6kdT/lKIzcYGT4iQuu",
                    "__v": 0
                },
                "createdAt": "2019-07-03T02:50:22.322Z",
                "updatedAt": "2019-07-03T02:50:22.322Z",
                "__v": 0
            }
    Error Response:
        Code 404:
        Content: {message: 'Question not found!'}

#### Update Question

    URL: /questions/:id
    Method: PATCH
    Headers: token
    params: id
    body: {title: String, description: String}
    Success Response: 
        Code 200:
           {
                "upvotes": [],
                "downvotes": [],
                "_id": "5d1c17ee0f724e73661f10f3",
                "title": "error vue #app not found",
                "description": "saya sudah insert el app tapi masih error",
                "userId": "5d1c1423267b7b331c15e1c4",
                "createdAt": "2019-07-03T02:50:22.322Z",
                "updatedAt": "2019-07-03T02:50:22.322Z",
                "__v": 0
            }
    Error Response:
        Code 404:
        Content: {message: 'Question not found!'}

#### Upvotes Question

    URL: /questions/upvotes/:id
    Method: PATCH
    Headers: token
    params: id
    body: NONE
    Success Response:
        Note: response success is data before updated 
        Code 200:
           {
                "upvotes": [],
                "downvotes": [],
                "_id": "5d1c17300f724e73661f10f2",
                "title": "arti javascript",
                "description": "apakah arti javascript itu?",
                "userId": "5d1c1423267b7b331c15e1c4",
                "createdAt": "2019-07-03T02:47:12.258Z",
                "updatedAt": "2019-07-03T04:21:29.277Z",
                "__v": 0
            },
    Error Response:
        Code 404:
        Content: {message: 'Question not found!'},
        Code 400:
        Content: {message: 'You have been vote'}

#### Downvotes Question

    URL: /questions/downvotes/:id
    Method: PATCH
    Headers: token
    params: id
    body: NONE
    Success Response:
        Note: response success is data before updated 
        Code 200:
           {
                "upvotes": [
                    null,
                    "5d1c1423267b7b331c15e1c4"
                ],
                "downvotes": [],
                "_id": "5d1c17ee0f724e73661f10f3",
                "title": "error vue element",
                "description": null,
                "userId": "5d1c1423267b7b331c15e1c4",
                "createdAt": "2019-07-03T02:50:22.322Z",
                "updatedAt": "2019-07-03T03:40:24.052Z",
                "__v": 0
            }
    Error Response:
        Code 404:
        Content: {message: 'Question not found!'},
        Code 400:
        Content: {message: 'You have been vote'}

#### Delete Question

    URL: /questions/:id
    Method: DELETE
    Headers: token
    params: questionid
    body: NONE
    Success Response: 
        Note: response success is data before updated
        Code 200:
           [
                {
                    "n": 0,
                    "ok": 1,
                    "deletedCount": 0
                },
                {
                    "upvotes": [],
                    "downvotes": [
                        "5d1c1423267b7b331c15e1c4"
                    ],
                    "_id": "5d1c17300f724e73661f10f2",
                    "title": "arti javascript",
                    "description": "apakah arti javascript itu?",
                    "userId": "5d1c1423267b7b331c15e1c4",
                    "createdAt": "2019-07-03T02:47:12.258Z",
                    "updatedAt": "2019-07-03T04:24:05.517Z",
                    "__v": 0
                }
            ]
    Error Response:
        Code 404:
        Content: {message: 'Question not found!'}

### Answer Route

#### Create Answer

    URL: /answers
    Method: POST
    Headers: token
    params: none
    body: {title: String, descriptions: String, questionId: ObjectId}
    Success Response: 
        Code 201:
            {
                "upvotes": [],
                "downvotes": [],
                "_id": "5d1c50d42d76691a429f9238",
                "title": "missing element app",
                "description": "check your div id=\"app\" in app.vue",
                "questionId": "5d1c17ee0f724e73661f10f3",
                "userId": "5d1c4924265abf157c687804",
                "createdAt": "2019-07-03T06:53:08.019Z",
                "updatedAt": "2019-07-03T06:53:08.019Z",
                "__v": 0
            }
    Error Response:
        Code 505:
        Content: {message: 'Internal server error'}

#### Find All Answer with Specific Question

    URL: /answers/:id
    Method: GET
    Headers: none
    params: questionId
    body: NONE
    Success Response: 
        Code 200:
            [
                {
                    "upvotes": [],
                    "downvotes": [],
                    "_id": "5d1c50d42d76691a429f9238",
                    "title": "missing element app",
                    "description": "check your div id=\"app\" in app.vue",
                    "questionId": "5d1c17ee0f724e73661f10f3",
                    "userId": "5d1c4924265abf157c687804",
                    "createdAt": "2019-07-03T06:53:08.019Z",
                    "updatedAt": "2019-07-03T06:53:08.019Z",
                    "__v": 0
                },
                {
                    "upvotes": [],
                    "downvotes": [],
                    "_id": "5d1c512b2d76691a429f9239",
                    "title": "need to add element #app",
                    "description": "you need add element #app in app.vue",
                    "questionId": "5d1c17ee0f724e73661f10f3",
                    "userId": "5d1c4924265abf157c687804",
                    "createdAt": "2019-07-03T06:54:35.162Z",
                    "updatedAt": "2019-07-03T06:54:35.162Z",
                    "__v": 0
                },
                ......
            ]
    Error Response:
        Code 500:
        Content: {message: <error message>}

#### Find One Answer

    URL: /answers/details/:id
    Method: GET
    Headers: token
    params: answerId
    body: NONE
    Success Response: 
        Code 200:
            {
                "upvotes": [],
                "downvotes": [],
                "_id": "5d1c50d42d76691a429f9238",
                "title": "missing element app",
                "description": "check your div id=\"app\" in app.vue",
                "questionId": {
                    "upvotes": [
                        null,
                        "5d1c1423267b7b331c15e1c4"
                    ],
                    "downvotes": [],
                    "_id": "5d1c17ee0f724e73661f10f3",
                    "title": "error vue element",
                    "description": null,
                    "userId": "5d1c1423267b7b331c15e1c4",
                    "createdAt": "2019-07-03T02:50:22.322Z",
                    "updatedAt": "2019-07-03T03:40:24.052Z",
                    "__v": 0
                },
                "userId": "5d1c4924265abf157c687804",
                "createdAt": "2019-07-03T06:53:08.019Z",
                "updatedAt": "2019-07-03T06:53:08.019Z",
                "__v": 0
            }
    Error Response:
        Code 404:
        Content: {message: 'Answer not found!'}

#### Update Answer

    URL: /answers/:id
    Method: PATCH
    Headers: token
    params: id
    body: {title: String, description: String}
    Success Response: 
        Code 200:
           {
            "upvotes": [],
            "downvotes": [],
            "_id": "5d1c50d42d76691a429f9238",
            "title": "missing element app",
            "description": "check your div id=\"app\" in app.vue",
            "AnswerId": "5d1c17ee0f724e73661f10f3",
            "userId": "5d1c4924265abf157c687804",
            "createdAt": "2019-07-03T06:53:08.019Z",
            "updatedAt": "2019-07-03T06:53:08.019Z",
            "__v": 0
        }
    Error Response:
        Code 404:
        Content: {message: 'Answer not found!'}

#### Upvotes Question

    URL: /answers/upvotes/:id
    Method: PATCH
    Headers: token
    params: id
    body: NONE
    Success Response:
        Note: response success is data before updated 
        Code 200:
           [
                {
                    "upvotes": [],
                    "downvotes": [],
                    "_id": "5d1c512b2d76691a429f9239",
                    "title": "need to add element #app",
                    "description": "you need add element #app in app.vue",
                    "questionId": "5d1c17ee0f724e73661f10f3",
                    "userId": "5d1c4924265abf157c687804",
                    "createdAt": "2019-07-03T06:54:35.162Z",
                    "updatedAt": "2019-07-03T07:00:05.381Z",
                    "__v": 0
                },
                {
                    "upvotes": [
                        "5d1c4924265abf157c687804"
                    ],
                    "downvotes": [],
                    "_id": "5d1c512b2d76691a429f9239",
                    "title": "need to add element #app",
                    "description": "you need add element #app in app.vue",
                    "questionId": "5d1c17ee0f724e73661f10f3",
                    "userId": "5d1c4924265abf157c687804",
                    "createdAt": "2019-07-03T06:54:35.162Z",
                    "updatedAt": "2019-07-03T07:00:45.634Z",
                    "__v": 0
                }
            ]
    Error Response:
        Code 404:
        Content: {message: 'Answer not found!'},
        Code 400:
        Content: {message: 'You have been vote'}

#### Downvotes Answer

    URL: /answers/downvotes/:id
    Method: PATCH
    Headers: token
    params: id
    body: NONE
    Success Response:
        Note: response success is data before updated 
        Code 200:
           [
                {
                    "upvotes": [],
                    "downvotes": [],
                    "_id": "5d1c50d42d76691a429f9238",
                    "title": "missing",
                    "description": "check your div id=\"app\" in app.vue",
                    "questionId": "5d1c17ee0f724e73661f10f3",
                    "userId": "5d1c4924265abf157c687804",
                    "createdAt": "2019-07-03T06:53:08.019Z",
                    "updatedAt": "2019-07-03T06:57:05.363Z",
                    "__v": 0
                },
                {
                    "upvotes": [],
                    "downvotes": [
                        "5d1c4924265abf157c687804"
                    ],
                    "_id": "5d1c50d42d76691a429f9238",
                    "title": "missing",
                    "description": "check your div id=\"app\" in app.vue",
                    "questionId": "5d1c17ee0f724e73661f10f3",
                    "userId": "5d1c4924265abf157c687804",
                    "createdAt": "2019-07-03T06:53:08.019Z",
                    "updatedAt": "2019-07-03T07:05:46.109Z",
                    "__v": 0
                }
            ]
    Error Response:
        Code 404:
        Content: {message: 'Answer not found!'},
        Code 400:
        Content: {message: 'You have been vote'}

#### Delete Question

    URL: /answers/:id
    Method: DELETE
    Headers: token
    params: answerid
    body: NONE
    Success Response: 
        Code 200:
           {
                "upvotes": [],
                "downvotes": [
                    "5d1c4924265abf157c687804"
                ],
                "_id": "5d1c50d42d76691a429f9238",
                "title": "missing",
                "description": "check your div id=\"app\" in app.vue",
                "questionId": "5d1c17ee0f724e73661f10f3",
                "userId": "5d1c4924265abf157c687804",
                "createdAt": "2019-07-03T06:53:08.019Z",
                "updatedAt": "2019-07-03T07:05:46.109Z",
                "__v": 0
            }
    Error Response:
        Code 404:
        Content: {message: 'Answer not found!'}