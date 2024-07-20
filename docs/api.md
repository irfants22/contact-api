# <span style="color: red;">USER API</span>

## Register user API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "user",
  "password": "secret",
  "name": "user"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "user",
    "name": "user"
  }
}
```

Response Body Error :

```json
{
  "errors": "username already registered"
}
```

## Login user API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "user",
  "password": "secret"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "username or password wrong"
}
```

## Update user API

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "user", // optional
  "password": "new password" // optional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "user",
    "name": "user"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name length max 100"
}
```

## Get user API

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "username": "user",
    "name": "user"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout user API

Endpoint : DELETE /api/users/logout

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

# <span style="color: red;">CONTACT API</span>

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "first_name": "user",
  "last_name": "user",
  "email": "user@mail.com",
  "phone": "0812345"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "user",
    "last_name": "user",
    "email": "user@mail.com",
    "phone": "0812345"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "first_name": "user",
  "last_name": "user",
  "email": "user@mail.com",
  "phone": "0812345"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "user",
    "last_name": "user",
    "email": "user@user.com",
    "phone": "0812345"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "user",
    "last_name": "user",
    "email": "user@user.com",
    "phone": "0812345"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query params :

- name : Search by first_name or last_name, using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional

Query params for paging :

- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "user",
      "last_name": "user",
      "email": "user@user.com",
      "phone": "0812345"
    },
    {
      "id": 2,
      "first_name": "user",
      "last_name": "user",
      "email": "user@user.com",
      "phone": "0812345"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error :

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

# <span style="color: red;">ADDRESS API</span>

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "nama jalan",
  "city": "nama kota",
  "province": "nama provinsi",
  "country": "nama negara",
  "postal_code": "kode pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "nama jalan",
    "city": "nama kota",
    "province": "nama provinsi",
    "country": "nama negara",
    "postal_code": "kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "nama jalan",
  "city": "nama kota",
  "province": "nama provinsi",
  "country": "nama negara",
  "postal_code": "kode pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "nama jalan",
    "city": "nama kota",
    "province": "nama provinsi",
    "country": "nama negara",
    "postal_code": "kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "nama jalan",
    "city": "nama kota",
    "province": "nama provinsi",
    "country": "nama negara",
    "postal_code": "kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## List Addresses API

Endpoint : GET /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "nama jalan",
      "city": "nama kota",
      "province": "nama provinsi",
      "country": "nama negara",
      "postal_code": "kode pos"
    },
    {
      "id": 1,
      "street": "nama jalan",
      "city": "nama kota",
      "province": "nama provinsi",
      "country": "nama negara",
      "postal_code": "kode pos"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "address is not found"
}
```
