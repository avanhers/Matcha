"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controller/AuthController");
const auth = require("../midleware/auth");

router.post("/inscription", controller.inscription);
router.get("/confirmation/:hash", controller.confirmation);
router.get("/hashExist/:hash", controller.hashExist);
router.post("/login", controller.login);
router.get("/logout", auth.addUser, controller.logout);
router.post("/resetPassword", controller.resetPassword);
router.post("/forgetPassword", controller.forgetPassword);
router.get("/canLog", auth.addUser, controller.canLog);

module.exports = router;
