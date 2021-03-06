const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET ROUTE for Timesheet
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "hours" WHERE "employee_id" = $1 ORDER BY "id"`;
    pool.query(queryText, [req.user.id])
    .then( (result) => {
        console.log('--Timesheet GET ROUTER--', result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log('Error retrieving profile data', error);
        res.sendStatus(500);
    })
});

// GET ROUTE for ALL Timesheet - ADMIN
router.get('/admin', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT *, "user".first_name, "user".last_name FROM "hours"
    JOIN "user" ON "user".id = "hours".employee_id;`;
    pool.query(queryText)
    .then( (result) => {
        console.log('--Timesheet GET ROUTER--', result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log('Error retrieving profile data', error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;