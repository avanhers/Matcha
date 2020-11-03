"use strict";
const UserManager = require("../manager/UserManager");
const notificationManager = require("../manager/NotificationManager");
const fs = require("fs");
const TAGS = require("../../config/tags").TAGS;

const manager = new UserManager();

const LIKE = 0,
  VIEW = 1;

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const userController = {
  uploadImage: async function (req, res, next) {
    let { imageId } = req.body;
    const newPath = req.file.path;
    imageId = parseInt(imageId);

    if (newPath) {
      const user = await manager.findOneById(req.userId);

      if (imageId) {
        try {
          await this.changeImage(imageId, newPath);
          return res.json({
            status: 200,
            image: { id: imageId, path: newPath },
          });
        } catch (e) {
          return res.json({ status: 400, error: e.message });
        }
      }
      const result = await manager.createImage(user.getId(), newPath);

      return res.json({
        status: 201,
        image: { id: result.insertId, path: newPath },
      });
    }
    return res.status(200).json({ status: 400, msg: "invalid fields" });
  },

  getNotifications: async function (req, res) {
    const user = await manager.findOneById(req.userId);

    if (user) {
      const notifs = await notificationManager.getNotification(
        user.getUsername()
      );

      return res.status(200).json({ status: 200, notifs: notifs });
    }
    return res.status(200).json({ status: 400, msg: "invalid user" });
  },

  readNotifications: async function (req, res) {
    const user = await manager.findOneById(req.userId);

    if (user) {
      await notificationManager.readNotifications(user.getUsername());

      return res.sendStatus(201);
    }
    return res.status(200).json({ status: 400, msg: "invalid user" });
  },

  setAvatar: async function (req, res, next) {
    const { id: imageId } = req.params;
    const user = await manager.findOneById(req.userId);

    try {
      if (user) {
        await manager.updateAvatar(user, imageId);
        return res.json({ status: 200, msg: "avatar updated" });
      }
      return res.status(200).json({ status: 400, msg: "bad users" });
    } catch (e) {
      return res.json({ status: 400, msg: "bad Id" });
    }
  },

  deleteImage: async function (req, res) {
    const { id: imageId } = req.params;
    const path = await manager.getOldImage(imageId);
    const user = await manager.findOneById(req.userId);

    if (!path) {
      return res.json({ status: 400, error: "bad id" });
    } else if (path === user.getAvatar()) {
      return res.json({ status: 400, msg: "can't delete avatar" });
    }
    await this.removeOldPictures(path);
    await manager.deleteImage(imageId);

    return res.json({ status: 200, msg: "image deleted" });
  },

  report: async function (req, res) {
    const user = await manager.findOneById(req.userId);
    const userReported = await manager.findUserByUsername(req.params.username);

    if (user && userReported) {
      await manager.addReportsToUser(user);
      if (user.alreadyReport(userReported)) {
        return res.json({ status: 400, msg: "user already reported" });
      }
      await manager.createReport(user, userReported);
      return res.json({ status: 200, msg: "report created" });
    }
    res.json({ status: 400, msg: "bad users" });
  },

  block: async function (req, res) {
    const user = await manager.findOneById(req.userId);
    const userBlocked = await manager.findUserByUsername(req.params.username);

    if (user && userBlocked) {
      await manager.addBlocksToUser(user);
      if (user.alreadyBlock(userBlocked)) {
        await manager.deleteBlock(user, userBlocked);
        return res.json({ status: 400, msg: "user unbocked" });
      }
      await manager.createBlock(user, userBlocked);
      return res.json({ status: 200, msg: "block created" });
    }
    res.json({ status: 400, msg: "bad users" });
  },

  getProfile: async function (req, res) {
    const user = await manager.findOneById(req.userId);
    const userWatched = await manager.findUserByUsername(req.params.username);

    if (user && userWatched) {
      await manager.addLikesToUser(user);
      if (user.alreadyLike(userWatched)) {
        userWatched.isLiked = true;
      } else {
        userWatched.isLiked = false;
      }
      await manager.addImagesToUser(userWatched);
      await manager.addTagsToUser(userWatched);
      await this.setReports(user, userWatched);
      await this.setBlocks(user, userWatched);
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

  getBlocks: async function (req, res) {
    const user = await manager.findOneById(req.userId);

    if (user) {
      const blocks = await manager.getBlocks(user);

      return res.json({ status: 200, data: blocks });
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

  getMatches: async function (req, res) {
    const user = await manager.findOneById(req.userId);

    if (user) {
      await manager.addMatchesToUser(user);

      return res.json({ status: 200, data: user.getMatches() });
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
      await manager.addMatchesToUser(user);
      await manager.deleteLike(user, userUnliked);
      await manager.substractPopularityScore(userUnliked, LIKE);
      if (user.hasMatchWith(userUnliked)) {
        return res.json({ status: 202, msg: "this is an unmatch" });
      }
      return res.json({ status: 201, msg: "like deleted" });
    }
    res.json({ status: 400, msg: "bad users" });
  },

  getInfos: async function (req, res) {
    const user = await manager.findOneById(req.userId);

    if (user) {
      return res.json({ status: 200, infos: user.getInfos() });
    }
    return res.json({ status: 400, msg: "bad user" });
  },

  getImages: async function (req, res) {
    const user = await manager.findOneById(req.userId);

    if (user) {
      await manager.addImagesToUser(user);
      return res.json({ status: 200, infos: user.getImages() });
    }
    return res.json({ status: 400, msg: "bad user" });
  },

  getAvatar: async function (req, res) {
    const user = await manager.findOneById(req.userId);

    if (user) {
      const imagePath = user.getAvatar();
      const imageId = await manager.getImageId(imagePath);

      return res.json({
        status: 200,
        avatar: { id: imageId[0] ? imageId[0].id : -1, path: imagePath },
      });
    }
    return res.json({ status: 400, msg: "bad user" });
  },

  getTags: async function (req, res) {
    const user = await manager.findOneById(req.userId);

    if (user) {
      await manager.addTagsToUser(user);
      return res.json({ status: 200, tags: user.getTags() });
    }
    return res.json({ status: 400, msg: "bad user" });
  },

  setLocation: async function (req, res) {
    const user = await manager.findOneById(req.userId);
    const { lng, lat } = req.body;

    if (user) {
      await manager.updateLocation(user, lng, lat);
      return res.json({
        status: 200,
        msg: "user updated",
      });
    }
    return res.json({ status: 400, msg: "bad user" });
  },

  getLocation: async function (req, res) {
    const user = await manager.findOneById(req.userId);

    if (user) {
      return res.json({
        status: 200,
        lng: user.getLongitude(),
        lat: user.getLatitude(),
      });
    }
    return res.json({ status: 400, msg: "bad user" });
  },

  getEmail: async function (req, res) {
    const user = await manager.findOneById(req.userId);

    if (user) {
      return res.json({
        status: 200,
        email: user.getEmail(),
      });
    }
    return res.json({ status: 400, msg: "bad user" });
  },

  personnal: async function (req, res) {
    const { infos } = req.body;
    const { username } = infos;
    const user = await manager.findOneById(req.userId);

    if (user) {
      if (username && username !== user.getUsername()) {
        const userExist = await manager.findUserByUsername(username);

        if (userExist) {
          return res.json({ status: 401, msg: "username already exists" });
        }
      }
      user.setInfos(infos);
      manager.updateUserInfos(user);
      return res.json({ status: 200, msg: "user updated" });
    }
    return res.json({ status: 400, msg: "bad user" });
  },

  updateTags: async function (req, res) {
    const { tags } = req.body;
    console.log("in update");
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
      const userEmail = await manager.findUserByEmail(email);

      if (userEmail) {
        return res.json({ status: 401, msg: "email already exists" });
      }
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
          if (user.isPassword(password)) {
            user.setHashPassword(password);
            manager.updateUser("password", user);
            return res.json({ status: 204, msg: "password updated" });
          }
          return res.json({ status: 400, error: "bad password" });
        }
      }
      return res.json({ status: 400, msg: "bad user" });
    }
    res.json({ status: 400, msg: "field missing" });
  },

  changeImage: async function (imageId, newPath) {
    const oldPath = await manager.getOldImage(imageId);

    if (oldPath) {
      this.removeOldPictures(oldPath);
      await manager.updateImage(imageId, newPath);
    } else {
      throw new Error("bad image id");
    }
  },

  setReports: async function (user, watched) {
    await manager.addReportsToUser(user);
    watched.isReported = user.alreadyReport(watched);
  },

  setBlocks: async function (user, watched) {
    await manager.addBlocksToUser(user);
    watched.isBlocked = user.alreadyBlock(watched);
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
