DROP INDEX IF EXISTS "message_logs_queue_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "message_logs_success_once_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "message_logs_registration_channel_type_idx";--> statement-breakpoint

CREATE TYPE "message_status_v2" AS ENUM (
  'queued', 'pending', 'processing', 'accepted', 'sent', 'delivered',
  'retry_scheduled', 'failed', 'undelivered', 'suppressed', 'cancelled'
);--> statement-breakpoint
ALTER TABLE "message_logs" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "message_logs" ALTER COLUMN "status" TYPE "message_status_v2"
  USING (CASE WHEN "status"::text = 'queued' THEN 'pending' ELSE "status"::text END)::"message_status_v2";--> statement-breakpoint
DROP TYPE "message_status";--> statement-breakpoint
ALTER TYPE "message_status_v2" RENAME TO "message_status";--> statement-breakpoint
ALTER TABLE "message_logs" ALTER COLUMN "status" SET DEFAULT 'pending';--> statement-breakpoint

ALTER TYPE "consent_type" ADD VALUE IF NOT EXISTS 'transactional_registration_confirmation';--> statement-breakpoint
ALTER TYPE "consent_type" ADD VALUE IF NOT EXISTS 'operational_preselection_updates';--> statement-breakpoint
ALTER TYPE "consent_type" ADD VALUE IF NOT EXISTS 'marketing';--> statement-breakpoint

ALTER TABLE "message_logs" RENAME COLUMN "attempts" TO "attempt_count";--> statement-breakpoint
ALTER TABLE "message_logs" RENAME COLUMN "error_code" TO "failure_code";--> statement-breakpoint
ALTER TABLE "message_logs" DROP COLUMN "queued_at";--> statement-breakpoint
ALTER TABLE "message_logs" DROP COLUMN "error_message";--> statement-breakpoint
ALTER TABLE "message_logs" ADD COLUMN "template_version" varchar(100) DEFAULT 'preselection-confirmation-v1' NOT NULL;--> statement-breakpoint
ALTER TABLE "message_logs" ADD COLUMN "recipient_normalized" varchar(32);--> statement-breakpoint
ALTER TABLE "message_logs" ADD COLUMN "idempotency_key" varchar(255);--> statement-breakpoint
ALTER TABLE "message_logs" ADD COLUMN "last_attempt_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "message_logs" ADD COLUMN "next_attempt_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "message_logs" ADD COLUMN "failure_category" varchar(50);--> statement-breakpoint
ALTER TABLE "message_logs" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint

UPDATE "message_logs" AS message
SET "recipient_normalized" = candidate."phone_normalized"
FROM "candidates" AS candidate
WHERE candidate."id" = message."candidate_id";--> statement-breakpoint

UPDATE "message_logs"
SET "idempotency_key" = 'preselection_confirmation:' || COALESCE("registration_id"::text, "id"::text) || ':' || "channel"::text || ':' || "template_version";--> statement-breakpoint
ALTER TABLE "message_logs" ALTER COLUMN "idempotency_key" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "message_logs" ADD CONSTRAINT "message_logs_attempt_count_nonnegative" CHECK ("attempt_count" >= 0);--> statement-breakpoint

CREATE INDEX "message_logs_queue_idx" ON "message_logs" USING btree ("status", "next_attempt_at", "created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "message_logs_idempotency_key_idx" ON "message_logs" USING btree ("idempotency_key");--> statement-breakpoint
CREATE UNIQUE INDEX "message_logs_provider_message_id_idx" ON "message_logs" USING btree ("provider_message_id") WHERE "provider_message_id" IS NOT NULL;
