const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// // GET ROUTE
// router.get('/', (req, res) => {
    
// });

// GET ROUTE for WEEKDAYS
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "hours" WHERE "employee_id" = $1`;
    pool.query(queryText, [req.user.id])
    .then( (result) => {
        console.log('--Week Days GET ROUTER--', result.rows);
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
    const addTime = req.body;
    const queryText = `INSERT INTO "hours" ("employee_id", "monday", "tuesday", "wednesday", "thursday", "friday", "monday_hours", "tuesday_hours", "wednesday_hours", "thursday_hours", "friday_hours") 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
    const queryValues = [
        addTime.employee_id,
        addTime.monday,
        addTime.tuesday,
        addTime.wednesday,
        addTime.thursday,
        addTime.friday,
        addTime.monday_hours,
        addTime.tuesday_hours,
        addTime.wednesday_hours,
        addTime.thursday_hours,
        addTime.friday_hours
    ];
    pool.query(queryText, queryValues)
    .then( () => {
        res.sendStatus(201); 
        console.log(req.body)
    })
    .catch( (error) => {
        console.log('Error completing POST for Add Time', error);
        res.sendStatus(200);
    });
}); // end POST Route for Adding Time

module.exports = router;