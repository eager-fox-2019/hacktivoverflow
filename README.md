# HacktivOverflow-v2

### http://eager-overflow.sukmaranggapradeta.com.s3-website-ap-southeast-1.amazonaws.com/

### Register :

```sh
URL: http://localhost:3000/register
METHOD : POST
AUTHENTICATE: NO
AUTHORIZE: NO
REQUEST Data Input / req.body:
    {
        name: dora
        email: dora@gmail.com
        password: dora
    }
Response Status : 201 Created
    {
        "watchtags": [],
        "_id": "5d1de90cddedd334704d6472",
        "name": "dora",
        "email": "dora@gmail.com",
        "password": "$2a$10$aMXRnZpyByy9wacFj0l4Duq3Nx7wyyEQShsddNsNH/tf/ve/3LOoG",
        "__v": 0
    }
-----------------------------------------------------------------
IF Error
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
---------------------------------------------------------------
If email format wrong
Response Status : 400 Bad Request
    {
        "message": "User validation failed: email: Invalid format email"
    }
---------------------------------------------------------------
If email duplikat
Response Status : 400 Bad Request
    {
        "message": "User validation failed: email: Email is already registered"
    }
--------------------------------------------------------------
If name, email or password empty
Response Status : 400 Bad Request
{
    "message": "User validation failed: name: Name is required, email: Email is required, password: Password is required"
}
```


### Login :

```sh
URL: http://localhost:3000/login
METHOD : POST
AUTHENTICATE: NO
AUTHORIZE: NO
REQUEST Data Input / req.body:
    {
        email: logan@mail.com
        password: logan
    }
Response Status : 200 OK
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMThkY2VmZTIzZjM4MTc2M2E1MDlhNCIsImVtYWlsIjoibG9nYW5AZ21haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNTYxOTEwNjM4LCJleHAiOjE1NjE5OTcwMzh9.7EGuzhJXd2fu7C0_jVquBoscSFUDAUS9aY2OFpue68Q",
        "id": "5d18dcefe23f381763a509a4",
        "name": "logan",
        "email": "logan@gmail.com",
        "role": "customer"
    }
----------------------------------------------------------------
If Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
---------------------------------------------------------------
If email or password wrong:
Response Status : 400 Bad Request
   {
        "message": "email/password wrong!"
    }
```

### Create Question :

```sh
URL: http://localhost:3000/questions
METHOD : POST
AUTHENTICATE: YES
AUTHORIZE: NO
REQUEST: 
    DATA: 
    {
        title: tes javascript,
        description: tes description javascript,
        tags: javascript,
    }
    HEADERS: 
    {
        token: <token from login>
    }
-----------------------------------------------------------------
Response Status : 201 Created
{
    "upvotes": [],
    "downvotes": [],
    "answers": [],
    "tags": [
        "javascript"
    ],
    "_id": "5d1de6bdddedd334704d6470",
    "title": "tes javascript",
    "description": "tes description javascript",
    "author": {
        "watchtags": [
            "sd",
            "okkkkkkk"
        ],
        "_id": "5d1dcadfac9d021fd3b0509a",
        "name": "naruto",
        "email": "naruto@gmail.com",
        "password": "$2a$10$uqmgPo0nzSGx48AhUmFEe.3/ZsLvqgWDpXiFm5bWV1hk5OXJgVp02",
        "__v": 2
    },
    "createdAt": "2019-07-04T11:45:01.584Z",
    "updatedAt": "2019-07-04T11:45:01.584Z",
    "__v": 0
}
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Not Login or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF data empty:
Response Status : 400 Bad Request
{
    "Product validation failed: 
        title: title is required, 
        description: description is required, 
}
```

### Get Question :

```sh
URL: http://localhost:3000/questions
METHOD : GET
AUTHENTICATE: NO
AUTHORIZE: NO

Response Status : 200 OK
[
    {
        "upvotes": [],
        "downvotes": [],
        "answers": [],
        "tags": [
            "satu",
            "dua"
        ],
        "_id": "5d1dcafaac9d021fd3b0509b",
        "title": "satu",
        "description": "satu",
        "author": {
            "watchtags": [
                "sd",
                "okkkkkkk"
            ],
            "_id": "5d1dcadfac9d021fd3b0509a",
            "name": "naruto",
            "email": "naruto@gmail.com",
            "password": "$2a$10$uqmgPo0nzSGx48AhUmFEe.3/ZsLvqgWDpXiFm5bWV1hk5OXJgVp02",
            "__v": 2
        },
        "createdAt": "2019-07-04T09:46:34.604Z",
        "updatedAt": "2019-07-04T09:46:34.604Z",
        "__v": 0
    },
    {...}, {...}
]
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Not Login or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
```

### Update Question :

```sh
URL: http://localhost:3000/questions/:questionID
AUTHENTICATE: YES
AUTHORIZE : YES
METHOD : PUT
HEADERS: 
{
    token: <token from login>  
}
DATA: 
{
    <field>: <value>
}
Response Status : 200 OK
----------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF No Token or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF not the author:
Response Status : 401 Unauthorize
    {
        "message": "You dont have access"
    }
```

### Delete Question :

```sh
URL: http://localhost:3000/questions/:questionID
AUTHENTICATE: YES
AUTHORIZE: YES
METHOD : DELETE
HEADERS: 
{
    token: <token form login>   
}

Response Status : 200 OK
{
    <deleted data>
}
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Token empty or wrong:
Response Status : 401 Unauthenticated
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF not the author:
Response Status : 401 Unauthorize
    {
        "message": "You dont have access"
    }
```


### Create Answer :

```sh
URL: http://localhost:3000/answers
METHOD : POST
AUTHENTICATE: YES
AUTHORIZE: NO
REQUEST: 
    DATA: 
    {

    }
    HEADERS: 
    {
        token: <token from login>
    }
-----------------------------------------------------------------
Response Status : 201 Created
{
    "upvotes": [],
    "downvotes": [],
    "answers": [],
    "tags": [
        "javascript"
    ],
    "_id": "5d1de6bdddedd334704d6470",
    "title": "tes javascript",
    "description": "tes description javascript",
    "author": {
        "watchtags": [
            "sd",
            "okkkkkkk"
        ],
        "_id": "5d1dcadfac9d021fd3b0509a",
        "name": "naruto",
        "email": "naruto@gmail.com",
        "password": "$2a$10$uqmgPo0nzSGx48AhUmFEe.3/ZsLvqgWDpXiFm5bWV1hk5OXJgVp02",
        "__v": 2
    },
    "createdAt": "2019-07-04T11:45:01.584Z",
    "updatedAt": "2019-07-04T11:45:01.584Z",
    "__v": 0
}
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Not Login or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF data empty:
Response Status : 400 Bad Request
{
    "Product validation failed: 
        title: title is required, 
        description: description is required, 
}
```

### Get Answer :

```sh
URL: http://localhost:3000/answers
METHOD : GET
AUTHENTICATE: NO
AUTHORIZE: NO

Response Status : 200 OK
[
    {
        "upvotes": [],
        "downvotes": [],
        "answers": [],
        "tags": [
            "satu",
            "dua"
        ],
        "_id": "5d1dcafaac9d021fd3b0509b",
        "title": "satu",
        "description": "satu",
        "author": {
            "watchtags": [
                "sd",
                "okkkkkkk"
            ],
            "_id": "5d1dcadfac9d021fd3b0509a",
            "name": "naruto",
            "email": "naruto@gmail.com",
            "password": "$2a$10$uqmgPo0nzSGx48AhUmFEe.3/ZsLvqgWDpXiFm5bWV1hk5OXJgVp02",
            "__v": 2
        },
        "createdAt": "2019-07-04T09:46:34.604Z",
        "updatedAt": "2019-07-04T09:46:34.604Z",
        "__v": 0
    },
    {...}, {...}
]
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Not Login or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
```

### Update Answer :

```sh
URL: http://localhost:3000/answers/:answerID
AUTHENTICATE: YES
AUTHORIZE : YES
METHOD : PUT
HEADERS: 
{
    token: <token from login>  
}
DATA: 
{
    <field>: <value>
}
Response Status : 200 OK
----------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF No Token or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF not the author:
Response Status : 401 Unauthorize
    {
        "message": "You dont have access"
    }
```

### Delete Answer :

```sh
URL: http://localhost:3000/answers/:answerID
AUTHENTICATE: YES
AUTHORIZE: YES
METHOD : DELETE
HEADERS: 
{
    token: <token form login>   
}

Response Status : 200 OK
{
    <deleted data>
}
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Token empty or wrong:
Response Status : 401 Unauthenticated
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF not the author:
Response Status : 401 Unauthorize
    {
        "message": "You dont have access"
    }
```

