"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controller/MatchController");

router.get("/", controller.findMatches.bind(controller));

module.exports = router;
