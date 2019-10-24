const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// // GET ROUTE
// router.get('/', (req, res) => {
    
// });

// GET ROUTE for grabbing newly added post
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
    let queryText = '';
    let selectQuery = `SELECT "monday" from "hours" WHERE "employee_id" = $1;`;
    let queryValues = [];
    pool.query(selectQuery, [addTime.employee_id] )
    .then( (result) => {
        for (let i = 0; i < result.rows.length; i++) {
            if (addTime.monday === result.rows[i].monday) {
                res.sendStatus(403);
                return false;
            }
        } {
            queryText = `INSERT INTO "hours" ("employee_id", "monday", "tuesday", "wednesday", "thursday", "friday", "monday_hours", "tuesday_hours", "wednesday_hours", "thursday_hours", "friday_hours", "total", "submitted", "is_approved", "deny_request") 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`;
            queryValues = [
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
                addTime.friday_hours,
                addTime.total,
                addTime.submitted,
                addTime.is_approved,
                addTime.deny_request
            ];
        }
        console.log(req.body)
        pool.query(queryText, queryValues)
        .then( () => {
            res.sendStatus(201); 
            console.log(req.body)
        })
        .catch( (error) => {
            console.log('Error completing POST for Add Time', error);
            res.sendStatus(500);
        });
    }).catch( (error) => {
        console.log('Select post doesnt work', error);
        res.sendStatus(500);
    })
}); // end POST Route for Adding Time

// app.put('/', (req, res) => {
//     const updatedTime = req.body;
//     let queryText = '';
//     let queryValues = [];

// })

module.exports = router;