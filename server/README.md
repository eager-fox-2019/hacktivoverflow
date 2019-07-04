# HACTIVE OVERFLOW
## Route List :

#### User route

Route | HTTP | Header(s) | Body | Description
----- | ---- | --------- | ---- | -----------
/api/user/register | POST | none | name: String, email: string (**required**), password: string | Register new user. return newly created user data
/api/user/login | POST | none | email: string (**required**), password: string (**required**) | Login. return token, name, and email
/api/user/glogin | POST | none | none | Login via google. return token, name, and email


#### Question route

Route | HTTP | Header(s) | Body | Params | Description
----- | ---- | --------- | ---- | ------- | ----
/api/question | GET | none | none | none | return all question
/api/question | POST | token: string (**required**)  | title: String (**required**), description: String (**required**) | none | add new question. return newly created question
/api/question/:qid | PUT | token: string (**required**) | title: String (**required**), description: String (**required**) | qid: String (**required**) | update question. return updated question
/api/question/:qid | DELETE | token: string (**required**) | none | qid: String (**required**) | Delete article
/api/question/upvote/:qid | POST | token: string (**required**)  | none | qid: String (**required**) | add like vote to question. return question id and userId
/api/question/downvote/:qid | POST | token: string (**required**)  | none | qid: String (**required**) | add dislike vote to question. return question id and userId

#### Answer route

Route | HTTP | Header(s) | Body | Params | Description
----- | ---- | --------- | ---- | ------- | ----
/api/answer | GET | none | none | none | return all question
/api/answer | POST | token: string (**required**)  | title: String (**required**), description: String (**required**) | none | add new answer. return newly created answer
/api/answer/:aid | PUT | token: string (**required**) | title: String (**required**), description: String (**required**) | aid: String (**required**) | update answer. return updated answer
/api/answer/:aid | DELETE | token: string (**required**) | none | aid: String (**required**) | Delete article
/api/answer/upvote/:aid | POST | token: string (**required**)  | none | aid: String (**required**) | add like vote to answer. return answer id and userId
/api/answer/downvote/:aid | POST | token: string (**required**)  | none | aid: String (**required**) | add dislike vote to answer. return answer id and userId

## Usage
Make sure you have node.js and  npm installed on your computer, and then run these commands:

> $ npm install

> $ npm run dev 

> $ npm start