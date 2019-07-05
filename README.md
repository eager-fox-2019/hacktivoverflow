# hacktivoverflow

Welcome to HacktivOverflow 
before you start please follow this step to use this app.
thankyou

````
npm install
````

## USER
how to acces user routes and show the feedback if error and if success
| method | route | authentication | authorization | on success | on error | description |
|--------|-------|----------------|---------------|------------|----------|-------------|
| POST | /users/login| - | - | status (200) json (token)| status (500) json (errors) | to login into the apps |
| POST | /users/register| - | - | status(200) json (new user Data) | status (500) json (errors) | to make a new account int the apps |
 
 
## QUESTION
| method | route | authentication | authorization | on success | on error | description |
|--------|-------|----------------|---------------|------------|----------|-------------|
| GET | /questions/all| - | - | status (200) json (allquestion)| status (500) json (errors) | to fetch all question inside database|
| GET | /questions/one/:questionId| - | - | status (200) json (one question)| status (500) json (errors) | to fetch a question by question id|
| POST | /questions/add | required | - | status (201) json (created question)| status (500) json (errors) | to create a question|
| PATCH | /questions/upVote/:id | required | - | status (200) json (updated question data)| status (500) json (errors) | to make up vote in question|
| PATCH | /questions/downVote/:id | required | - | status (200) json (updated question data)| status (500) json (errors) | to make down vote in question | 
| PATCH | /questions/update/:questionId | required | required | status (200) json (updated question data)| status (500) json (errors) | to edit a question | 
| DELETE | /questions/delete/:questionId | required | required | status (200) json (deleted question data)| status (500) json (errors) | to delete a question | 


## ANSWER
| method | route | authentication | authorization | on success | on error | description |
|--------|-------|----------------|---------------|------------|----------|-------------|
| GET | /answers/all| - | - | status (200) json (all Answer)| status (500) json (errors) | to fetch all answer of a question inside database|
| POST | /answers/add/:questionId | required | - | status (201) json (created question)| status (500) json (errors) | to create an answer from a|
| PATCH | /answers/upVote/:id | required | - | status (200) json (updated answer data)| status (500) json (errors) | to make up vote for an answer form a question|
| PATCH | /answers/downVote/:id | required | - | status (200) json (updated answer data)| status (500) json (errors) | to make down vote for an answer form a question | 
| PATCH | /answers/update/:questionId | required | required | status (200) json (updatedanswer data)| status (500) json (errors) | to edit an answer | 
| DELETE | /answers/delete/:questionId | required | required | status (200) json (deleted question data)| status (500) json (errors) | to delete an answer | 


©yudawardana2019