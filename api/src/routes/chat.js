"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controller/ChatController");

router.get("/users", controller.getUsers);
router.get("/messages/:username", controller.getMessages);

module.exports = router;
