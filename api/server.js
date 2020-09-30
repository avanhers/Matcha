"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const authRoute = require("./src/routes/auth");
const userRoute = require("./src/routes/user");
const upload = require("multer")();
const auth = require("./src/midleware/auth");

const PORT = process.env.PORT;
const HOST = "0.0.0.0";

const app = express();

//set Response header
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//set request body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());

app.use("/auth", authRoute);
app.use("/user", /*auth.addUser,*/ userRoute);

app.listen(PORT, HOST);
console.log("Running on http://" + HOST + ":" + PORT);
console.log(
  `mysql host: ${process.env.MYSQL_HOST}, port: ${process.env.MYSQL_PORT}`
);
console.log("Serveur d'API UP !");
