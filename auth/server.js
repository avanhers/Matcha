'use strict';

const express = require('express');
const routes = require('./route');
const bodyParser = require('body-parser');

const PORT = process.env.PORT;
const HOST = '0.0.0.0';


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);
console.log(`mysql host: ${process.env.MYSQL_HOST}, port: ${process.env.MYSQL_PORT}`);
console.log("Serveur d'authentification UP !");