ALTER TABLE "elev_table" ALTER COLUMN "status" SET DEFAULT 'not_checked_in';--> statement-breakpoint
ALTER TABLE "elev_table" ALTER COLUMN "status" DROP NOT NULL;