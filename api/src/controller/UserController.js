"use strict";
const UserManager = require("../manager/UserManager");
const User = require("../entities/User");
const Usermanager = require("../manager/UserManager");
const fs = require("fs");

const manager = new UserManager();

const TAGS = ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8"];

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const userController = {
  uploadImage: async function (req, res, next) {
    let { isProfile, imageId } = req.body;
    const newPath = req.file.path;
    imageId = parseInt(imageId);

    if (newPath && isProfile !== undefined) {
      const user = await manager.findOneById(req.userId);
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

  like: async function (req, res) {
    const userLiked = await manager.findUserByUsername(req.params.username);
    const user = await manager.findOneById(req.userId);

    // console.log("user= ", user);
    // console.log("userLiked= ", userLiked);
    // if (user && userLiked) {
    //   await manager.createLike(userLiked, user.getId());
    //   return res.json({ status: 201, msg: "like added" });
    // }
    res.json({ status: 400, msg: "bad users" });
  },

  personnal: async function (req, res) {
    const { infos } = req.body;
    const user = await manager.findOneById(req.userId);

    if (user) {
      user.setInfos(infos);
      manager.updateUserInfos(user);
      return res.json({ status: 200, msg: "user updated" });
    }
    return res.json({ status: 400, msg: "bad user" });
  },

  updateTags: async function (req, res) {
    const { tags } = req.body;

    if (!tags.every((e) => TAGS.indexOf(e) > -1)) {
      return res.json({ status: 400, msg: "bad tagName" });
    }
    if (tags) {
      const user = await manager.findOneById(req.userId);

      if (user) {
        const oldTags = await manager.getOldTags(user.getId());

        if (oldTags.length > 0) {
          await manager.deleteOldTags(oldTags);
        }
        const newTagsId = tags.map((e) => TAGS.indexOf(e) + 1);

        manager.createNewTags(user.getId(), newTagsId);
        return res.json({ status: 200, msg: "tags updated" });
      }
      return res.json({ status: 400, msg: "bad user" });
    }
    return res.json({ status: 400, msg: "field missing" });
  },

  updateEmail: async function (req, res) {
    const { email } = req.body;

    if (email) {
      if (!validateEmail(email)) {
        return res.json({ status: 401, msg: "bad email" });
      }
      const user = await manager.findOneById(req.userId);

      if (user) {
        user.setEmail(email);
        await manager.updateUser("email", user);
        return res.json({ status: 204, msg: "email updated" });
      }
      return res.json({ status: 400, msg: "bad user" });
    }
    return res.json({ status: 400, msg: "field missing" });
  },

  updatePassword: async function (req, res) {
    const { password, oldPassword } = req.body;

    if (password && oldPassword) {
      const user = await manager.findOneById(req.userId);

      if (user) {
        if (user.confirmPassword(oldPassword)) {
          user.setHashPassword(password);
          manager.updateUser("password", user);
          return res.json({ status: 204, msg: "password updated" });
        }
      }
      return res.json({ status: 400, msg: "bad user" });
    }
    res.json({ status: 400, msg: "field missing" });
  },

  changeAvatar: async function (user) {
    const oldPath = await manager.getOldAvatar(user);

    this.removeOldPictures(oldPath);
    await manager.updateAvatar(user);
  },

  changeImage: async function (imageId, newPath) {
    const oldPath = await manager.getOldImage(imageId);

    this.removeOldPictures(oldPath);
    await manager.updateImage(imageId, newPath);
  },

  removeOldPictures: function (oldPath) {
    if (oldPath) {
      fs.unlink(oldPath, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`file ${oldPath} removed`);
      });
    }
  },
};

module.exports = userController;
