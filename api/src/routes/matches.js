"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controller/MatchController");

router.post("/matchesPage", controller.findMatches);

module.exports = router;
