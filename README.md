# hacktivoverflow


### Cara main
- buat file `.env` dari template `.envTemplate`
- jalankan dev server, masuk ke folder server `npm run dev`

### API Route

::API `POST` harus menggunakan `Content-Type` header dengan nilai `application/json`::

## user

Route | HTTP | Header | BodyJSON / QueryParam | Response | Description | Validation
-- | -- | -- | -- | -- | -- | --
`/user/register` | POST | - | {email, fullName, password} | {_id, email, fullName, password} | register a user | email must be valid, name is more than 1 char
`/user/login` | POST | - | {email, password} | {access_token} | login: get token | -
