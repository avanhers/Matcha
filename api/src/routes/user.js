"use strict";

const express = require("express");
const router = express.Router();
const multer = require("../midleware/multer");
const userController = require("../controller/UserController");

router.post(
  "/uploadImage",
  multer,
  userController.uploadImage.bind(userController)
);

module.exports = router;
