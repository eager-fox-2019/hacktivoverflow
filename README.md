# hacktivoverflow

Feature and Endpoint

### 1. Login

| method | routes                        | detail                                                       |
| ------ | ----------------------------- | ------------------------------------------------------------ |
| POST    | /users/login                    |        user login to system                                    |

> input: "email" & "password",
> expected output : code 200, accesstoken

### 2. Register
| method | routes                        | detail                                                       |
| ------ | ----------------------------- | ------------------------------------------------------------ |
| POST    | /users/register                    |        create new user                                   |
> input: "email" & "password" & "username"
> expected output : code 201, object user 


### 3. Home
| method | routes                        | detail                                                       |
| ------ | ----------------------------- | ------------------------------------------------------------ |
| GET    | /questions                    |        show all question based-on user_id                                   |
> expected output : code 200, array of object question 

#####need auth
| GET    | /questions/myquestion                    |        show all question based-on user_id who logged in to system                                   |
> expected output : code 200, array of object question 

| POST    | /questions                    |        create new question                                  |
> input: title,description,user_id
> expected output : code 201, object question
 
| DELETE    | /questions/:questionid                    |        delete one question                                 |
> expected output : code 200

| PUT    | /questions/:questionid                    |        edit one question                                 |
> expected output : code 200

| PATCH    | /questions/upvotes/:questionid                   |        to upvote one questions                                 |
> expected output : code 200
| PATCH    | /questions/downvotes/:questionid                   |        to downvote one questions                                 |
> expected output : code 200

### 4. Answer
| GET    | /answers                    |        get all answer based on question_id                                  |
> expected output : code 200, object answers

#####need auth
| POST    | /answers                    |        create answer                                  |
> input: description, user_id, question_id
> expected output : code 201, object answers
 
| PUT    | /answers/:answerid                   |        edit one answer                                 |
> expected output : code 200

| DELETE    | /answers/:answerid                   |        delete one answer                                 |
> expected output : code 200
| PATCH    | /answers/upvotes/:answerid                   |        to upvote one answer                                 |
> expected output : code 200
| PATCH    | /answers/downvotes/:answerid                   |        to downvote one answer                                 |
> expected output : code 200