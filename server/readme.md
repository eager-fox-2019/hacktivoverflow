# Summary
- Membuat pertanyaan dan jawaban
- Pertanyaan dan jawaban ada : Judul dan isi
- Halmaan utama : Halaman daftar pertanyaan
- Halaman detail pertanyaan => ada list jawaban

# Fitur
- CRUD pertanyaan
- CRUD jawaban dari pertaanyaan
- downvote upvote pertanyaan
- downvote upvote jawaban
- menampilkan total vote jawaban pertanyaan

# model
1. User
2. Pertanyaan
- title
- content
- userId
- answers [{ ObjectId, ref 'Answer' }]
- votes [{ ObjectId, ref 'User' }]

3. Jawaban
- title
- content
- userId
- questionId { ObjectId, ref 'pertanyaan' }
- votes [{ ObjectId, ref 'votes'}]

# routing
## Users
/users/login
/users/logout
/users/register
/users/myprofile AUTHEN

## Questions
GET /questions/ 
POST /questions/ AUTHEN
GET /questions/:qId
PUT /questions/:qId AUTHEN AUTHOR
DELETE /questions/:qId AUTHEN AUTHOR
POST /questions/:qId/upvote AUTHEN
POST /questions/:qId/downvote AUTHEN

## Answers
GET /answers/
POST /answers/ AUTHEN
GET /answers/:qId
PUT /answers/:qId AUTHEN AUTHOR
DELETE /answers/:qId AUTHEN AUTHOR
POST /answers/:qId/upvote AUTHEN
POST /answers/:qId/downvote AUTHEN
