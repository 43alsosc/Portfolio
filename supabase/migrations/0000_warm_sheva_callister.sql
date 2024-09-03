CREATE TABLE IF NOT EXISTS "elev_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"checked_in" boolean NOT NULL,
	"checked_in_at" timestamp,
	"group_id" text
);
