
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- create a database in PostgreSQL called "timewise_project"
-- create the necessary tables

CREATE TABLE "user" (
"id" SERIAL PRIMARY KEY,
"username" VARCHAR (80) UNIQUE NOT NULL,
"password" VARCHAR (1000) NOT NULL,
"first_name" varchar(60),
"last_name" varchar(60),
"email" varchar(120),
"street" varchar(200),
"city" varchar(200),
"state" varchar(2),
"zipcode" varchar(20),
"phone" varchar(20),
"admin" boolean DEFAULT FALSE
);

CREATE TABLE "hours" (
"id" serial primary key,
"employee_id" INT REFERENCES "user",
"date" TIMESTAMP DEFAULT NOW() NOT NULL,
"comments" varchar(255),
"monday" varchar(20),
"tuesday" varchar(20),
"wednesday" varchar(20),
"thursday" varchar(20),
"friday" varchar(20),
"monday_hours" varchar(5),
"tuesday_hours" varchar(5),
"wednesday_hours" varchar(5),
"thursday_hours" varchar(5),
"friday_hours" varchar(5),
"total" varchar(10),
"submitted" boolean,
"is_approved" boolean,
"deny_request" boolean
);