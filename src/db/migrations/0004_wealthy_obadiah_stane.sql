CREATE TABLE "oss_resources" (
	"id" text PRIMARY KEY NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"file_size" integer NOT NULL,
	"mime_type" varchar(100) NOT NULL,
	"url" text NOT NULL,
	"bucket" varchar(100) NOT NULL,
	"path" text NOT NULL,
	"uploaded_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"metadata" text
);
