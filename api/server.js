'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./src/routes/auth');
const upload = require('multer')();
const db = require('./framework/Database');
const auth = require('./src/midleware/auth');
const { response } = require('express');

const PORT = process.env.PORT;
const HOST = '0.0.0.0';



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use('/auth', authRoute);
app.use('/test', auth.verifyToken, (req, res) => {
    res.json({ test: 'valide' });
})

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);
console.log(`mysql host: ${process.env.MYSQL_HOST}, port: ${process.env.MYSQL_PORT}`);
console.log("Serveur d'API UP !");