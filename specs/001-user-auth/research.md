# Research: User Authentication System

## Decision: Express.js + TypeScript

- Express.js is the most widely adopted Node.js server framework and pairs well with TypeScript for a small-to-medium backend service.
- It supports middleware-based authentication flows, which fits the requirement for JWT validation, password reset, and session management.
- Alternative frameworks like NestJS add more structure but also more initial boilerplate; Express.js is the simplest fit for a focused auth service.

## Decision: PostgreSQL for persistence

- PostgreSQL offers reliable transactional consistency for user records, reset token lifecycle, and session state.
- User authentication requires strong data integrity, unique email constraints, and safe resets, all of which PostgreSQL handles well.
- Alternatives like SQLite are too limited for production-level session and email-reset requirements, while NoSQL would require more effort for strict relational constraints.

## Decision: bcrypt for password hashing

- bcrypt remains the industry-standard choice for password hashing in Node.js.
- It is easy to configure with a work factor and can be integrated with the TypeScript runtime securely.
- Alternatives like argon2 are strong, but bcrypt has broader ecosystem compatibility and sufficient security for this feature.

## Decision: JWT for authentication tokens

- JWT provides stateless token issuance with an embedded expiry, which is ideal for API authentication.
- Minimal server-side session state will be used to enforce a single active token per user and allow invalidation of old tokens, while preserving the advantages of JWT.
- Alternatives like opaque session tokens require more server-side storage; JWTs are a better fit for token-based APIs.

## Decision: Jest for testing

- Jest is the standard test runner in the TypeScript/Node ecosystem and has built-in coverage reporting.
- It supports unit and integration testing easily and matches the project’s quality gate requirement for 80% business logic coverage.

## Alternatives Considered

- **NestJS**: Stronger structure, but too heavyweight for an initial auth microservice; adds a steeper learning curve.
- **argon2**: More modern hashing, but bcrypt is more widely supported and adequate for the current scope.
- **Refresh token flow**: Useful for longer-lived sessions, but the requirement explicitly calls for 24-hour expiry and a single active session token, so a simpler JWT-with-session-state model is preferred.

## Rationale

The chosen stack balances simplicity, security, and maintainability. Express.js with TypeScript and Jest enables fast development and strong developer ergonomics, while PostgreSQL and bcrypt provide a secure foundation for user data and password handling. JWTs satisfy token-based authentication needs while allowing server-side invalidation for session security.
