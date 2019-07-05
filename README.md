# hacktivoverflow


### Cara main
- buat file `.env` dari template `.envTemplate`
- jalankan dev server, masuk ke folder server `npm run dev`

### API Route

::API `POST` harus menggunakan `Content-Type` header dengan nilai `application/json`::

## user

Route | HTTP | Header | BodyJSON / QueryParam | Response | Description | Validation
-- | -- | -- | -- | -- | -- | --
`/user/register` | POST | - | {email, fullName, password} | {_id, email, fullName, password} | register a user | email must be valid, name is more than 1 char
`/user/login` | POST | - | {email, password} | {access_token} | login: get token | -

## question

Route | HTTP | Header | BodyJSON / QueryParam | Response | Description | Validation
-- | -- | -- | -- | -- | -- | --
`/question` | GET | token |  | { user, title, description, upvotes, downvotes, updatedAt, botAnswerTitle, botAnswerLink } | get questions | -
`/question/:id` | GET |  |  | { user, title, description, upvotes, downvotes, updatedAt, botAnswerTitle, botAnswerLink, [answers] } | get questions detial with answers | -
`/question` | POST | token | {title, description} | { user, title, description, upvotes, downvotes, updatedAt, botAnswerTitle, botAnswerLink, [answers] } | post question | -
`/question` | PATCH | token | {title, description} | { user, title, description, upvotes, downvotes, updatedAt, botAnswerTitle, botAnswerLink, [answers] } | update question | -
`/question/action` action = upvote / downvote | PATCH | token | {} | { user, title, description, upvotes, downvotes, updatedAt, botAnswerTitle, botAnswerLink, [answers] } | update question | -
`/question/:id` | DELETE | token | {} | { } | delete question | -

## answer

Route | HTTP | Header | BodyJSON / QueryParam | Response | Description | Validation
-- | -- | -- | -- | -- | -- | --
`/answer` | GET | token |  | { user, title, description, upvotes, downvotes, updatedAt, botAnswerTitle, botAnswerLink } | get answers | -
`/answer/:id` | GET |  |  | { user, title, description, upvotes, downvotes, updatedAt, botAnswerTitle, botAnswerLink, [answers] } | get answers detial with answers | -
`/answer` | POST | token | {title, description} | { user, title, description, upvotes, downvotes, updatedAt, botAnswerTitle, botAnswerLink, [answers] } | post answer | -
`/answer` | PATCH | token | {title, description} | { user, title, description, upvotes, downvotes, updatedAt, botAnswerTitle, botAnswerLink, [answers] } | update answer | -
`/answer/action` action = upvote / downvote | PATCH | token | {} | { user, title, description, upvotes, downvotes, updatedAt, botAnswerTitle, botAnswerLink, [answers] } | update answer | -
`/answer/:id` | DELETE | token | {} | { } | delete answer | -
