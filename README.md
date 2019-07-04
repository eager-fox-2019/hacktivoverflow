# Flowwit (HacktivOverflow)
----------------------------------------
## deployed at : http://flowwit.fildabert.com
## baseUrl: http://localhost:3000/api


## Endpoint



#### User Routes
### *Doesn't Require Token*
| Routes| Method | Request Body | Response Data| Response Error | Description |
|----------------------|--------|-----------------------------|-----------------------------------|--|---------------------------------------------------------------|
| `/users/register`| POST | `{ name, email, password }` | `{ token }` | 400 (`{email}` has been registered!) <br>400 (`{email}` is not a valid email!) <br> 500 (Internal Server Error) |Register with new user info|
| `/users/login` | POST | `{ username, password }`| `{ name, token }`| 400 (Invalid Email/Password) <br> 500 (Internal Server Error) | Login and get an access token and name |

### Post Routes

####  *Doesn't Require Token*
| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/posts/all`| GET | -| `{ data }`| 500 (Internal Server Error) | Get all posts |


#### *Require Token* (`{ headers: { access_token } }`) 
| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/posts/add`| POST | `{ title, desc }` | `{ data }`| 400 (Invalid Token) <br> 400 (Post cannot be empty) <br> 400 (Description cannot be empty) <br> 401 (Login first) <br> 404 (User not found) <br> 500 (Internal Server Error) | Create Post (authenticated user only) |
| `/posts/upvote` | PUT | `{ postId, userId }`  | `{ data }` | 400 (Invalid Token) <br> 401 (Please login first) <br> 404 (User not found) <br> 404 (Post with id `{ :id }` not found!) <br> 500 (Internal Server Error) | Update a Post (authenticated user only) |
| `/posts/downvote` | PUT | `{ postId, userId }` | `{ data }` | 400 (Invalid Token) <br> 401 (Login first) <br> 500 (Internal Server Error) | Downvotes a post |
| `/posts/delete` | DELETE | - | `{ result }` | 400 (Invalid Token)<br> 401 (Login first) <br> 401 (Unauthorized) <br> 404 (User not found) <br> 404 (Post with id `{ :id }` not found!) <br> 500 (Internal Server Error) | Delete a Post (owner only) |

### Comments Routes

####  *Doesn't Require Token*
| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/comments/all`| GET | `{postId}`| `{ data }`| 500 (Internal Server Error) | Get all comments |

#### *Require Token* (`{ headers: { access_token } }`) 
| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/comments/add`| POST | `{ title, desc }` | `{ data }`| 400 (Invalid Token) <br> 400 (comment cannot be empty) <br> 400 (Description cannot be empty) <br> 401 (Login first) <br> 404 (User not found) <br> 500 (Internal Server Error) | Create Comment (authenticated user only) |
| `/comments/upvote` | PUT | `{ commentId, userId }`  | `{ data }` | 400 (Invalid Token) <br> 401 (Please login first) <br> 404 (User not found) <br> 404 (Comment with id `{ :id }` not found!) <br> 500 (Internal Server Error) | Update a Comment (authenticated user only) |
| `/comments/downvote` | PUT | `{ commentId, userId }` | `{ data }` | 400 (Invalid Token) <br> 401 (Login first) <br> 500 (Internal Server Error) | Downvotes a comment |
| `/comments/delete` | DELETE | - | `{ result }` | 400 (Invalid Token)<br> 401 (Login first) <br> 401 (Unauthorized) <br> 404 (User not found) <br> 404 (Comment with id `{ :id }` not found!) <br> 500 (Internal Server Error) | Delete a Comment (owner only) |
| `/comments/edit?commentid={commentid}`| PUT | `{ description }`| `{ data }`| 500 (Internal Server Error) <br> 401 (Login First) <br> 400 (Comment description cannot be empty)| Edits a selected comment |
