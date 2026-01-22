-- EMERGENCY MANUAL SEED SCRIPT
-- Replace 'auth0|123456' with your actual Auth0 User ID
-- Replace 'Manual User' and 'avatar_url' as needed.

INSERT INTO "public"."profiles" ("id", "full_name", "avatar_url", "updated_at")
VALUES (
  'auth0|123456', 
  'Manual User', 
  'https://ui-avatars.com/api/?name=Manual+User', 
  now()
)
ON CONFLICT ("id") DO UPDATE SET
  "full_name" = EXCLUDED."full_name",
  "avatar_url" = EXCLUDED."avatar_url",
  "updated_at" = EXCLUDED."updated_at";
