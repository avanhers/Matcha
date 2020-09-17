'use strict';

const express = require('express');
const mysql = require('mysql');
const routes = require('./route');
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'matcha'
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err);
        return;
    }
    console.log('connected as id ' + connection.threadId);
})

const PORT = process.env.PORT;
const HOST = '0.0.0.0';


const app = express();

app.use('/', routes);

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);
console.log(`mysql host: ${process.env.MYSQL_HOST}, port: ${process.env.MYSQL_PORT}`);
console.log("Serveur d'authentification UP !");