# Hacktiv Overflow

Postman API documentation:
https://documenter.getpostman.com/view/6691212/S1a7WR4Z

Instructions:
Buatlah clone sederhana dari Stack Overflow menggunakan Client-server model dengan spesifikasi sebagai berikut:

API Documentation yang meliputi : 
- URLs, 
- HTTP method, 
- request, 
- response (success dan error case)

Server

- CRUD endpoints untuk Questions 
	title, 
	description, 
	upvotes, 
	downvotes

- CRU endpoints untuk Answers
	title, 
	description, 
	upvotes, 
	downvotes

- CRON dan Background Job (Materi akan diberikan di hari Senin, Week 4)

- Endpoint register untuk User

- Endpoint login menggunakan email & password (menggunakan JWT) untuk User

Client

- Generate dari Vue CLI dan 
- WAJIB mengimplementasikan Vuex
- Authentication (Login dan Register)
- Display Questions dan Answers
- CRUD Questions dan CRU Answers
- Upvote dan Downvote (silakan lihat Stack Overflow untuk referensi)
- NO alert();!