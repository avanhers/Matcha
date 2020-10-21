"use strict";
// require("dotenv").config();
// const cors2 = require("cors");

const express = require("express");
const bodyParser = require("body-parser");
const authRoute = require("./src/routes/auth");
const userRoute = require("./src/routes/user");
const matchRoute = require("./src/routes/matches");
const chatRoute = require("./src/routes/chat");
const auth = require("./src/midleware/auth");
const cors = require("./src/midleware/cors");
const io = require("./socket");

const PORT = process.env.PORT;
const HOST = "0.0.0.0";
// const HOST = process.env.HOST;

const app = express(cors);

app.use(cors.setCors);
app.use(express.static("./uploads"));

//set request body parsing
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());

app.use("/auth", authRoute);
app.use("/user", auth.addUser, userRoute);
app.use("/matches", auth.addUser, matchRoute);
app.use("/chat", auth.addUser, chatRoute);

const server = app.listen(PORT, HOST);
io.startIo(server);

console.log("Running on http://" + HOST + ":" + PORT);
console.log(
  `mysql host: ${process.env.MYSQL_HOST}, port: ${process.env.MYSQL_PORT}`
);
console.log("Serveur d'API UP !");
