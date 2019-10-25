const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET NOTIFICATIONS
router.get('/', rejectUnauthenticated, (req, res) => {
   const queryText = `SELECT "user".id, "user".first_name, "user".last_name, "hours".monday, "hours".is_approved, "hours".deny_request FROM "hours"
   JOIN "user" ON "user".id = "hours".employee_id
   WHERE "hours".is_approved = false`;
   pool.query(queryText)
   .then( (result) => {
       console.log('Notifications GET ROUTER', result.rows);
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