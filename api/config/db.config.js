'use strict';

const mysql = require('mysql');
const Initializer = require('../init');

const dbConn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'matcha'
});

dbConn.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err);
        return;
    }
    console.log('connected as id ' + dbConn.threadId);
    dbConn.query('SELECT * FROM users', (err, result) => {
        if (!err) {
            if (!result.length) {
                const init = new Initializer(dbConn);

                console.log('Database Matcha is going to be populate');
                init.createFakeData(200);
            } else {
                console.log('Database already populates');
            }
        } else {
            console.log('SQL Error: ' + err.message);
        }
    })
});

module.exports = dbConn;