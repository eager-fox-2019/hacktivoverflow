## Documentation

## Register 

- route:
  - `POST /register`
- request:
  - body:
    - `{ name: 'dimitri' , email: 'dimitri@mail.com', password: 'secret' }`
- response:
  - `201`: `{ _id: ObjectId(''), name: 'dimitri', email: 'dimitri@mail.com', password: 'HashedPassword' }`
- error:
  - `Validation Error`

```
- Email is unique, so it is not allowed to have same email in database.

- Password is hashed with bcryptjs.
```

## Login

- route:
  - `POST /login`
- request:
  - body
    - `{ email: 'dimitri@mail.com', password: 'secret' }`
- response:
  - `201`: `{ token: '...' }`
- error:
  - `404 not found`

```
Token is generated from JWT package.
```

## Create Question

- route:
  - `POST /question`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
  - body
    - `{ title, description, category }`
- response
  - `201`: `{
        _id,
        title,
        description,
        category,
        created_at,
        upvotes,
        downvotes,
        UserId
    }`
- error:
  - `Validation Error`

```
Token is decoded via JWT to get UserId.
```

## Read Question

- route:
  - `GET /question`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
  - query
    - `search`   
    - `myQuestion`   
- response
  - `200`: `{
         _id,
        title,
        description,
        category,
        created_at,
        upvotes,
        downvotes,
        UserId
    }`
- error:
  - `500 internal server error`

```
- Token is decoded via JWT to get UserId.

- Query, myQuestion, is used to find specific UserId.

- Query, search, is used to find specific question (from question id).
```

## Update Question

- route:
  - `PATCH /question/:questionId`
- request
  - headers
    - `{ token, access }`
  - decoded
    - `{ id: _id }`
  - params
    - `{ id: questionId }`
  - body
    - `{ title, description, category, upvotes, downvotes }`
- response
  - `200`: `{
        _id,
        title,
        description,
        category,
        created_at,
        upvotes,
        downvotes,
        UserId
    }`
- error:
  - `401 not authorized`

```
User can not update Question that does not belongs to his/her it is authorized in middleware.
```

## Delete Question

- route:
  - `DELETE /question/:questionId`
- request
  - headers
    - `{ token }`
  - params
    - `{ id: questionId }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{ "n" : 1, "ok": 1, "deletedCount": 1 }`
- error:
  - `401 not authorized`

```
User can not delete Question that does not belongs to his/her, it is authorized in middleware.
```


## Create Answer

- route:
  - `POST /answer/:questionId`
- request
  - headers
    - `{ token }`
  - params
    - `{ id: questionId }`
  - decoded
    - `{ id: _id }`
  - body
    - `{ title, comment }`
- response
  - `201`: `{
        _id,
        title,
        comment,
        created_at,
        upvotes,
        downvotes,
        QuestionId,
        UserId
    }`
- error:
  - `Validation Error`

```
Token is decoded via JWT to get UserId.
```

## Read Answer

- route:
  - `GET /answer/:questionId`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
  - query
    - `myAnswer`   
- response
  - `200`: `{
        _id,
        title,
        comment,
        created_at,
        upvotes,
        downvotes,
        QuestionId,
        UserId,
        status
    }`
- error:
  - `500 internal server error`

```
- Token is decoded via JWT to get UserId.

- Helper is used to get status, such as it is yours or other's answer.

- Query, myAnswer, is used to find specific UserId.
```

## Update Answer

- route:
  - `PATCH /answer/:id`
- request
  - headers
    - `{ token, access }`
  - decoded
    - `{ id: _id }`
  - body
    - `{ title, comment }`
- response
  - `200`: `{
        _id,
        title,
        comment,
        created_at,
        upvotes,
        downvotes,
        QuestionId,
        UserId
    }`
- error:
  - `401 not authorized`

```
User can not update Answer that does not belongs to his/her it is authorized in middleware.
```

## Delete Answer

- route:
  - `DELETE /answer/:id`
- request
  - headers
    - `{ token }`
  - decoded
    - `{ id: _id }`
- response
  - `200`: `{ "n" : 1, "ok": 1, "deletedCount": 1 }`
- error:
  - `401 not authorized`

```
User can not delete Answer that does not belongs to his/her, it is authorized in middleware.
```


