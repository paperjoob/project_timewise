const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');

// GET EMPLOYEE DETAILS AND USERNAME
// router.get('/', rejectUnauthenticated, (req, res) => {
//    const queryText = `SELECT "user".username, "first_name", "last_name", "email", "street", "city", "state", "zipcode", "phone", "user_login_id" FROM "user_info"
//    JOIN "user" ON "user".id = "user_info".user_login_id;`;
//    pool.query(queryText)
//    .then( (result) => {
//        console.log('--Manage Employee GET ROUTER--', result.rows);
//        res.send(result.rows);
//    })
//    .catch( (error) => {
//        console.log('Error retrieving employee data', error);
//        res.sendStatus(500);
//    })
// });

// GET EMPLOYEE USERNAMES -- ONLY -- 
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "user" ORDER BY "id";`;
    pool.query(queryText)
    .then( (result) => {
        console.log('--Manage Employee GET Usernames Server--', result.rows);
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log('Error retrieving employee data', error);
        res.sendStatus(500);
    })
 });

 // GET Request to display Details for EDIT PAGE
router.get(`/edit/:id`, (req, res) => {
    const queryText = `SELECT * FROM "user" WHERE id = $1`;
    pool.query(queryText, [req.params.id])
    .then( (result) => { res.send(result.rows); })
    .catch( (error) => {
        console.log('DETAILS EDIT ERROR', error);
        res.sendStatus(500);
    })
  }); // end router.get for Details

// ADD NEW EMPLOYEE - POST ROUTE
router.post('/addemployee', (req, res, next) => {  
        const username = req.body.username;
        const password = encryptLib.encryptPassword(req.body.password);
        
        const queryText = `INSERT INTO "user" (username, password, first_name, last_name, email, street, city, state, zipcode, phone)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`;
        pool.query(queryText, [username, password, req.body.first_name, req.body.last_name, req.body.email, req.body.street, req.body.city, req.body.state, req.body.zipcode, req.body.phone])
          .then(() => {console.log(req.body.username);
          res.sendStatus(201)
            })
          .catch(() => res.sendStatus(500));
});

// Delete Route - Deletes a user by its ID
router.delete('/:id', (req, res) => {
    if (req.user.admin) {
        const queryText = `DELETE FROM "user" WHERE "id" = $1;`
        pool.query(queryText, [req.params.id])
            .then((result) => {
                res.sendStatus(200)
            }).catch((error) => {
                console.log('Error deleting user', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
})

// PUT Route to update a user information
router.put('/', (req, res) => {
    const updatedUser = req.body;
    const queryText = `UPDATE "user" SET "username" = $1, "first_name" = $2, "last_name" = $3, "email" = $4, "street" = $5, "city" = $6, "state" = $7, "zipcode" = $8, "phone" = $9 WHERE "id" = $10;`;
    const queryValues = [
        updatedUser.username,
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
        .then(() => {res.sendStatus(200)})
        .catch((error) => {
            console.log('Error putting UPDATE IN ROUTE', error);
            res.sendStatus(500);
        })
}); // end PUT ROUTE

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;