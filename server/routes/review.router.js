const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET NOTIFICATIONS
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

router.put('/:id', rejectUnauthenticated, (req, res) => {
    const updatedRequest = req.body;
    const queryText = `UPDATE "hours" SET "is_approved" = $1 WHERE "id" = $2;`;
    const queryValues = [
        updatedRequest.is_approved,
        updatedRequest.id
        ];

    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('-- Review Router Error for PUT --', err);
        res.sendStatus(500);
      });
  });

module.exports = router;