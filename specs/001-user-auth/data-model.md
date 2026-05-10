# Data Model: User Authentication System

## Entities

### User

- **Description**: Represents a registered account holder.
- **Fields**:
  - `id` (UUID, primary key)
  - `email` (string, unique, required)
  - `password_hash` (string, required)
  - `created_at` (timestamp, required)
  - `updated_at` (timestamp, required)
  - `is_active` (boolean, default true)
  - `last_login_at` (timestamp, nullable)

### Session

- **Description**: Tracks the active JWT session for a user to support token invalidation and one-active-token rules.
- **Fields**:
  - `id` (UUID, primary key)
  - `user_id` (UUID, foreign key -> User.id)
  - `jwt_id` (string, required, unique)
  - `issued_at` (timestamp, required)
  - `expires_at` (timestamp, required)
  - `revoked_at` (timestamp, nullable)
  - `created_at` (timestamp, required)
  - `updated_at` (timestamp, required)

### PasswordResetToken

- **Description**: Represents a single-use reset token for password recovery.
- **Fields**:
  - `id` (UUID, primary key)
  - `user_id` (UUID, foreign key -> User.id)
  - `token` (string, required, unique)
  - `expires_at` (timestamp, required)
  - `used_at` (timestamp, nullable)
  - `created_at` (timestamp, required)
  - `updated_at` (timestamp, required)

## Relationships

- `User` 1:N `Session`
- `User` 1:N `PasswordResetToken`

## Validation Rules

- `email`: must be a valid email address, lowercase-normalized, unique in the database.
- `password_hash`: created by bcrypt from a password that meets the project’s strength requirements.
- `jwt_id`: unique identifier embedded in each JWT payload for session validation.
- `expires_at`: cannot be in the past at creation time.
- `used_at`: set only after a reset token has been exchanged for a new password; used tokens cannot be reused.

## State Transitions

- Registration creates a `User` record and may create an initial `Session` after login.
- Login creates a new `Session` and revokes existing active sessions for the user.
- Token validation checks `Session` status and expiry before granting access.
- Password reset request creates a new `PasswordResetToken` and expires existing reset tokens for the same user.
- Password reset completion marks the `PasswordResetToken` as used and updates the user’s password hash.
