ALTER TABLE "order" RENAME TO "onetimepurchase";--> statement-breakpoint
ALTER TABLE "onetimepurchase" DROP CONSTRAINT "order_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "onetimepurchase" ADD CONSTRAINT "onetimepurchase_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;