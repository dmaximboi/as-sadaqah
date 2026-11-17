# As Sadaqah

**Trusted digital infrastructure for Islamic community giving.**

As Sadaqah is being built as a secure, transparent platform for verified mosques, independently reviewed projects, donations, financial accountability and measurable community impact.

## Technology

- Next.js App Router, React and TypeScript
- Neon PostgreSQL with Drizzle ORM
- Neon Auth with Google sign-in
- Cloudinary for controlled media storage
- Payment-provider adapter (Bachs / Flutterwave evaluation in progress)

## Security principles

- No payment secrets, OAuth secrets, database URLs or private documents are committed to source control.
- Donation and payout records use append-only ledger entries; balances are derived, not edited directly.
- A verified mosque does not automatically make every project verified.
- Payment callbacks are authenticated, idempotent and reconciled before ledger posting.
- Disbursements require role checks, approval controls and audit records.

## Project status

Initial foundation. Payment custody and provider integration remain disabled until the selected provider's legal role, API contract, settlement model and payout controls have been verified.

See `docs/ARCHITECTURE.md`, `docs/SECURITY.md`, `docs/FINANCIAL-MODEL.md` and `.env.example` for implementation details.

## Local development

1. Use Node.js 22 or newer.
2. Copy `.env.example` to `.env.local` and fill in credentials from your own Neon/Vercel and Cloudinary projects.
3. Install dependencies with `npm install`.
4. Run `npm run db:generate`, then `npm run db:migrate` after reviewing the generated migration.
5. Start with `npm run dev`.

Do not run migrations against production until a reviewed migration has been tested against a non-production Neon branch.
