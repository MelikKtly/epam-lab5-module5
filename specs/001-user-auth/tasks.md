# Tasks: User Authentication System

**Input**: Design documents from `/specs/001-user-auth/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/auth-api.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the TypeScript backend project and quality gates.

- [ ] T001 Create project structure under `src/` and `tests/` with `tsconfig.json` and `package.json`
- [ ] T002 [P] Install and configure Express, TypeScript, Jest, PostgreSQL client, bcrypt, jsonwebtoken, and nodemailer-compatible email library
- [ ] T003 [P] Configure TypeScript strict mode, JSDoc support, and linting/formatting rules in `tsconfig.json`
- [ ] T004 [P] Add environment configuration for PostgreSQL, JWT secret, reset token secret, SMTP, and session settings in `src/config/database.ts`
- [ ] T005 [P] Create base Express entrypoint in `src/index.ts` and mount auth routing middleware

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the persistence, domain models, and shared auth utilities required by all stories.

- [ ] T006 Setup PostgreSQL schema migrations or schema definitions for `User`, `Session`, and `PasswordResetToken`
- [ ] T007 [P] Implement `src/models/user.model.ts`, `src/models/session.model.ts`, and `src/models/password-reset-token.model.ts`
- [ ] T008 [P] Implement database access layer in `src/repositories/auth.repository.ts` for user creation, lookup, session tracking, and reset token persistence
- [ ] T009 [P] Implement `src/utils/jwt.util.ts` for JWT creation, verification, `jti` handling, and 24-hour expiry computation
- [ ] T010 [P] Implement `src/utils/email.util.ts` for password reset email generation and SMTP delivery
- [ ] T011 [P] Implement `src/middleware/auth.middleware.ts` for JWT validation, session state verification, and protected route enforcement
- [ ] T012 [P] Implement `src/middleware/rate-limit.middleware.ts` and wire rate limiting into login and password reset routes

---

## Phase 3: User Story 1 - Register and access account (Priority: P1)

**Goal**: Enable secure email/password registration and JWT login.

**Independent Test**: Verify a new user can register, then log in to receive a JWT usable for protected endpoints.

### Tests

- [ ] T013 [P] [US1] Add unit tests for registration and login business logic in `tests/unit/auth.service.spec.ts`
- [ ] T014 [P] [US1] Add integration tests for the `/api/v1/auth/register` and `/api/v1/auth/login` routes in `tests/integration/auth.routes.spec.ts`

### Implementation

- [ ] T015 [P] [US1] Implement registration endpoint in `src/controllers/auth.controller.ts` using `auth.service.ts`
- [ ] T016 [P] [US1] Implement login endpoint in `src/controllers/auth.controller.ts` and issue JWT tokens with `expiresAt`
- [ ] T017 [US1] Implement email uniqueness and password strength validation in `src/services/auth.service.ts`
- [ ] T018 [US1] Implement secure password hashing using bcrypt in `src/services/auth.service.ts`
- [ ] T019 [US1] Implement error handling for duplicate emails and invalid credentials

**Checkpoint**: This story is complete when registration and login are both working and testable independently.

---

## Phase 4: User Story 2 - Reset forgotten password via email (Priority: P2)

**Goal**: Provide a secure password reset workflow that uses email delivery and single-use tokens.

**Independent Test**: Verify a password reset request generates an email-safe response and a reset confirm flow updates the password.

### Tests

- [ ] T020 [P] [US2] Add unit tests for password reset token generation and confirmation logic in `tests/unit/auth.service.spec.ts`
- [ ] T021 [P] [US2] Add integration tests for `/api/v1/auth/password-reset/request` and `/api/v1/auth/password-reset/confirm` in `tests/integration/password-reset.routes.spec.ts`

### Implementation

- [ ] T022 [P] [US2] Implement password reset request endpoint in `src/controllers/auth.controller.ts`
- [ ] T023 [US2] Implement reset token creation, storage, expiry, and single-use enforcement in `src/services/auth.service.ts`
- [ ] T024 [US2] Implement password reset confirmation endpoint in `src/controllers/auth.controller.ts`
- [ ] T025 [US2] Implement reset email sending in `src/utils/email.util.ts`
- [ ] T026 [US2] Ensure reset request responses do not disclose whether an email is registered

**Checkpoint**: This story is complete when the password reset request and confirm flows work with secure, opaque responses.

---

## Phase 5: User Story 3 - Manage session expiry (Priority: P3)

**Goal**: Enforce 24-hour JWT validity and one active session token per user.

**Independent Test**: Verify token validation rejects expired or revoked JWTs and requires reauthentication after expiry.

### Tests

- [ ] T027 [P] [US3] Add unit tests for session token creation, revocation, and expiration behavior in `tests/unit/auth.service.spec.ts`
- [ ] T028 [P] [US3] Add integration tests for protected route access and logout revocation in `tests/integration/session.routes.spec.ts`

### Implementation

- [ ] T029 [P] [US3] Add session creation and revocation logic to `src/services/auth.service.ts`
- [ ] T030 [US3] Implement `/api/v1/auth/logout` in `src/controllers/auth.controller.ts` to revoke active sessions
- [ ] T031 [US3] Ensure `src/middleware/auth.middleware.ts` checks session state, revoked status, and JWT expiry
- [ ] T032 [US3] Implement logout handling for active JWT invalidation

**Checkpoint**: This story is complete when expired or revoked tokens are rejected and logout invalidates the active session.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality work, documentation, and coverage enforcement.

- [ ] T033 [P] Document all exported service methods, controllers, and utilities with JSDoc comments
- [ ] T034 [P] Add rate limiting tests for login and password reset endpoints in `tests/integration/auth.routes.spec.ts`
- [ ] T035 [P] Add coverage assertions or Jest configuration so business logic coverage is reported and verified
- [ ] T036 [P] Fix lint issues, dead code, and ensure all new files compile under TypeScript strict mode
- [ ] T037 [P] Update `specs/001-user-auth/quickstart.md` with exact install and run commands if needed
- [ ] T038 [P] Validate feature behavior against `specs/001-user-auth/contracts/auth-api.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1**: Setup has no dependencies and can start immediately
- **Phase 2**: Foundational depends on Setup completion
- **Phase 3, 4, 5**: User stories depend on Foundational completion
- **Phase 6**: Polish depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependency on other stories after Foundation; can be developed and tested independently
- **User Story 2 (P2)**: Depends on foundational auth infrastructure; can be tested independently from session expiry
- **User Story 3 (P3)**: Depends on foundational auth infrastructure and token issuance; can be tested independently once login exists

### Parallel Opportunities

- Setup tasks `T002`, `T003`, `T004`, and `T005` can run in parallel
- Foundation tasks `T007` through `T012` are parallelizable across models, utilities, and middleware
- Tests for each story (`T013`, `T014`, `T020`, `T021`, `T027`, `T028`) can be developed in parallel with implementation tasks in the same story
- Different user stories can proceed in parallel after Phase 2 is complete, with story-specific implementation tasks independent by design

### Implementation Strategy

- MVP first: complete Phase 1 and Phase 2, then deliver User Story 1 as the first independently testable increment
- Next, implement User Story 2 and User Story 3 in priority order or in parallel once the foundation is stable
- Finish with Phase 6 to enforce JSDoc, coverage, security checks, and contract validation

---

## Notes

- All tasks are written with exact file path guidance
- Rate limiting is included as a foundational security requirement and added to the relevant story flows
- This task list is designed to satisfy the project constitution’s TypeScript strict mode, Testing Pyramid, and coverage expectations
