# hacktivoverflow
---

## CLIENT

```
$ npm i
// for development
$ npm run serve
// for production
$ npm run build
```

## SERVER
---

### Deploy

[hacktiv-oveflow.jays.best](http://hacktiv-oveflow.jays.best/)

### Usage
- make file .env from .env-template
- run code :
```
  $ npm install
```
- then just run this code to enable the server :
```
  $ npm run dev
```

### REST-API Routes

User and Question

| Route                  | HTTP   | HEADER | body/params                              | Response                                       | Description                            | Validation                                                 |
|------------------------|--------|--------|------------------------------------------|------------------------------------------------|----------------------------------------|------------------------------------------------------------|
| api/users/register     | POST   | -      | {username, email, password}              | {_id, username, email, password}               | register a user                        | email and username must be unique, and email must be valid |
| api/users/login        | POST   | -      | {email, password}                        | {token, user: {id, username, email} }          | login user to get token authentication | -                                                          |
| api/questions          | GET    | -      | -                                        | [{id, title, content, upvote, downvote, user}] | get questions                          | -                                                          |
| api/questions          | POST   | token  | {title, content}                         | {id, title, content, upvote, downvote, user}   | make new question                      | -                                                          |
| api/questions/:id      | DELETE | token  | {id}                                     | -                                              | delete one question based on id        | -                                                          |
| api/questions/:id      | PATCH  | token  | {id}                                     | {id, title, content, upvote, downvote, user}   | edit/update question                   | -                                                          |
| api/questions/vote/:id | PATCH  | token  | params : {id}   body: {upvote, downvote} | {id, title, content, upvote, downvote, user}   | update upvote or downvote              | -                                                          |
|                        |        |        |                                          |                                                |                                        |                                                            |
|                        |        |        |                                          |                                                |                                        |                                                            |



Answer 

| Route                | HTTP   | HEADER | body/params                                | Response                                           | Description                         | Validation |
|----------------------|--------|--------|--------------------------------------------|----------------------------------------------------|-------------------------------------|------------|
| api/answers          | GET    | -      | -                                          | [{_id, content, upvote, downvote, question, user}] | get all answers                     | -          |
| api/answers/:id      | POST   | -      | Body: {content} <br> Params: {id question} | {_id, content, upvote, downvote, question, user    | post new answer                     | -          |
| api/answers/vote/:id | PATCH  | -      | Params: {id answer}                        | {_id, content, upvote, downvote, question, user}   | update upvote or downvote an answer | -          |
| api/answers/:id      | PATCH  | -      | params: {id answer}                        | {_id, content, upvote, downvote, question, user}   | for update content                  | -          |
| api/answers/:id      | DELETE | -      | params: {id answer}                        | {_id, content, upvote, downvote, question, user}   | delete one answer based on id       | -          |
|                      |        |        |                                            |                                                    |                                     |            |