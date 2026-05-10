# Quickstart: User Authentication System

## Setup

1. Install dependencies:

```bash
npm install express bcrypt jsonwebtoken pg prisma @types/express @types/jsonwebtoken jest ts-jest @types/jest typescript
```

2. Initialize TypeScript:

```bash
npx tsc --init --strict --esModuleInterop --moduleResolution node --target es2022 --module commonjs
```

3. Initialize Jest for TypeScript:

```bash
npx ts-jest config:init
```

4. Create a PostgreSQL database and configure connection settings via environment variables:

```bash
export DATABASE_URL="postgresql://user:password@localhost:5432/auth_service"
export JWT_SECRET="your-strong-jwt-secret"
export RESET_TOKEN_SECRET="your-reset-token-secret"
export SMTP_HOST="smtp.example.com"
export SMTP_PORT=587
export SMTP_USER="smtp-user"
export SMTP_PASS="smtp-password"
```

## Development

1. Create the project structure under `src/`:

```text
src/
├── controllers/
├── services/
├── repositories/
├── middleware/
├── utils/
└── index.ts
```

2. Define the PostgreSQL schema for `User`, `Session`, and `PasswordResetToken`.
3. Implement authentication routes and service logic in Express.js.
4. Use bcrypt to hash and verify passwords.
5. Use JWTs with a 24-hour expiry and a `jti` claim to map to a server-side `Session` record.

## Testing

Run Jest for unit and integration tests:

```bash
npm test
```

Run coverage report:

```bash
npx jest --coverage
```

## Notes

- Ensure `strict` mode is enabled in `tsconfig.json`.
- Add JSDoc comments to all exported service methods and controllers.
- Focus tests on business logic first, then add integration tests for the auth routes.
