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
router.post("/location", userController.setLocation.bind(userController));
router.post("/setAvatar/:id", userController.setAvatar.bind(userController));
router.post("/updateEmail", userController.updateEmail.bind(userController));
router.post(
  "/updatePassword",
  userController.updatePassword.bind(userController)
);
router.post("/updateTags", userController.updateTags.bind(userController));
router.post("/like/:username", userController.like.bind(userController));
router.post("/unlike/:username", userController.unlike.bind(userController));
router.post("/report/:username", userController.report.bind(userController));
router.post("/block/:username", userController.block.bind(userController));
router.post(
  "/image/:id/delete",
  userController.deleteImage.bind(userController)
);

router.put("/notifications", userController.readNotifications);

router.get("/notifications", userController.getNotifications);
router.get("/blocks", userController.getBlocks);
router.get("/views", userController.getViews.bind(userController));
router.get("/likes", userController.getLikes.bind(userController));
router.get("/matches", userController.getMatches.bind(userController));
router.get(
  "/profile/:username",
  userController.getProfile.bind(userController)
);
router.get("/infos", userController.getInfos.bind(userController));
router.get("/email", userController.getEmail.bind(userController));
router.get("/tags", userController.getTags.bind(userController));
router.get("/location", userController.getLocation.bind(userController));
router.get("/avatar", userController.getAvatar.bind(userController));
router.get("/images", userController.getImages.bind(userController));

module.exports = router;
