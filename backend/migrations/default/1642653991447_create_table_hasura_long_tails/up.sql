CREATE TABLE "hasura"."long_tails" ("json_id" serial NOT NULL, "tail" bpchar NOT NULL, PRIMARY KEY ("json_id") , UNIQUE ("json_id"));
