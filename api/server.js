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
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use('/auth', authRoute);
app.use('/test', auth.addUser, (req, res) => {
    res.json({ userId: req.userId });
})

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);
console.log(`mysql host: ${process.env.MYSQL_HOST}, port: ${process.env.MYSQL_PORT}`);
console.log("Serveur d'API UP !");