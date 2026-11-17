# Security baseline

This repository is an initial foundation, not a completed security audit or a claim of production readiness.

## Secrets
- Never commit .env files, OAuth client secrets, database connection strings, provider API keys or Cloudinary API secrets.
- Use Vercel environment variables scoped separately to Development, Preview and Production.
- Rotate credentials immediately if exposed.
- Only expose intentionally public values through NEXT_PUBLIC_ variables.

## Authentication and authorisation
- Neon Auth is the identity provider. Google OAuth must be enabled in Neon Auth project settings.
- Authentication is not authorisation. App roles, mosque membership, ownership and approval rights are checked in the application database.
- Use least privilege, MFA for administrators when supported, session revocation and audit logs.
- Do not allow a user to assign themselves a privileged role.

## Data and uploads
- Validate all inputs on the server.
- Use parameterised ORM queries.
- Apply request size limits and rate limits to auth, upload, donation and webhook endpoints.
- Private evidence uses private storage and short-lived signed access.
- Scan uploads, validate actual MIME type and file size, and randomise storage keys.
- Minimise personal data and define retention/deletion rules.

## Financial controls
- Never trust client payment status.
- Verify webhook signatures against the raw request body and reject invalid signatures.
- Enforce idempotency and replay protection.
- Never mutate posted ledger entries; reverse them.
- Require dual control for disbursement approvals and bank-account changes.

## Before production
Threat model the full app, run dependency and secret scanning, test authorisation boundaries, review migrations, test backups/restore, configure monitoring and alerts, and commission an independent security review. Do not describe this initial scaffold as fully secure.
