# As Sadaqah architecture

## Product boundary

The platform coordinates mosque identity, project review, donor intent, payment-provider references, an internal accounting ledger and controlled payout workflows. It does not itself claim to be a bank, wallet, escrow agent or custodian. The selected licensed provider must hold and move funds under a contract and regulatory model that supports the product's actual flow.

## Runtime

- Next.js App Router and React Server Components.
- Neon PostgreSQL, accessed through Drizzle and the Neon serverless driver.
- Neon Auth for Google OAuth. Configure Google in Neon Auth and the UI provider; the application must never receive Google's client secret.
- Cloudinary for media. Private evidence must use authenticated delivery or signed access; never publish identity documents or bank evidence through public URLs.
- Payment adapter boundary. Provider-specific API calls must be server-only.

## Security model

- Default-deny for privileged operations.
- The authenticated identity is resolved server-side; never trust user IDs or roles submitted by the browser.
- Mosque membership and role are checked against database records on every sensitive operation.
- Project review is independent from mosque verification.
- Money is represented in integer minor units and currency is explicit.
- Financial state changes are append-only ledger events. Do not edit a posted ledger entry or calculate balances from client-supplied totals.
- Webhooks must be signature-verified, idempotent and reconciled against provider transaction status.
- Payout requests and approvals are separate actions. Require two distinct authorised people for payout approval and enforce a cooling-off period for bank destination changes.
- Audit sensitive changes with actor, resource, timestamp and request correlation ID.

## Planned modules

Identity and access; mosque directory; organisation and mosque verification; projects and milestones; evidence vault; donation orchestration; double-entry ledger; payout approvals; provider adapters; moderation and fraud; notifications; events; Islamic library; Zakat and Waqf (scholar-reviewed); analytics and reporting.
