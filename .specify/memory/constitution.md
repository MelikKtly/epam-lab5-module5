<!--
Sync Impact Report
Version change: unknown -> 1.0.0
Modified principles: blank template -> Clean Code, TypeScript Strict, Testing Pyramid, Documented APIs, Quality Review
Added sections: Mandatory Technology Requirements, Quality & Delivery Workflow
Removed sections: none
Templates requiring updates: .specify/templates/plan-template.md ⚠ verify constitution gate wording; .specify/templates/spec-template.md ⚠ verify requirement alignment; .specify/templates/tasks-template.md ⚠ verify task guidance alignment
Follow-up TODOs: none
-->

# Project Constitution

## Core Principles

### I. Clean Code as a First-Class Deliverable
Every implementation MUST be clear, readable, and maintainable before it is considered complete. Business logic MUST be expressed in small, intention-revealing functions, with consistent naming, explicit data shapes, and no hidden side effects.

### II. TypeScript Strict Mode Everywhere
All source code MUST compile under strict TypeScript settings. The repository MUST enforce `strict: true` with `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictPropertyInitialization`, and no permissive fallbacks such as `any` or `@ts-ignore` without a documented exception.

### III. Testing Pyramid with Business Logic Coverage
The project MUST prioritize a Testing Pyramid: unit tests first, integration tests second, and end-to-end tests only for cross-system behavior. Business logic MUST maintain at least 80% coverage, and coverage reports MUST be reviewed before merging core changes.

### IV. JSDoc Documentation for Public APIs
All exported APIs, domain models, and complex functions MUST include JSDoc comments. Documentation MUST describe purpose, parameters, return values, and thrown errors so type-safe TypeScript code is also self-describing for reviewers and maintainers.

### V. Review Discipline and Compliance Verification
Every change MUST be reviewed against these principles. Pull requests MUST include a short checklist confirming TypeScript strict mode, coverage targets, JSDoc compliance, and clean-code validation for the modified area.

## Mandatory Technology Requirements

- The codebase MUST use TypeScript as the primary implementation language.
- Compiler configuration MUST enable `strict` mode and enforce `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictPropertyInitialization`, and `alwaysStrict`.
- `noUnusedLocals` and `noUnusedParameters` SHOULD be enabled to prevent dead code and simplify reviews.
- Any deviation from these compiler settings MUST be documented in the PR with a justification and follow-up remediation plan.

## Quality & Delivery Workflow

- Tests MUST be written before or alongside implementation for new business logic.
- Coverage checks MUST include business logic and be presented in PR review notes when the coverage threshold is not yet met.
- Code review MUST verify that new code is readable, well-documented, and aligned with the Testing Pyramid.
- Pull requests MUST include explicit validation of TypeScript compilation, linter checks, and a brief note on how the change preserves maintainability.

## Governance

This constitution is the reference standard for repository quality and must be applied to all development work. Amendments require a documented rationale, review by at least one peer, and a follow-up update to any impacted implementation or documentation.

- MAJOR version bumps are required for backward-incompatible principle removals or redefinitions.
- MINOR version bumps are required for adding new principles, constraints, or mandatory workflow requirements.
- PATCH version bumps are required for clarifications, wording refinements, or editorial corrections.
- All PRs MUST cite the current constitution version and confirm compliance with the relevant principles.

**Version**: 1.0.0 | **Ratified**: 2026-05-10 | **Last Amended**: 2026-05-10
