CREATE TYPE "public"."admin_role" AS ENUM('super_admin', 'admin', 'communications', 'jury', 'viewer');--> statement-breakpoint
CREATE TYPE "public"."consent_type" AS ENUM('transactional_sms', 'marketing_sms', 'whatsapp', 'email_marketing', 'privacy_policy');--> statement-breakpoint
CREATE TYPE "public"."duplicate_status" AS ENUM('pending', 'merged', 'ignored', 'separate');--> statement-breakpoint
CREATE TYPE "public"."edition_status" AS ENUM('draft', 'active', 'closed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."message_channel" AS ENUM('sms', 'whatsapp', 'email');--> statement-breakpoint
CREATE TYPE "public"."message_status" AS ENUM('queued', 'processing', 'sent', 'delivered', 'failed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."registration_status" AS ENUM('pending', 'reviewed', 'shortlisted', 'approved', 'rejected', 'contacted', 'withdrawn');--> statement-breakpoint
CREATE TABLE "admin_credentials" (
	"admin_user_id" uuid PRIMARY KEY NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(320) NOT NULL,
	"full_name" varchar(200) NOT NULL,
	"role" "admin_role" DEFAULT 'viewer' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_user_id" uuid,
	"action" varchar(120) NOT NULL,
	"entity_type" varchar(100) NOT NULL,
	"entity_id" varchar(128),
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"ip_hash" varchar(128),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "candidate_consents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidate_id" uuid NOT NULL,
	"consent_type" "consent_type" NOT NULL,
	"granted" boolean NOT NULL,
	"consent_text_version" varchar(50) NOT NULL,
	"ip_hash" varchar(128),
	"user_agent" text,
	"granted_at" timestamp with time zone,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "candidate_duplicate_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidate_a_id" uuid NOT NULL,
	"candidate_b_id" uuid NOT NULL,
	"match_reason" varchar(80) NOT NULL,
	"match_score" real NOT NULL,
	"status" "duplicate_status" DEFAULT 'pending' NOT NULL,
	"reviewed_by" uuid,
	"reviewed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "candidates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(200) NOT NULL,
	"phone_raw" varchar(80),
	"phone_normalized" varchar(32),
	"phone_valid" boolean DEFAULT false NOT NULL,
	"email" varchar(320),
	"age" integer,
	"city" varchar(120),
	"region" varchar(120),
	"country_code" varchar(2) DEFAULT 'SN' NOT NULL,
	"source" varchar(50) DEFAULT 'website' NOT NULL,
	"legacy_supabase_id" varchar(128),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "candidates_legacy_supabase_id_unique" UNIQUE("legacy_supabase_id")
);
--> statement-breakpoint
CREATE TABLE "disciplines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name" varchar(160) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "disciplines_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "editions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(160) NOT NULL,
	"year" integer NOT NULL,
	"status" "edition_status" DEFAULT 'draft' NOT NULL,
	"starts_at" timestamp with time zone,
	"ends_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "editions_year_unique" UNIQUE("year")
);
--> statement-breakpoint
CREATE TABLE "message_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidate_id" uuid NOT NULL,
	"registration_id" uuid,
	"channel" "message_channel" NOT NULL,
	"provider" varchar(50) NOT NULL,
	"message_type" varchar(100) NOT NULL,
	"provider_message_id" varchar(160),
	"status" "message_status" DEFAULT 'queued' NOT NULL,
	"error_code" varchar(100),
	"error_message" text,
	"attempts" integer DEFAULT 0 NOT NULL,
	"queued_at" timestamp with time zone DEFAULT now() NOT NULL,
	"sent_at" timestamp with time zone,
	"delivered_at" timestamp with time zone,
	"failed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(320) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "preselection_registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidate_id" uuid NOT NULL,
	"edition_id" uuid NOT NULL,
	"discipline_id" uuid,
	"category" varchar(160),
	"audition_city" varchar(120),
	"status" "registration_status" DEFAULT 'pending' NOT NULL,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"source" varchar(50) DEFAULT 'website' NOT NULL,
	"legacy_supabase_id" varchar(128),
	"submission_key" uuid,
	"legacy_payload" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "preselection_registrations_legacy_supabase_id_unique" UNIQUE("legacy_supabase_id"),
	CONSTRAINT "preselection_registrations_submission_key_unique" UNIQUE("submission_key")
);
--> statement-breakpoint
CREATE TABLE "rate_limit_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scope" varchar(80) NOT NULL,
	"key_hash" varchar(128) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "admin_credentials" ADD CONSTRAINT "admin_credentials_admin_user_id_admin_users_id_fk" FOREIGN KEY ("admin_user_id") REFERENCES "public"."admin_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_admin_user_id_admin_users_id_fk" FOREIGN KEY ("admin_user_id") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_consents" ADD CONSTRAINT "candidate_consents_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_duplicate_reviews" ADD CONSTRAINT "candidate_duplicate_reviews_candidate_a_id_candidates_id_fk" FOREIGN KEY ("candidate_a_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_duplicate_reviews" ADD CONSTRAINT "candidate_duplicate_reviews_candidate_b_id_candidates_id_fk" FOREIGN KEY ("candidate_b_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_duplicate_reviews" ADD CONSTRAINT "candidate_duplicate_reviews_reviewed_by_admin_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_logs" ADD CONSTRAINT "message_logs_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_logs" ADD CONSTRAINT "message_logs_registration_id_preselection_registrations_id_fk" FOREIGN KEY ("registration_id") REFERENCES "public"."preselection_registrations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preselection_registrations" ADD CONSTRAINT "preselection_registrations_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preselection_registrations" ADD CONSTRAINT "preselection_registrations_edition_id_editions_id_fk" FOREIGN KEY ("edition_id") REFERENCES "public"."editions"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preselection_registrations" ADD CONSTRAINT "preselection_registrations_discipline_id_disciplines_id_fk" FOREIGN KEY ("discipline_id") REFERENCES "public"."disciplines"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "audit_logs_entity_idx" ON "audit_logs" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE UNIQUE INDEX "duplicate_pair_reason_idx" ON "candidate_duplicate_reviews" USING btree ("candidate_a_id","candidate_b_id","match_reason");--> statement-breakpoint
CREATE INDEX "candidates_phone_idx" ON "candidates" USING btree ("phone_normalized");--> statement-breakpoint
CREATE INDEX "candidates_email_lower_idx" ON "candidates" USING btree (lower("email"));--> statement-breakpoint
CREATE INDEX "candidates_city_idx" ON "candidates" USING btree ("city");--> statement-breakpoint
CREATE INDEX "message_logs_queue_idx" ON "message_logs" USING btree ("status","queued_at");--> statement-breakpoint
CREATE UNIQUE INDEX "message_logs_success_once_idx" ON "message_logs" USING btree ("registration_id","channel","message_type") WHERE "message_logs"."status" IN ('sent', 'delivered');--> statement-breakpoint
CREATE UNIQUE INDEX "newsletter_email_lower_idx" ON "newsletter_subscribers" USING btree (lower("email"));--> statement-breakpoint
CREATE INDEX "registrations_candidate_idx" ON "preselection_registrations" USING btree ("candidate_id");--> statement-breakpoint
CREATE INDEX "registrations_edition_status_idx" ON "preselection_registrations" USING btree ("edition_id","status");--> statement-breakpoint
CREATE INDEX "rate_limit_scope_key_time_idx" ON "rate_limit_events" USING btree ("scope","key_hash","created_at");
