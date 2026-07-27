-- Custom SQL migration file, put your code below! --
CREATE TYPE "public"."international_interest_status" AS ENUM('new', 'reviewing', 'contacted', 'qualified', 'declined', 'archived');--> statement-breakpoint
CREATE TABLE "international_interest_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(100) NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(80),
	"organization" varchar(160),
	"role_title" varchar(160),
	"country" varchar(120),
	"city" varchar(120),
	"category" varchar(80) NOT NULL,
	"destination" varchar(20) NOT NULL,
	"subject" varchar(150) NOT NULL,
	"message" text NOT NULL,
	"contribution_types" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"preferred_period" varchar(160),
	"website_url" varchar(1000),
	"linkedin_url" varchar(1000),
	"instagram_url" varchar(1000),
	"portfolio_url" varchar(1000),
	"preferred_contact_method" varchar(40),
	"consent_given" boolean NOT NULL,
	"non_contractual_acknowledged" boolean NOT NULL,
	"status" "public"."international_interest_status" DEFAULT 'new' NOT NULL,
	"source_page" varchar(300),
	"locale" varchar(10) DEFAULT 'fr' NOT NULL,
	"ip_hash" varchar(128),
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "international_interest_destination_status_idx" ON "international_interest_submissions" USING btree ("destination","status");--> statement-breakpoint
CREATE INDEX "international_interest_created_at_idx" ON "international_interest_submissions" USING btree ("created_at");
