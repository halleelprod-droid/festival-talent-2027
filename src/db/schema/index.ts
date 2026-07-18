import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const editionStatus = pgEnum("edition_status", ["draft", "active", "closed", "archived"]);
export const registrationStatus = pgEnum("registration_status", [
  "pending", "reviewed", "shortlisted", "approved", "rejected", "contacted", "withdrawn",
]);
export const consentType = pgEnum("consent_type", [
  "transactional_sms", "marketing_sms", "whatsapp", "email_marketing", "privacy_policy",
]);
export const messageChannel = pgEnum("message_channel", ["sms", "whatsapp", "email"]);
export const messageStatus = pgEnum("message_status", [
  "queued", "processing", "sent", "delivered", "failed", "cancelled",
]);
export const adminRole = pgEnum("admin_role", [
  "super_admin", "admin", "communications", "jury", "viewer",
]);
export const duplicateStatus = pgEnum("duplicate_status", ["pending", "merged", "ignored", "separate"]);

export const editions = pgTable("editions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 160 }).notNull(),
  year: integer("year").notNull().unique(),
  status: editionStatus("status").default("draft").notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  ...timestamps,
});

export const candidates = pgTable("candidates", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 200 }).notNull(),
  phoneRaw: varchar("phone_raw", { length: 80 }),
  phoneNormalized: varchar("phone_normalized", { length: 32 }),
  phoneValid: boolean("phone_valid").default(false).notNull(),
  email: varchar("email", { length: 320 }),
  // Date de naissance civile (sans heure ni fuseau) = source de vérité.
  // L'âge n'est jamais persisté : il est calculé dynamiquement
  // (src/lib/candidate-date-of-birth.ts).
  // Nullable : autorise les imports historiques sans date de naissance (flagués
  // pour revue manuelle) sans jamais fabriquer de date à partir d'un âge.
  dateOfBirth: date("date_of_birth", { mode: "string" }),
  city: varchar("city", { length: 120 }),
  region: varchar("region", { length: 120 }),
  countryCode: varchar("country_code", { length: 2 }).default("SN").notNull(),
  source: varchar("source", { length: 50 }).default("website").notNull(),
  // Nom TypeScript générique ; le nom SQL historique est conservé jusqu'à une
  // migration de renommage dédiée afin de ne pas réécrire les migrations passées.
  legacySourceId: varchar("legacy_supabase_id", { length: 128 }).unique(),
  ...timestamps,
}, (table) => [
  index("candidates_phone_idx").on(table.phoneNormalized),
  index("candidates_email_lower_idx").on(sql`lower(${table.email})`),
  index("candidates_city_idx").on(table.city),
  // Bornes de sanité immuables. La règle « pas dans le futur » et l'éligibilité
  // vivent dans la couche applicative (CURRENT_DATE n'est pas immutable en CHECK).
  check(
    "candidates_dob_reasonable",
    sql`${table.dateOfBirth} IS NULL OR ${table.dateOfBirth} >= '1900-01-01'`,
  ),
]);

export const disciplines = pgTable("disciplines", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const preselectionRegistrations = pgTable("preselection_registrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  candidateId: uuid("candidate_id").notNull().references(() => candidates.id, { onDelete: "restrict" }),
  editionId: uuid("edition_id").notNull().references(() => editions.id, { onDelete: "restrict" }),
  disciplineId: uuid("discipline_id").references(() => disciplines.id, { onDelete: "set null" }),
  category: varchar("category", { length: 160 }),
  auditionCity: varchar("audition_city", { length: 120 }),
  status: registrationStatus("status").default("pending").notNull(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow().notNull(),
  source: varchar("source", { length: 50 }).default("website").notNull(),
  legacySourceId: varchar("legacy_supabase_id", { length: 128 }).unique(),
  submissionKey: uuid("submission_key").unique(),
  legacyPayload: jsonb("legacy_payload"),
  ...timestamps,
}, (table) => [
  index("registrations_candidate_idx").on(table.candidateId),
  index("registrations_edition_status_idx").on(table.editionId, table.status),
]);

export const candidateConsents = pgTable("candidate_consents", {
  id: uuid("id").primaryKey().defaultRandom(),
  candidateId: uuid("candidate_id").notNull().references(() => candidates.id, { onDelete: "cascade" }),
  consentType: consentType("consent_type").notNull(),
  granted: boolean("granted").notNull(),
  consentTextVersion: varchar("consent_text_version", { length: 50 }).notNull(),
  ipHash: varchar("ip_hash", { length: 128 }),
  userAgent: text("user_agent"),
  grantedAt: timestamp("granted_at", { withTimezone: true }),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const messageLogs = pgTable("message_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  candidateId: uuid("candidate_id").notNull().references(() => candidates.id, { onDelete: "restrict" }),
  registrationId: uuid("registration_id").references(() => preselectionRegistrations.id, { onDelete: "set null" }),
  channel: messageChannel("channel").notNull(),
  provider: varchar("provider", { length: 50 }).notNull(),
  messageType: varchar("message_type", { length: 100 }).notNull(),
  providerMessageId: varchar("provider_message_id", { length: 160 }),
  status: messageStatus("status").default("queued").notNull(),
  errorCode: varchar("error_code", { length: 100 }),
  errorMessage: text("error_message"),
  attempts: integer("attempts").default(0).notNull(),
  queuedAt: timestamp("queued_at", { withTimezone: true }).defaultNow().notNull(),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  deliveredAt: timestamp("delivered_at", { withTimezone: true }),
  failedAt: timestamp("failed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index("message_logs_queue_idx").on(table.status, table.queuedAt),
  uniqueIndex("message_logs_success_once_idx")
    .on(table.registrationId, table.channel, table.messageType)
    .where(sql`${table.status} IN ('sent', 'delivered')`),
  uniqueIndex("message_logs_registration_channel_type_idx")
    .on(table.registrationId, table.channel, table.messageType)
    .where(sql`${table.registrationId} IS NOT NULL`),
]);

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  fullName: varchar("full_name", { length: 200 }).notNull(),
  role: adminRole("role").default("viewer").notNull(),
  active: boolean("active").default(true).notNull(),
  ...timestamps,
});

export const adminCredentials = pgTable("admin_credentials", {
  adminUserId: uuid("admin_user_id").primaryKey().references(() => adminUsers.id, { onDelete: "cascade" }),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  adminUserId: uuid("admin_user_id").references(() => adminUsers.id, { onDelete: "set null" }),
  action: varchar("action", { length: 120 }).notNull(),
  entityType: varchar("entity_type", { length: 100 }).notNull(),
  entityId: varchar("entity_id", { length: 128 }),
  metadata: jsonb("metadata").default({}).notNull(),
  ipHash: varchar("ip_hash", { length: 128 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("audit_logs_entity_idx").on(table.entityType, table.entityId)]);

export const candidateDuplicateReviews = pgTable("candidate_duplicate_reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  candidateAId: uuid("candidate_a_id").notNull().references(() => candidates.id, { onDelete: "cascade" }),
  candidateBId: uuid("candidate_b_id").notNull().references(() => candidates.id, { onDelete: "cascade" }),
  matchReason: varchar("match_reason", { length: 80 }).notNull(),
  matchScore: real("match_score").notNull(),
  status: duplicateStatus("status").default("pending").notNull(),
  reviewedBy: uuid("reviewed_by").references(() => adminUsers.id, { onDelete: "set null" }),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex("duplicate_pair_reason_idx").on(table.candidateAId, table.candidateBId, table.matchReason),
]);

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 320 }).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("newsletter_email_lower_idx").on(sql`lower(${table.email})`)]);

export const rateLimitEvents = pgTable("rate_limit_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  scope: varchar("scope", { length: 80 }).notNull(),
  keyHash: varchar("key_hash", { length: 128 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("rate_limit_scope_key_time_idx").on(table.scope, table.keyHash, table.createdAt)]);
