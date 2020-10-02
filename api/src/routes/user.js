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
router.post("/personnalInfos", userController.personnal.bind(userController));
router.post("/updateEmail", userController.updateEmail.bind(userController));
router.post(
  "/updatePassword",
  userController.updatePassword.bind(userController)
);
router.post("/updateTags", userController.updateTags.bind(userController));
router.post("/like/:username", userController.like.bind(userController));

module.exports = router;
