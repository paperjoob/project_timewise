const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT *, "user".first_name, "user".last_name FROM "hours"
    JOIN "user" ON "user".id = "hours".employee_id
    WHERE "hours".id = $1`;
    pool.query(queryText, [req.params.id])
    .then( (result) => {
        console.log('-- EDIT TIME GET ROUTER', result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log('Error retrieving profile data', error);
        res.sendStatus(500);
    })
 });

// put request to update uer time
router.put('/:id', rejectUnauthenticated, (req, res) => {
    const updatedTime = req.body;
    let queryText = `UPDATE "hours" SET "monday_hours" = $1, "tuesday_hours" = $2, "wednesday_hours" = $3, "thursday_hours" = $4, "friday_hours" = $5,
    "comments" = $6,     "total" = $7, "deny_request" = false WHERE "id" = $8`;
    let queryValues = [
        updatedTime.monday_hours,
        updatedTime.tuesday_hours,
        updatedTime.wednesday_hours,
        updatedTime.thursday_hours,
        updatedTime.friday_hours,
        updatedTime.comments,
        updatedTime.total,
        // updatedTime.deny_request,
        updatedTime.id
    ];
    pool.query(queryText, queryValues)
    .then(() => {res.sendStatus(200)})
    .catch((error) => {
        console.log('Error updating USER TIME IN ROUTE', error);
        res.sendStatus(500);
    })
}); // end PUT ROUTE

module.exports = router;