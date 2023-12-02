# Rent'O API Documentation

## Endpoints Backend

### GET /

Endpoint to check if the server is running properly.

- URL: `/`
- Method: `GET`
- Response:
  - Status Code: `200 OK`
  - Body: `"Server is running!"`

## Authentication Endpoint

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

## User Endpoint

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

### PUT /user/profile/data

Endpoint for update user profil.

- URL: `/user/profile/data`
- Method: `PUT`
- Request
    - Headers: 
      - `Authorization` Bearer token for authentication.
      - `Content-Type` Application/JSON.
    - Body :
      - `fullName` (string, optional) - New full name.
      - `phoneNumber` (string, optional) - New phone number.
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
      "fullName": "John New Doe",
      "phoneNumber": "+9876543210",
    }
  }
}
```

### POST /user/profile/img

Endpoint for update user profil.

- URL: `/user/profile/img`
- Method: `POST`
- Request
    - Headers: 
      - `Authorization` Bearer token for authentication.
    - Body : Form data with a single file field named `image`.
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Upload image profile success!",
  "data": {
    "imageUrl": "https://storage.googleapis.com/storage-bucket/users/profiles/john_doe/20230101235900123.png"
  }
}

```

## Partner Endpoints

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

### PUT /partner/update/data/sim

Endpoint for Update an image or PDF file of the partner's SIM (driver's license).

- URL: `/partner/update/data/sim`
- Method: `PUT`
- Request
    - Headers: Include the `Authorization` header for user identification.
    - Body: JSON object containing partner data SIM to be update.
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
      "updatedAt": "2023-01-02T12:00:00Z",
    }
  }
}
```

### POST /partner/upload-sim

Endpoint for upload an image or PDF file of the partner's SIM (driver's license).

- URL: `/partner/upload-sim`
- Method: `POST`
- Request
    - Headers: Include the `Authorization` header for user identification.
    - Body: Use the `multipart/form-data` format to upload the SIM file.
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Upload SIM success!",
  "data": {
    "url": "/uploads/sim/partner123_sim.jpg"
  }
}
```

## Vehicle Endpoints

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

## Vehicle Filter Endpoints

### GET /vehicle/list/type/:type

Endpoint to filter vehicles based on the specified vehicle type.

- URL: `/vehicle/list/type/:type`
- Method: `GET`
- Request
    - Params: `type` (string) Vehicle type to filter by.
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Filter vehicles by type success!",
  "data": {
    "vehicles": [{...}]
  }
}
```

### GET /vehicle/list/brand/:brand

Endpoint to filter vehicles based on the specified vehicle brand.

- URL: `/vehicle/list/brand/:brand`
- Method: `GET`
- Request
    - Params: `brand` (string) Vehicle brand to filter by.
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Filter vehicles by brand success!",
  "data": {
    "vehicles": [{...}]
  }
}
```


### GET /vehicle/list/location/:location

Endpoint to filter vehicles based on the specified vehicle location.

- URL: `/vehicle/list/location/:location`
- Method: `GET`
- Request
    - Params: `location` (string) Vehicle location to filter by.
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Filter vehicles by location success!",
  "data": {
    "vehicles": [{...}]
  }
}
```


### GET /vehicle/list/type/:type/brand/:brand

Endpoint to filter vehicles based on both vehicle type and brand

- URL: `/vehicle/list/type/:type/brand/:brand`
- Method: `GET`
- Request
    - Params: `type` (string) Vehicle type to filter by.
    - Params: `brand` (string) Vehicle brand to filter by.
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Filter vehicles by type and brand success!",
  "data": {
    "vehicles": [{...}]
  }
}
```

### GET /vehicle/list/type/:type/location/:location

Endpoint to filter vehicles based on both vehicle type and location.

- URL: `/vehicle/list/type/:type/location/:location`
- Method: `GET`
- Request
    - Params: `type` (string) Vehicle type to filter by.
    - Params: `location` (string) Vehicle location to filter by.
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Filter vehicles by type and location success!",
  "data": {
    "vehicles": [{...}]
  }
}
```


### GET /vehicle/list/brand/:brand/location/:location

Endpoint to filter vehicles based on both vehicle brand and location.

- URL: `/vehicle/list/brand/:brand/location/:location`
- Method: `GET`
- Request
    - Params: `brand` (string) Vehicle brand to filter by.
    - Params: `location` (string) Vehicle location to filter by.
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Filter vehicles by brand and location success!",
  "data": {
    "vehicles": [{...}]
  }
}
```


### GET /vehicle/list/type/:type/brand/:brand/location/:location

Endpoint to filter vehicles based on vehicle type, brand, and location.

- URL: `/vehicle/list/type/:type/brand/:brand/location/:location`
- Method: `GET`
- Request
    - Params: `type` (string) Vehicle tyoe to filter by.
    - Params: `brand` (string) Vehicle brand to filter by.
    - Params: `location` (string) Vehicle location to filter by.
- Success Response (200) OK
```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "status": "success",
  "message": "Filter vehicles by type, brand, and location success!",
  "data": {
    "vehicles": [{...}]
  }
}
```