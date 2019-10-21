const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');

// GET EMPLOYEE DETAILS AND USERNAME
router.get('/', rejectUnauthenticated, (req, res) => {
   const queryText = `SELECT "user".username, "first_name", "last_name", "email", "street", "city", "state", "zipcode", "phone", "user_login_id" FROM "user_info"
   JOIN "user" ON "user".id = "user_info".user_login_id;`;
   pool.query(queryText)
   .then( (result) => {
       console.log('--Manage Employee GET ROUTER--', result.rows);
       res.send(result.rows);
   })
   .catch( (error) => {
       console.log('Error retrieving employee data', error);
       res.sendStatus(500);
   })
});

// GET EMPLOYEE USERNAMES -- ONLY -- 
router.get('/usernames', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "username", "id" FROM "user";`;
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
      
        const queryText = 'INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id';
        pool.query(queryText, [username, password])
          .then(() => {console.log(req.body.username);
          res.sendStatus(201)
            })
          .catch(() => res.sendStatus(500));
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;