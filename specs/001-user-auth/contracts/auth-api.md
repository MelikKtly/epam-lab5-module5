# API Contract: Authentication Service

## Base URI

`/api/v1/auth`

## Endpoints

### Register

- `POST /api/v1/auth/register`
- Request body:
  - `email` (string, required)
  - `password` (string, required)
- Response:
  - `201 Created` on success
  - Body: `{ "message": "Registration successful" }`
- Error responses:
  - `400 Bad Request` for invalid email or password policy violation
  - `409 Conflict` for duplicate email

### Login

- `POST /api/v1/auth/login`
- Request body:
  - `email` (string, required)
  - `password` (string, required)
- Response:
  - `200 OK` on success
  - Body: `{ "token": "<jwt>", "expiresAt": "<ISO timestamp>" }`
- Error responses:
  - `400 Bad Request` for malformed request
  - `401 Unauthorized` for invalid credentials

### Request Password Reset

- `POST /api/v1/auth/password-reset/request`
- Request body:
  - `email` (string, required)
- Response:
  - `200 OK`
  - Body: `{ "message": "If the email is registered, reset instructions have been sent" }`
- Notes:
  - Always return a generic success message to avoid account enumeration.

### Confirm Password Reset

- `POST /api/v1/auth/password-reset/confirm`
- Request body:
  - `token` (string, required)
  - `newPassword` (string, required)
- Response:
  - `200 OK`
  - Body: `{ "message": "Password has been reset" }`
- Error responses:
  - `400 Bad Request` for invalid or expired token
  - `422 Unprocessable Entity` for password policy failure

### Logout / Invalidate Session

- `POST /api/v1/auth/logout`
- Headers:
  - `Authorization: Bearer <jwt>`
- Response:
  - `200 OK`
  - Body: `{ "message": "Logout successful" }`
- Notes:
  - This endpoint revokes the active server-side session record and invalidates the JWT.

## Authentication Middleware Contract

- JWTs must be provided in the `Authorization` header using the Bearer scheme.
- The middleware will verify the token signature, expiry, and associated `Session` record.
- Expired, revoked, or tampered tokens must result in `401 Unauthorized`.

## Session Rules

- JWT tokens are valid for exactly 24 hours from issuance.
- Each successful login creates a new session and revokes previous sessions for the same user.
- Session validation requires both JWT integrity and an active server-side `Session` record.
