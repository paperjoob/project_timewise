# Project TimeWise

TimeWise is a web application where users can enter their time in for the current week. Administrators have the ability to create, delete, and update users. They also have the ability to approve timesheets.

This version uses React, Redux, Express, Passport, PostgreSQL, Material UI, SweetAlerts2 (a full list of dependencies can be found in `package.json`).

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `timewise_project` and create the necessary tables from the "database.sql" file.

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Completed Features
- [x] Admin can create new users
- [x] Admin can delete and update users
- [x] Admin can approve timesheets
- [x] Users can enter in hours
- [x] Users can update profile details

## Next Steps
Features that you would like to add at some point in the future.
- [ ] Navigate to past and future weeks
- [ ] Update total hours when editing timesheets

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `server/` contains the Express App

## Authors
* See Yang