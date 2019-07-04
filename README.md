# hacktivoverflow

## Server API routes

## Running the server

Run the following commands:

```bash
  cd server/
  npm install
  npm start
```

## API Documentation (server)
| Route          | HTTP Method | Header(s)                | Body                            | Description                                                                                                                |
|----------------|-------------|--------------------------|---------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| /users/register    | POST        | `none`                   | `email:String`<br>(required)<br>`password:String`<br>(required)   | Register with new user info.                                                              |
| /users/login    | POST        | `none`                   | `name:String`<br>(required)<br>email:String`<br>(required)<br>`password:String`<br>(required)   | Sign in and get an access token based on credentials.                                    |


