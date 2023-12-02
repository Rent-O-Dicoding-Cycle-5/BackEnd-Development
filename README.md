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
- Request
    - Headers: 
      - `Content-Type:` application/json.
    - Body:
      - `username` (string).
      - `email` (string).
      - `password` (string).
- Success Response (201) OK
```json
{
  "status": "success",
  "message": "Register user success!",
  "data": {...}
}
```

### POST /auth/login

Endpoint for login.

- URL: `/auth/login`
- Method: `POST`
- Request
    - Headers: 
      - `Content-Type:` application/json.
    - Body:
      - `email` (string).
      - `password` (string).
- Success Response (200) OK
```json
{
  "status": "success",
  "message": "Login success!",
  "data": {...}
}
```


## User Endpoint

### GET /user/profile

Endpoint for retrieve user profil.

- URL: `/user/profile`
- Method: `GET`
- Request
    - Headers: 
      - `Authorization:` Bearer token for authentication.
- Success Response (200) OK
```json
{
  "status": "success",
  "message": "Read user success!",
  "data": {
    "user": {...}
  }
}
```

### POST /user/profile/img

Endpoint for update user profil image.

- URL: `/user/profile/img`
- Method: `POST`
- Request
    - Headers: 
      - `Authorization:` Bearer token for authentication.
      - `Content-Type:` multipart/form-data.
    - Body: Form data with a single file field named `image`.
- Success Response (200) OK
```json
{
  "status": "success",
  "message": "Upload image profile success!",
  "data": {...}
}

```

### PUT /user/profile/data

Endpoint for update user profil.

- URL: `/user/profile/data`
- Method: `PUT`
- Request
    - Headers: 
      - `Authorization:` Bearer token for authentication.
      - `Content-Type:` application/json.
    - Body:
      - `fullName` (string).
      - `phoneNumber` (string).
- Success Response (200) OK
```json
{
  "status": "success",
  "message": "Update user success!",
  "data": {
    "user": {...}
  }
}
```


## Partner Endpoints

### GET /partner

Endpoint for retrieve partner.

- URL: `/partner`
- Method: `GET`
- Request
    - Headers: 
      - `Authorization:` Bearer token for authentication.
- Success Response (200) OK
```json
{
  "status": "success",
  "message": "Create partner success!",
  "data": {
    "partner": {
      "user123": {...}
    }
  }
}

```

### POST /partner/create

Endpoint for create partner.

- URL: `/partner/create`
- Method: `POST`
- Request
    - Headers: 
      - `Authorization:` Bearer token for authentication.
      - `Content-Type:` application/json.
    - Body:
      - `fullName_KTP` (string).
      - `nik_KTP` (string).
      - `address_KTP` (string).
      - `city_KTP` (string).
      - `province_KTP` (string).
      - `postalCode_KTP` (string).
      - `placeBirth_KTP` (string).
      - `dateBirth_KTP` (string).
      - `type_SIM` (string).
      - `number_SIM` (string).
      - `expired_SIM` (string).
- Success Response (200) OK
```json
{
  "status": "success",
  "message": "Create partner success!",
  "data": {...}
}

```

### POST /partner/upload-sim

Endpoint for upload an image or PDF file of the partner's SIM (driver's license).

- URL: `/partner/upload-sim`
- Method: `POST`
- Request
    - Headers: 
      - `Authorization:` Bearer token for authentication.
      - `Content-Type:` multipart/form-data.
    - Body: Form data with a single file field named `sim`.
- Success Response (200) OK
```json
{
  "status": "success",
  "message": "Upload SIM success!",
  "data": {...}
}
```

### PUT /partner/update/data/sim

Endpoint for Update an image or PDF file of the partner's SIM (driver's license).

- URL: `/partner/update/data/sim`
- Method: `PUT`
- Request
    - Headers: 
      - `Authorization:` Bearer token for authentication.
      - `Content-Type:` application/json.
    - Body:
      - `type_SIM` (string).
      - `number_SIM` (string).
      - `expired_SIM` (string).
- Success Response (200) OK
```json
{
  "status": "success",
  "message": "Update partner success!",
  "data": {...}
}
```


## Vehicle Endpoints

### GET /vehicle/list

Endpoint for retrieve information about all vehicles.

- URL: `/vehicle/list`
- Method: `GET`
- Success Response (200) OK
```json
{
  "status": "success",
  "message": "Read vehicles success!",
  "data": {
    "vehicles": [{...}]
  }
}
```

### GET /vehicle/detail/:id

Endpoint for retrieve information about a specific vehicle.

- URL: `/vehicle/detail/:id`
- Method: `GET`
- Request
    - Params:
      - `id` (string).
- Success Response (200) OK
```json
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
    - Params:
      - `type` (string).
- Success Response (200) OK
```json
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
    - Params:
      - `brand` (string).
- Success Response (200) OK
```json
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
    - Params:
      - `location` (string).
- Success Response (200) OK
```json
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
    - Params:
      - `type` (string).
      - `brand` (string).
- Success Response (200) OK
```json
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
    - Params:
      - `type` (string).
      - `location` (string).
- Success Response (200) OK
```json
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
    - Params:
      - `brand` (string).
      - `location` (string).
- Success Response (200) OK
```json
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
    - Params:
      - `type` (string).
      - `brand` (string).
      - `location` (string).
- Success Response (200) OK
```json
{
  "status": "success",
  "message": "Filter vehicles by type, brand, and location success!",
  "data": {
    "vehicles": [{...}]
  }
}
```
