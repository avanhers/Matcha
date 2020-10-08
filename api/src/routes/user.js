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
router.post("/unlike/:username", userController.unlike.bind(userController));
router.post("/report/:username", userController.report.bind(userController));

router.get("/views", userController.getViews.bind(userController));
router.get("/likes", userController.getLikes.bind(userController));
router.get(
  "/profile/:username",
  userController.getProfile.bind(userController)
);

module.exports = router;
