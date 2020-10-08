"use strict";
const UserManager = require("../manager/UserManager");
const User = require("../entities/User");
const Usermanager = require("../manager/UserManager");
const fs = require("fs");

const manager = new UserManager();

const TAGS = ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8"];
const LIKE = 0,
  VIEW = 1;

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

  report: async function (req, res) {
    const user = await manager.findOneById(req.userId);
    const userReported = await manager.findUserByUsername(req.params.username);

    if (user && userReported) {
      await manager.addReportsToUser(user);
      console.log(user);
      if (user.alreadyReport(userReported)) {
        return res.json({ status: 400, msg: "user already reported" });
      }
      await manager.createReport(user, userReported);
      return res.json({ status: 200, msg: "report created" });
    }
    res.json({ status: 400, msg: "bad users" });
  },

  getProfile: async function (req, res) {
    const user = await manager.findOneById(req.userId);
    const userWatched = await manager.findUserByUsername(req.params.username);

    await manager.addLikesToUser(userWatched);
    await this.setReports(user, userWatched);
    if (user && userWatched) {
      await manager.createView(user, userWatched);
      await manager.addPopularityScore(userWatched, VIEW);
      return res.json({ status: 200, user: userWatched.toProfile() });
    }
    res.json({ status: 400, msg: "bad users" });
  },

  getViews: async function (req, res) {
    const user = await manager.findOneById(req.userId);

    if (user) {
      const views = await manager.getViews(user);

      return res.json({ status: 200, data: views });
    }
    res.json({ status: 400, msg: "bad user" });
  },

  getLikes: async function (req, res) {
    const user = await manager.findOneById(req.userId);

    if (user) {
      const views = await manager.getLikes(user);

      return res.json({ status: 200, data: views });
    }
    res.json({ status: 400, msg: "bad user" });
  },

  like: async function (req, res) {
    const userLiked = await manager.findUserByUsername(req.params.username);
    const user = await manager.findOneById(req.userId);

    if (user && userLiked) {
      await manager.addLikesToUser(user);
      if (user.alreadyLike(userLiked)) {
        return res.json({ status: 200, msg: "already liked" });
      }
      await manager.createLike(userLiked, user.getId());
      await manager.addPopularityScore(userLiked, LIKE);
      await manager.addMatchesToUser(user);
      if (user.hasMatchWith(userLiked)) {
        return res.json({ status: 202, msg: "This is a match !!" });
      }
      return res.json({ status: 201, msg: "like added" });
    }
    res.json({ status: 400, msg: "bad users" });
  },

  unlike: async function (req, res) {
    const userUnliked = await manager.findUserByUsername(req.params.username);
    const user = await manager.findOneById(req.userId);

    if (user && userUnliked) {
      await manager.addLikesToUser(user);
      if (!user.alreadyLike(userUnliked)) {
        return res.json({ status: 200, msg: "like unexist" });
      }
      await manager.deleteLike(user, userUnliked);
      await manager.substractPopularityScore(userUnliked, LIKE);
      return res.json({ status: 201, msg: "like deleted" });
    }
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

  setReports: async function (user, watched) {
    await manager.addReportsToUser(user);
    watched.isReported = user.alreadyReport(watched);
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
