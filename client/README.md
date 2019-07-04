# client
Before you run the client, please follow, following instruction

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### routing
URL : /
This route is the homepage of the website which show list of questions, with calculated total votes and answers. In this page, i also added sort by post date and total vote, and search feature

URL : /questions/:id
Get the detail of answers of one question in one page. In this page we could also upvote and downvote question and answer.

URL : /register
This is the page of login and registration

URL : /profile/:id
Get the profile page of one user with all questions and answers that have been made by the user. :id in the params is the id of user.


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
