DO $$ BEGIN
 CREATE TYPE "public"."messageRole" AS ENUM('system', 'user', 'assistant', 'tool');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "role" SET DATA TYPE messageRole;