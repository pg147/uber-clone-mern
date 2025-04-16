# 📤 API Documentation: Create User

## Endpoint

```
POST /users/create
```

## Description

Creates a new user account in the system. Requires basic user details such as name, email, and password. If the user already exists, it will return an appropriate error.

---

## 🔐 Request Body

Content-Type: `application/json`

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Required Fields

| Field       | Type   | Description                           |
|-------------|--------|---------------------------------------|
| firstName   | string | Minimum 2 characters, required        |
| lastName    | string | Minimum 3 characters, required        |
| email       | string | Must be a valid email, required       |
| password    | string | Minimum 6 characters, required        |

---

## ✅ Successful Response

**Status Code:** `201 Created`

```json
{
  "success": true,
  "message": "Request successful",
  "data": {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "USER_ID",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "__v": 0
    }
  }
}
```

---

## ❌ Error Responses

| Status Code | Reason                                      |
|-------------|---------------------------------------------|
| 400         | Missing required fields or validation error |
| 409         | User with provided email already exists     |
| 500         | Internal server error                       |

Example:

```json
{
  "success": false,
  "message": "User with john.doe@example.com already exists!"
}
```

---

## 🛡 Validation

- Validates email format.
- First name must be at least 2 characters.
- Password must be at least 6 characters.
- Throws an error if required fields are missing or invalid.
