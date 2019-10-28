const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET USER PROFILE DATA
router.get('/', rejectUnauthenticated, (req, res) => {
   const queryText = `SELECT * FROM "user" WHERE "id" = $1;`;
   pool.query(queryText, [req.user.id])
   .then( (result) => {
       console.log('Profile GET ROUTER', result.rows);
       res.send(result.rows);
   })
   .catch( (error) => {
       console.log('Error retrieving profile data', error);
       res.sendStatus(500);
   })
});

router.put('/', rejectUnauthenticated, (req, res) => {
    const updatedUser = req.body;
    const queryText = `UPDATE "user" SET "first_name" = $1, "last_name" = $2, "email" = $3, "street" = $4, "city" = $5, "state" = $6, "zipcode" = $7, "phone" = $8 WHERE "id" = $9;`;
    const queryValues = [
        updatedUser.first_name,
        updatedUser.last_name,
        updatedUser.email,
        updatedUser.street,
        updatedUser.city,
        updatedUser.state,
        updatedUser.zipcode,
        updatedUser.phone,
        updatedUser.id
    ];

    pool.query(queryText, queryValues)
        .then(() => {res.sendStatus(200) 
        console.log(queryValues) 
        })
        .catch((error) => {
            console.log('Error putting UPDATE IN ROUTE', error);
            res.sendStatus(500);
        })
}); // end PUT ROUTE

module.exports = router;