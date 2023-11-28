# Rent'O API Documentation

## Endpoints Backend

### GET /

Endpoint to check if the server is running properly.

- URL: `/`
- Method: `GET`
- Response:
  - Status Code: `200 OK`
  - Body: `"Server is running!"`

### POST /auth/register

Endpoint for register.

- URL: `/auth/register`
- Method: `POST`
- Body: JSON object containing user registration data.
  - `username` (string, required): The username for the new user.
  - `email` (string, required): The email address for the new user.
  - `password` (string, required): The password for the new user.

- Success Response (201)

```json
{
  "status": "success",
  "message": "Register user success!",
  "data": {
    "uid": "user123"
  }
}
```

### POST /auth/login

Endpoint for login.

- URL: `/auth/login`
- Method: `POST`
- Body: JSON object containing user login data.
    - `email` (string, required): The email address of the user.
    - `password` (string, required): The password for the user.

- Success Response (200)
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Login success!",
  "data": {
    "uid": "user123",
    "username": "john_doe",
    "email": "john@example.com",
    "emailVerified": true,
    "roles": ["user"]
  }
}
```


### GET /user/profile

Endpoint for retrieve user profil.

- URL: `/user/profile`
- Method: `GET`
- Request
    - Headers: Include the `Authorization` header for user identification.
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Read user success!",
  "data": {
    "user": {
      "uid": "user123",
      "username": "john_doe",
      "email": "john@example.com",
      "emailVerified": true,
      "roles": ["user"]
    }
  }
}
```    

### PUT /user/profile

Endpoint for update user profil.

- URL: `/user/profile`
- Method: `PUT`
- Request
    - Headers: Include the `Authorization` header for user identification.
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Update user success!",
  "data": {
    "user": {
      "uid": "user123",
      "username": "new_username",
      "email": "new_email@example.com",
      "emailVerified": true,
      "roles": ["user"]
    }
  }
}

```

### GET /partner

Endpoint for retrieve partner.

- URL: `/partner`
- Method: `GET`
- Request
    - Headers: Include the `Authorization` header for user identification.
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Create partner success!",
  "data": {
    "partner": {
      "uid": "user123",
      "fullName_KTP": "John Doe",
      "nik_KTP": "1234567890123456",
      "address_KTP": "Puncak, Bogor",
      "city_KTP": "Bogor",
      "province_KTP": "Jawa Barat",
      "postalCode_KTP": "12345",
      "dateBirth_KTP": "1990-01-01",
      "type_SIM": "A",
      "number_SIM": "123456789",
      "expired_SIM": "2023-01-01",
      "createdAt": "2023-01-01T12:00:00Z"
    }
  }
}

```

### POST /partner/create

Endpoint for create partner.

- URL: `/partner/create`
- Method: `POST`
- Request
    - Headers: Include the `Authorization` header for user identification.
    - Body: JSON object containing partner data to be created.
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Create partner success!",
  "data": {
    "partner": {
      "uid": "user123",
      "fullName_KTP": "John Doe",
      "nik_KTP": "1234567890123456",
      "address_KTP": "Puncak, Bogor",
      "city_KTP": "Bogor",
      "province_KTP": "Jawa Barat",
      "postalCode_KTP": "12345",
      "dateBirth_KTP": "1990-01-01",
      "type_SIM": "A",
      "number_SIM": "123456789",
      "expired_SIM": "2023-01-01",
      "createdAt": "2023-01-01T12:00:00Z"
    }
  }
}

```

### PUT /partner/update

Endpoint for update partner.

- URL: `/partner/update`
- Method: `PUT`
- Request
    - Headers: Include the `Authorization` header for user identification.
    - Body: JSON object containing partner data to be update.
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Update partner success!",
  "data": {
    "partner": {
      "uid": "user123",
      "type_SIM": "B",
      "number_SIM": "987654321",
      "expired_SIM": "2024-01-01",
      "updatedAt": "2023-01-02T12:00:00Z"
    }
  }
}
```

### GET /vehicle

Endpoint for retrieve information about all vehicles.

- URL: `/vehicle`
- Method: `PUT`
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Read vehicles success!",
  "data": {
    "vehicles": {...}
  }
}
```


### GET /vehicle/:id

Endpoint for retrieve information about a specific vehicle.

- URL: `/vehicle/:id`
- Method: `PUT`
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Read vehicle success!",
  "data": {
    "vehicle": {...}
  }
}
```


### POST /vehicle

Endpoint for create a new vehicle.

- URL: `/vehicle`
- Method: `POST`
- Request
    - Headers: Include the `Authorization` header for user identification.
    - Body: JSON object containing partner data to be created.
- Success Response (201)
```json
HTTP/1.1 201 Created
Content-Type: application/json
{
  "status": "success",
  "message": "Create vehicles success!",
  "data": {
    "vehicles": {...}
  }
}
```

### PUT /vehicle/:id

Endpoint update information about a specific vehicle.

- URL: `/vehicle/:id`
- Method: `PUT`
- Request
    - Headers: Include the `Authorization` header for user identification.
    - Parameters: Include the `id` parameter in the URL to specify the vehicle's ID.
    - Body: JSON object containing the updated vehicle data.

- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Update vehicle success!",
  "data": {
    "vehicle": {...}
  }
}
```

### DELETE /vehicle/:id

Endpoint update information about a specific vehicle.

- URL: `/vehicle/:id`
- Method: `DELETE`
- Request
    - Headers: Include the `Authorization` header for user identification.
    - Parameters: Include the `id` parameter in the URL to specify the vehicle's ID.

- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Delete vehicle success!",
  "data": {
    "vehicle": {...}
  }
}
```