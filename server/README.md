# Hacktive Overflow
----------------------------------------

## Endpoint

### *Doesn't Require Token*

#### User Routes
| Routes| Method | Request Body | Response Data| Response Error | Description |
|----------------------|--------|-----------------------------|-----------------------------------|--|---------------------------------------------------------------|
| `/user/register`| POST | `{ name, email, password }` | `{ token }` | 400 (`{email}` has been registered!) <br>400 (`{email}` is not a valid email!) <br> 400 (Password must be more or equal than 8 character!) <br> 500 (Internal Server Error) |Register with new user info|
| `/user/login` | POST | `{ email, password }`| `{ name, token }`| 400 (Wrong email/password) <br> 500 (Internal Server Error) | Login and get an access token and name |
| `/user/signingoogle` | POST | `{ id_token }` | `{ name, token }` | 500 (Internal Server Error)  | Sign in with Google and get an access token, name, new password |

### Question Routes

####  *Doesn't Require Token*
| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/question/list`| GET | -| `{ data }`| 500 (Internal Server Error) | Get all the questions |
| `/question/detail/:id` | GET | -| `{ data }`| 404 (question with id `{ :id }` not found!)<br> 500 (Internal Server Error) | Get question match with id |

#### *Require Token* (`{ headers: { token } }`) 
| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/question/create`| POST | `{ title, desc }` | `{ data }`| 400 (Invalid Token) <br> 400 (Question must have a title!) <br> 400 (Question must be have description!) <br> 401 (Please login first) <br> 404 (User not found) <br> 500 (Internal Server Error) | Create question (authenticated user only) |
| `/question/update/non-detail/:id` | PATCH | `{ upvote (user id), downvote (user id) , answer (answer id) }` (all optional) | `{ data }` | 400 (Invalid Token) <br> 401 (Please login first) <br> 404 (User not found) <br> 404 (Question with id `{ :id }` not found!) <br> 500 (Internal Server Error) | Update a question (authenticated user only) |
| `/question/update/detail/:id` | PATCH | `{ title, desc }` (all optional) | `{ data }` | 400 (Invalid Token)<br> 400 (question must have a title!) <br> 400 (question must have description!) <br> 401 (Please login first)  <br> 403 (Unauthorize) <br> 404 (User not found) <br> 404 (Question with id `{ :id }` not found!)  <br> 500 (Internal Server Error) | Update a question (owner only) |
| `/question/delete/:id` | DELETE | - | `{ result }` | 400 (Invalid Token)<br> 401 (Please login first) <br> 401 (Unauthorized) <br> 404 (User not found) <br> 404 (Question with id `{ :id }` not found!) <br> 500 (Internal Server Error) | Delete a question (owner only) |

### Answer Routes

####  *Doesn't Require Token*
| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/answer/list`| GET | -| `{ data }`| 500 (Internal Server Error) | Get all the answers |
| `/answer/detail/:id` | GET | -| `{ data }`| 404 (Answer with id `{ :id }` not found!)<br> 500 (Internal Server Error) | Get answer match with id |

#### *Require Token* (`{ headers: { token } }`) 
| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/answer/create`| POST | `{ title, desc }` | `{ data }`| 400 (Invalid Token) <br> 400 (Answer must have a title!) <br> 400 (Answer must be have description!) <br> 401 (Please login first) <br> 404 (User not found) <br> 500 (Internal Server Error) | Create answer (authenticated user only) |
| `/answer/update/non-detail/:id` | PATCH | `{ upvote (user id), downvote (user id) , answer (answer id) }` (all optional) | `{ data }` | 400 (Invalid Token) <br> 401 (Please login first) <br> 404 (User not found) <br> 404 (Answer with id `{ :id }` not found!) <br> 500 (Internal Server Error) | Update a answer (authenticated user only) |
| `/answer/update/detail/:id` | PATCH | `{ title, desc }` (all optional) | `{ data }` | 400 (Invalid Token)<br> 400 (Answer must have a title!) <br> 400 (Answer must have description!) <br> 401 (Please login first)  <br> 403 (Unauthorize) <br> 404 (User not found) <br> 404 (Answer with id `{ :id }` not found!)  <br> 500 (Internal Server Error) | Update a answer (owner only) |
| `/answer/delete/:id` | DELETE | - | `{ result }` | 400 (Invalid Token)<br> 401 (Please login first) <br> 401 (Unauthorized) <br> 404 (User not found) <br> 404 (Answer with id `{ :id }` not found!) <br> 500 (Internal Server Error) | Delete a answer (owner only) |