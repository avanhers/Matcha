"use strict";
const UserManager = require("../manager/UserManager");
const User = require("../entities/User");
const Usermanager = require("../manager/UserManager");
const fs = require("fs");

const manager = new UserManager();

const userController = {
  uploadImage: async function (req, res, next) {
    let { username, isProfile, imageId } = req.body;
    imageId = parseInt(imageId);
    const newPath = req.file.path;

    if (username && newPath && isProfile !== undefined) {
      const user = await manager.findUserByUsername(username);
      user.setAvatar(newPath);

      if (isProfile) {
        this.changeAvatar(user);
        return res.json({ status: 200, msg: "avatar updated" });
      } else if (imageId) {
        this.changeImage(imageId, newPath);
        return res.json({ status: 200, msg: "image updated" });
      }
      await manager.createImage(user.getId(), newPath);
      return res.json({ status: 201, msg: "image created" });
    }
    return res.status(200).json({ status: 400, msg: "invalid fields" });
  },

  changeAvatar: async function (user) {
    const oldPath = await manager.getOldAvatar(user);

    fs.unlink(oldPath, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`file ${oldPath} removed`);
    });
    await manager.updateAvatar(user);
  },

  changeImage: async function (imageId, newPath) {
    const oldPath = await manager.getOldImage(imageId);

    fs.unlink(oldPath, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`file ${oldPath} removed`);
    });
    await manager.updateImage(imageId, newPath);
  },
};

module.exports = userController;
