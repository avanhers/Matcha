'use strict';

const mysql = require('mysql');

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
    console.log('connected as id ' + connection.threadId);
});

module.exports = dbConn;