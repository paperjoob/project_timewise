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
        console.log('-- Review GET ROUTER', result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log('Error retrieving profile data', error);
        res.sendStatus(500);
    })
 });

router.put('/', (req, res) => {
    const updatedTime = req.body;
    let queryText = '';
    let queryValues = [];

})

module.exports = router;