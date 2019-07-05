# hacktivoverflow

Link:

## [overflow.m43max.xyz](http://overflow.m43max.xyz/)

## Running the server

Run the following commands:

```bash
  cd server/
  npm install
  npm start
```

## API Documentation (server)
| Route                          | HTTP Method | Headers(s)     | Body                                 | Description                                                  |
| ------------------------------ | ----------- | -------------- | ------------------------------------ | ------------------------------------------------------------ |
| /register                      | POST        | none           | name<br>email<br>password            | Register a new user                                          |
| /login                         | POST        | none           | email<br>password                    | Login a user                                                 |
| /question                      | POST        | `token: token` | title<br>description<br>tags (array) | Create a question                                            |
| /question                      | GET         | `token: token` | none                                 | Get all questions, or get a single question (req.query.search) |
| /question/:questionId          | PATCH       | `token: token` | title<br/>description
tags (array)    | Update a question                                            |
| /question/:questionId          | DELETE      | `token: token` | none                                 | Delete a question                                            |
| /question/upvote/:questionId   | PATCH       | `token: token` | none                                 | Upvote a question (or remove upvote if already upvoted)      |
| /question/downvote/:questionId | PATCH       | `token: token` | none                                 | Downvote a question (or remove downvote if already downvoted) |
| /answer/:questionId            | POST        | `token: token` | title<br>comment                     | Create a new answer                                          |
| /answer/:questionId            | GET         | `token: token` | none                                 | Get all answers for a specific question, or only my answers<br>for a specific question (req.query.myAnswer) |
| /answer/:id                    | PATCH       | `token: token` | title<br/>comment                    | Edit an answer                                               |
| /answer/:id                    | DELETE      | `token: token` | none                                 | Delete an answer                                             |
| /answer/upvote/:id             | PATCH       | `token: token` | none                                 | Upvote an answer (or remove upvote if already upvoted)       |
| /answer/downvote/:id           | PATCH       | `token: token` | none                                 | Downvote an answer (or remove downvote if already downvoted) |
