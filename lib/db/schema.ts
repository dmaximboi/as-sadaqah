import {
  pgTable, pgEnum, uuid, varchar, text, timestamp, integer, bigint,
  boolean, jsonb, uniqueIndex, index, check
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const verificationStatus = pgEnum("verification_status", ["not_started", "pending", "changes_requested", "verified", "rejected", "suspended"]);
export const projectStatus = pgEnum("project_status", ["draft", "submitted", "under_review", "changes_requested", "approved", "live", "funded", "in_progress", "completed", "suspended", "cancelled", "archived"]);
export const donationStatus = pgEnum("donation_status", ["initiated", "pending", "succeeded", "failed", "refunded", "reversed"]);
export const ledgerAccountType = pgEnum("ledger_account_type", ["asset", "liability", "income", "expense", "equity"]);
export const ledgerEntrySide = pgEnum("ledger_entry_side", ["debit", "credit"]);
export const disbursementStatus = pgEnum("disbursement_status", ["requested", "under_review", "approved", "rejected", "processing", "paid", "failed", "cancelled"]);

export const appUsers = pgTable("app_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  neonAuthUserId: varchar("neon_auth_user_id", { length: 255 }).notNull().unique(),
  displayName: varchar("display_name", { length: 160 }),
  phone: varchar("phone", { length: 40 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});

export const organisations = pgTable("organisations", {
  id: uuid("id").defaultRandom().primaryKey(),
  legalName: varchar("legal_name", { length: 220 }).notNull(),
  registrationNumber: varchar("registration_number", { length: 100 }),
  countryCode: varchar("country_code", { length: 2 }).notNull().default("NG"),
  verification: verificationStatus("verification").notNull().default("not_started"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const mosques = pgTable("mosques", {
  id: uuid("id").defaultRandom().primaryKey(),
  organisationId: uuid("organisation_id").references(() => organisations.id),
  name: varchar("name", { length: 220 }).notNull(),
  slug: varchar("slug", { length: 240 }).notNull().unique(),
  description: text("description"),
  countryCode: varchar("country_code", { length: 2 }).notNull().default("NG"),
  state: varchar("state", { length: 100 }),
  city: varchar("city", { length: 120 }),
  address: text("address"),
  identityStatus: verificationStatus("identity_status").notNull().default("not_started"),
  locationStatus: verificationStatus("location_status").notNull().default("not_started"),
  organisationStatus: verificationStatus("organisation_status").notNull().default("not_started"),
  financialStatus: verificationStatus("financial_status").notNull().default("not_started"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
}, (t) => [index("mosques_city_idx").on(t.countryCode, t.city)]);

export const mosqueMembers = pgTable("mosque_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  mosqueId: uuid("mosque_id").notNull().references(() => mosques.id),
  userId: uuid("user_id").notNull().references(() => appUsers.id),
  role: varchar("role", { length: 40 }).notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
}, (t) => [uniqueIndex("mosque_member_unique").on(t.mosqueId, t.userId)]);

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  mosqueId: uuid("mosque_id").notNull().references(() => mosques.id),
  title: varchar("title", { length: 220 }).notNull(),
  slug: varchar("slug", { length: 240 }).notNull().unique(),
  summary: varchar("summary", { length: 500 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 80 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("NGN"),
  targetMinor: bigint("target_minor", { mode: "bigint" }).notNull(),
  status: projectStatus("status").notNull().default("draft"),
  verification: verificationStatus("verification").notNull().default("not_started"),
  deadline: timestamp("deadline", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
}, (t) => [
  check("project_target_positive", sql`${t.targetMinor} > 0`),
  index("projects_status_created_idx").on(t.status, t.createdAt)
]);

export const projectMilestones = pgTable("project_milestones", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").notNull().references(() => projects.id),
  title: varchar("title", { length: 180 }).notNull(),
  description: text("description"),
  targetMinor: bigint("target_minor", { mode: "bigint" }),
  sortOrder: integer("sort_order").notNull().default(0),
  completedAt: timestamp("completed_at", { withTimezone: true })
});

export const projectEvidence = pgTable("project_evidence", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").notNull().references(() => projects.id),
  uploadedBy: uuid("uploaded_by").notNull().references(() => appUsers.id),
  kind: varchar("kind", { length: 40 }).notNull(),
  storageKey: varchar("storage_key", { length: 500 }).notNull(),
  visibility: varchar("visibility", { length: 20 }).notNull().default("private"),
  checksum: varchar("checksum", { length: 128 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const donations = pgTable("donations", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").references(() => projects.id),
  mosqueId: uuid("mosque_id").references(() => mosques.id),
  donorUserId: uuid("donor_user_id").references(() => appUsers.id),
  donorDisplayName: varchar("donor_display_name", { length: 120 }),
  anonymous: boolean("anonymous").notNull().default(false),
  amountMinor: bigint("amount_minor", { mode: "bigint" }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull(),
  status: donationStatus("status").notNull().default("initiated"),
  provider: varchar("provider", { length: 40 }),
  providerReference: varchar("provider_reference", { length: 180 }),
  idempotencyKey: varchar("idempotency_key", { length: 180 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
}, (t) => [
  check("donation_amount_positive", sql`${t.amountMinor} > 0`),
  uniqueIndex("donation_provider_reference_unique").on(t.provider, t.providerReference),
  index("donations_project_status_idx").on(t.projectId, t.status)
]);

export const ledgerAccounts = pgTable("ledger_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: varchar("code", { length: 80 }).notNull().unique(),
  name: varchar("name", { length: 180 }).notNull(),
  type: ledgerAccountType("type").notNull(),
  currency: varchar("currency", { length: 3 }).notNull(),
  ownerType: varchar("owner_type", { length: 40 }),
  ownerId: uuid("owner_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});

export const ledgerTransactions = pgTable("ledger_transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  reference: varchar("reference", { length: 100 }).notNull().unique(),
  kind: varchar("kind", { length: 50 }).notNull(),
  status: varchar("status", { length: 30 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull(),
  source: varchar("source", { length: 50 }).notNull(),
  sourceReference: varchar("source_reference", { length: 180 }),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
}, (t) => [uniqueIndex("ledger_source_reference_unique").on(t.source, t.sourceReference)]);

export const ledgerEntries = pgTable("ledger_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  transactionId: uuid("transaction_id").notNull().references(() => ledgerTransactions.id),
  accountId: uuid("account_id").notNull().references(() => ledgerAccounts.id),
  side: ledgerEntrySide("side").notNull(),
  amountMinor: bigint("amount_minor", { mode: "bigint" }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
}, (t) => [
  check("ledger_entry_amount_positive", sql`${t.amountMinor} > 0`),
  index("ledger_entries_transaction_idx").on(t.transactionId),
  index("ledger_entries_account_idx").on(t.accountId)
]);

export const disbursements = pgTable("disbursements", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").notNull().references(() => projects.id),
  requestedBy: uuid("requested_by").notNull().references(() => appUsers.id),
  amountMinor: bigint("amount_minor", { mode: "bigint" }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull(),
  status: disbursementStatus("status").notNull().default("requested"),
  destinationToken: varchar("destination_token", { length: 200 }),
  providerReference: varchar("provider_reference", { length: 180 }),
  approvedBy: uuid("approved_by").references(() => appUsers.id),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
}, (t) => [check("disbursement_amount_positive", sql`${t.amountMinor} > 0`)]);

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorUserId: uuid("actor_user_id").references(() => appUsers.id),
  action: varchar("action", { length: 120 }).notNull(),
  resourceType: varchar("resource_type", { length: 80 }).notNull(),
  resourceId: varchar("resource_id", { length: 180 }).notNull(),
  requestId: varchar("request_id", { length: 120 }),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
}, (t) => [index("audit_resource_idx").on(t.resourceType, t.resourceId), index("audit_actor_idx").on(t.actorUserId)]);
