# Financial model and controls

## Non-negotiable boundary

As Sadaqah's database ledger is an accounting record, not a stored-value wallet and not proof that funds are held by As Sadaqah. Actual custody, settlement, refunds and payouts must be performed by a vetted provider under a compliant arrangement. Do not launch live collection until local legal/regulatory review confirms the exact model in every operating country.

## Ledger principles

- Use integer minor units, never floating point.
- Each posted transaction must balance: total debits equal total credits per currency.
- Entries are immutable. Corrections use reversing transactions.
- Each provider event and internal operation has an idempotency key.
- Keep provider transaction ID, settlement ID and payout reference.
- Distinguish gross donation, processor fees, refunds, reversals, restricted allocation, held allocation and paid-out amounts.
- Do not infer that a payment succeeded from a browser redirect. Verify provider-side status.
- Reconcile provider statements against ledger entries on a schedule.

## Payout lifecycle

requested -> under_review -> approved -> processing -> paid

Rejected, failed and cancelled requests remain auditable. Requester and approver must be different authorised people. A bank account change must trigger re-verification, multi-person approval, a cooling-off period and notifications.

## Provider adapter

Implement a narrow interface for creating payment sessions, verifying webhook signatures, fetching transaction status, initiating refunds and requesting payouts. Keep Bachs and Flutterwave implementations isolated. Provider-specific credentials must be server-only. Do not add a provider until its legal entity, licences/authorisations, supported countries/currencies, custody/settlement model, escrow or subaccount semantics, payout controls, webhook signing and dispute handling are documented and reviewed.

## Launch gates

No live money movement until:
1. Provider contract and regulatory role reviewed by qualified counsel.
2. Test and production credentials separated.
3. Webhook signature verification and replay protection tested.
4. Reconciliation and refund/reversal flows tested.
5. Payout dual-control and destination-change controls tested.
6. Incident response, support and dispute processes operational.

## Database migration note

`drizzle/0001_financial_integrity.sql` is a supplemental PostgreSQL hardening script. Drizzle Kit only applies migrations recorded in its migration journal. After generating and applying the base schema migration in a non-production Neon branch, apply this supplemental SQL through the Neon SQL Editor (or incorporate it into a reviewed generated migration before applying). Do not assume this standalone file is automatically run by `drizzle-kit migrate`.
