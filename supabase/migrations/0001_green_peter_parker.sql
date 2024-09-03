DO $$ BEGIN
 CREATE TYPE "public"."status_enum" AS ENUM('checked_in', 'not_checked_in');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint