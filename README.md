# __HACKTIV OVERFLOW__
---
## __A. Installation__
1. clone this repository.
2. open the `/server` folder of this repo on the terminal and then run `npm install` on the terminal to install all of the dependencies.
3. `npm run dev` or `npm run start` on the terminal.
---

## __B. Features__
If you want to try deployed version this is the link =>
http://noviirna-overflow.site/

1. This app is following stack overflow function.
2. Users can ask questions and answer questions.
3. Also, users can upvote or downvote other users questions/answers. But can not upvote or down vote its own questions/answers.
4. Every monday on 8 am (Jakarta time), all users will be receiving question of the week a.k.a question with the most upvotes on this site,(using scheduled time and background jobs using redis, kue, and cron package).
5. User can have watched tags to get custom feeds that only had their interest based by tag that user have choosen.

## __C. API Documentation__

### C.1. Register new user
- Method & Route
	  - `POST` /users/register 
- Request
    - HEADERS
    - BODY
        ```
            {
                username: String [required | unique]
                email: String [required | unique ]
                password: String [required | minlength 8 | maxlength 16]
            }
        ```    
    - PARAMS
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `201`
        ```
            {
                watchedTags: Array,
                _id: String,
                username: String,
                email: String,
                password: String,
            }
        ```
    - ON ERROR : HTTP RESPONSE `400` or `500`
        ```
            {
                message : String
            }
        ```

### C.2. Log In
- Method & Route
	  - `POST` /users/login 
- Request
    - HEADERS
    - BODY
        ```
            {
                name: String [required]
                password: String [required]
            }
        ```    
    - PARAMS
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `200`
        ```
            {
                token: String,
                user: {
                    _id: String,
                    email: String,
                    username: String,
                    watchedTags: Array
                }
            }
        ```
    - ON ERROR : HTTP RESPONSE `400` `500`
        ```
            {
                message : String
            }
        ```
    
### C.3. Add / Remove watched Tags
- Method & Route
	  - `PUT` /users/:id (is the user ID)
- Request
    - HEADERS
        ```
            {
                token : String [required]
            }
        ```
    - BODY
        ```
            {
                watchedTags: Array
            }
        ```    
    - PARAMS => `:id`
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `200`
        ```
            {
                _id: String,
                email: String,
                username: String,
                watchedTags: Array
            }
        ```
    - ON ERROR : HTTP RESPONSE `400` `403` `500`
        ```
            {
            message : String
            }
        ```

### C.4. Create new question
- Method & Route
	  - `POST` /questions 
- Request
    - HEADERS
        ```
            {
                token : String [required]
            }
        ```
    - BODY
        ```
            {
                upvotes : Array,
                downvotes : Array,
                title : String,
                description : String,
                userId : String,
                tags : Array
            }
        ```    
    - PARAMS
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `201`
        ```
            {
                _id : String,
                upvotes : Array,
                downvotes : Array,
                title : String,
                description : String,
                createdAt: Timestamp,
                updatedAt: Timestamp,
                userId : ObjectId,
                tags : Array
            }
        ```
    - ON ERROR : HTTP RESPONSE `400` `403` `500`
        ```
            {
            message : String
            }
        ```
        
### C.5. Create new answer
- Method & Route
	  - `POST` /answers 
- Request
    - HEADERS
        ```
            {
                token : String [required]
            }
        ```
    - BODY
        ```
            {
                questionId: String
                upvotes : Array,
                downvotes : Array,
                title : String,
                description : String,
                userId : String,
            }
        ```    
    - PARAMS
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `201`
        ```
            {
                questionId: String
                upvotes : Array,
                downvotes : Array,
                title : String,
                description : String,
                userId : String,
                createdAt: Timestamp,
                updatedAt: Timestamp,
            }
        ```
    - ON ERROR : HTTP RESPONSE `400` `403` `500`
        ```
            {
            message : String
            }
        ```
        
### C.6. Get all questions
- Method & Route
	  - `GET` /questions 
- Request
    - HEADERS
    - BODY
    - PARAMS
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `200`
        ```
        [    {
                _id : String,
                upvotes : Array,
                downvotes : Array,
                title : String,
                description : String,
                createdAt: Timestamp,
                updatedAt: Timestamp,
                userId : ObjectId,
                tags : Array
        }   ]
        ```
    - ON ERROR : HTTP RESPONSE `400` `403` `500`
        ```
            {
            message : String
            }
        ```

### C.6. Get all answers from a question
- Method & Route
	  - `GET` /answers/:id 
- Request
    - HEADERS
    - BODY
    - PARAMS => `:id` is the question ID
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `200`
        ```
            [    
                {
                    questionId: String
                    upvotes : Array,
                    downvotes : Array,
                    title : String,
                    description : String,
                    userId : String,
                    createdAt: Timestamp,
                    updatedAt: Timestamp,
                }   
            ]
        ```
    - ON ERROR : HTTP RESPONSE `400` `403` `500`
        ```
            {
            message : String
            }
        ```

### C.7. Delete a question
- Method & Route
	  - `DELETE` /questions/:id 
- Request
    - HEADERS
    - BODY
    - PARAMS => `:id` is the question ID
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `200`
        ```
            {
                _id : String,
                upvotes : Array,
                downvotes : Array,
                title : String,
                description : String,
                createdAt: Timestamp,
                updatedAt: Timestamp,
                userId : ObjectId,
                tags : Array
            }
        ```
    - ON ERROR : HTTP RESPONSE `400` `403` `500`
        ```
            {
            message : String
            }
        ```

### C.8. Update a question
- Method & Route
	  - `PUT` /questions/:id
- Request
    - HEADERS
        ```
            {
                token : String [required]
            }
        ```
    - BODY
        ```
            {
                upvotes : Array,
                downvotes : Array,
                title : String,
                description : String,
                userId : String,
                tags : Array
            }
        ```    
    - PARAMS => `:id` is the question Id
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `200`
        ```
            {
                _id : String,
                upvotes : Array,
                downvotes : Array,
                title : String,
                description : String,
                createdAt: Timestamp,
                updatedAt: Timestamp,
                userId : ObjectId,
                tags : Array
            }
        ```
    - ON ERROR : HTTP RESPONSE `400` `403` `500`
        ```
            {
            message : String
            }
        ```
        
### C.9. Update an answer
- Method & Route
	  - `PUT` /answers/:id
- Request
    - HEADERS
        ```
            {
                token : String [required]
            }
        ```
    - BODY
        ```
            {
                questionId: String
                upvotes : Array,
                downvotes : Array,
                title : String,
                description : String,
                userId : String,
            }
        ```    
    - PARAMS => `:id` is the answer Id
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `200`
        ```
            {
                questionId: String
                upvotes : Array,
                downvotes : Array,
                title : String,
                description : String,
                userId : String,
                createdAt: Timestamp,
                updatedAt: Timestamp,
            }
        ```
    - ON ERROR : HTTP RESPONSE `400` `403` `500`
        ```
            {
            message : String
            }
        ```
        
### C.10. Upvote / Downvote a question
- Method & Route
	  - `PUT` /questions/ud/:id
- Request
    - HEADERS
        ```
            {
                token : String [required]
            }
        ```
    - BODY
        ```
            {
                upvotes : Array,
                downvotes : Array,
            }
        ```    
    - PARAMS => `:id` is the question Id
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `200`
        ```
            {
                _id : String,
                upvotes : Array,
                downvotes : Array,
                title : String,
                description : String,
                createdAt: Timestamp,
                updatedAt: Timestamp,
                userId : ObjectId,
                tags : Array
            }
        ```
    - ON ERROR : HTTP RESPONSE `400` `403` `500`
        ```
            {
            message : String
            }
        ```
        
### C.11. Upvote / Downvote an answer
- Method & Route
	  - `PUT` /answers/ud/:id
- Request
    - HEADERS
        ```
            {
                token : String [required]
            }
        ```
    - BODY
        ```
            {
                upvotes : Array,
                downvotes : Array,
            }
        ```    
    - PARAMS => `:id` is the answer Id
    - QUERY
- Response
    - ON SUCCESS : HTTP RESPONSE `200`
        ```
            {
                questionId: String
                upvotes : Array,
                downvotes : Array,
                title : String,
                description : String,
                userId : String,
                createdAt: Timestamp,
                updatedAt: Timestamp,
            }
        ```
    - ON ERROR : HTTP RESPONSE `400` `403` `500`
        ```
            {
            message : String
            }
        ```