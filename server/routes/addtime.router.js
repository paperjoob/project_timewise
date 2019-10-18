const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET ROUTE
router.get('/', (req, res) => {
    
});

// GET ROUTE for WEEKDAYS
router.get('/weeks', (req, res) => {
    const queryText = `SELECT * FROM "weeks"`;
    pool.query(queryText)
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

});

module.exports = router;