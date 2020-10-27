"use strict";

const db = require("../../framework/Database");
const bcrypt = require("bcryptjs");
const Manager = require("./Manager");
const User = require("../entities/User");
const queryCreator = require("../../framework/queryCreator");

const VALIDATION = 1;
const FORGET = 2;
const MATCHES_PER_PAGE = 10;

const SCORE = [0.05, 0.01];

const UserManager = function () {
  Manager.call(this, "users");

  this.findUserByEmail = async function (email) {
    const rows = await queryCreator
      .select("*")
      .from("users")
      .where("email", email)
      .sendQuery();

    return rows[0] ? new User(rows[0]) : null;
  };

  this.findUserByUsername = async function (username) {
    const rows = await queryCreator
      .select("*")
      .from("users")
      .where("username", username)
      .sendQuery();

    return rows[0] ? new User(rows[0]) : null;
  };

  this.createUser = function (user) {
    const sql =
      "INSERT INTO users (email, username, firstname, name, password) VALUES (?, ?, ?, ?, ?)";
    const pwd = bcrypt.hashSync(user.password, 0);
    const values = [user.email, user.username, user.firstname, user.name, pwd];

    return db.query(sql, values);
  };

  this.updateUser = function (field, user) {
    const getter = "get" + user.capitalize(field);
    const sql = `UPDATE users SET ${field} = ? WHERE id = ?`;
    const values = [user[getter](), user.getId()];

    return db.query(sql, values);
  };

  this.updateUserInfos = function (user) {
    const sql = `UPDATE users SET username = ?, age = ?, name = ?, firstname = ?, gender = ?, sexualOrientation = ?, 
      description = ? WHERE id = ? `;
    const values = [
      user.getUsername(),
      user.getAge(),
      user.getName(),
      user.getFirstname(),
      user.getGender(),
      user.getSexualOrientation(),
      user.getDescription(),
      user.getId(),
    ];

    return db.query(sql, values);
  };

  this.updateAvatar = async function (user, imageId) {
    let path = await queryCreator
      .select("image")
      .from("images")
      .where("id", imageId)
      .sendQuery();
    const sql = "UPDATE users SET avatar = ? where id = ?";
    const values = [path[0].image, user.getId()];

    return db.query(sql, values);
  };

  this.getOldAvatar = async function (user) {
    const sql = "SELECT avatar FROM users where id = ?";
    const result = await db.query(sql, user.getId());

    return result[0].avatar;
  };

  this.getOldImage = async function (imageId) {
    const sql = "SELECT image FROM images WHERE id = ?";
    const result = await db.query(sql, imageId);

    return result[0] ? result[0].image : undefined;
  };

  this.updateImage = function (imageId, path) {
    const sql = "UPDATE images SET image = ? WHERE id = ?";
    const values = [path, imageId];

    return db.query(sql, values);
  };

  this.updateLocation = function (user, lng, lat) {
    const sql = "UPDATE users SET longitude = ?, latitude = ? WHERE id = ?";
    const values = [lng, lat, user.getId()];

    return db.query(sql, values);
  };

  this.getImageId = function (path) {
    const sql = "SELECT id FROM images WHERE image = ?";

    return db.query(sql, path);
  };

  this.deleteImage = function (imageId) {
    const sql = "DELETE FROM images WHERE id = ?";

    return db.query(sql, imageId);
  };

  this.createImage = function (userId, path) {
    const sql = "INSERT INTO images (userId, image) VALUES(?, ?)";
    const values = [userId, path];

    return db.query(sql, values);
  };

  this.login = function (user) {
    const sql = "UPDATE users SET isLogin = 1, connectedAt = ? WHERE id = ?";
    const values = [new Date(), user.getId()];

    return db.query(sql, values);
  };

  this.logout = function (userId) {
    const sql = "UPDATE users SET isLogin = 0 WHERE id = ?";

    return db.query(sql, userId);
  };

  this.updatePassword = async function (user) {
    const sql = "UPDATE users SET password = ? WHERE id = ?";
    const values = [user.getPassword(), user.getId()];

    await db.query(sql, values);
  };

  /* ----------------------------------- TAGS ------------------------------- */

  this.getOldTags = async function (userId) {
    const sql = "SELECT id FROM user_tag WHERE userId = ?";
    const rows = await db.query(sql, userId);
    const ids = [];

    rows.forEach((row) => ids.push(row.id));
    return ids;
  };

  this.deleteOldTags = async function (tagsId) {
    const sql = "DELETE FROM user_tag WHERE id IN (?)";

    return db.query(sql, [tagsId]);
  };

  this.createNewTags = async function (userId, tagsId) {
    const sql = "INSERT INTO user_tag (userId, TagId) VALUES ?";
    const values = tagsId.map((e) => [userId, e]);

    return db.query(sql, [values]);
  };

  /* ----------------------------------- POPULARITY SCORE ------------------------------- */

  this.addPopularityScore = async function (user, type) {
    const ratio = SCORE[type];
    const newScore =
      user.getPopularityScore() + (100 - user.getPopularityScore()) * ratio;
    const sql = "UPDATE users SET popularityScore = ? WHERE id = ?";
    const values = [newScore, user.getId()];

    return db.query(sql, values);
  };

  this.substractPopularityScore = async function (user, type) {
    const ratio = SCORE[type];
    const newScore = (user.getPopularityScore() - 100 * ratio) / (1 - ratio);
    const sql = "UPDATE users SET popularityScore = ? WHERE id = ?";
    const values = [newScore, user.getId()];

    return db.query(sql, values);
  };

  /* ----------------------------------- LIKE ------------------------------- */

  this.createLike = async function (userLiked, likeId) {
    const sql = "INSERT INTO likes (likeId, likedId) VALUES (?, ?)";
    const values = [likeId, userLiked.getId()];

    return db.query(sql, values);
  };

  this.getLikes = async function (user) {
    const likes = await queryCreator
      .select("u.username", "username")
      .addSelect("u.avatar")
      .from("likes", "l")
      .innerJoin("users", "u")
      .on("l.likeId", "u.id")
      .where("l.likedId", user.getId())
      .orderBy("l.id", "DESC")
      .sendQuery();

    return likes;
  };

  this.deleteLike = async function (userWhichUnlike, unlikedUser) {
    return await queryCreator
      .delete("likes")
      .where("likeId", userWhichUnlike.getId())
      .and("likedId", unlikedUser.getId())
      .sendQuery();
  };

  /* ----------------------------------- COMPLETE USER ------------------------------- */

  this.addLikesToUser = async function (user) {
    const rows = await queryCreator
      .select("u.username")
      .from("users", "u")
      .innerJoin("likes", "l")
      .on("u.id", "l.likedId")
      .where("l.likeId", user.getId())
      .sendQuery();

    user.setLikes(rows);
    return user;
  };

  this.addImagesToUser = async function (user) {
    const images = [];
    const rows = await queryCreator
      .select("image")
      .addSelect("id")
      .from("images")
      .where("userId", user.getId())
      .sendQuery();

    rows.forEach((im) => images.push({ image: im.image, id: im.id }));
    user.setImages(images);
    return user;
  };

  this.addTagsToUser = async function (user) {
    let i = 0;
    const tags = [];
    const rows = await queryCreator
      .select("tagId", "tags")
      .from("user_tag")
      .where("userId", user.getId())
      .sendQuery();

    while (i < 8) {
      i++;
      const filter = rows.filter((tags) => tags.tags === i);

      tags.push(filter[0] ? true : false);
    }
    user.setTags(tags);
    return user;
  };

  this.addMatchesToUser = async function (user) {
    const subrequest = `(SELECT likeId FROM likes WHERE likedId = ${user.getId()}) `;
    const rows = await queryCreator
      .select("u.username")
      .addSelect("u.avatar")
      .addSelect("u.isLogin")
      .addSelect("SUM(m.unviewed)", "unreadMessages")
      .from("likes", "l")
      .innerJoin(subrequest, "l2")
      .on("l.likedId", "l2.likeId")
      .leftJoin("messages", "m")
      .on("m.fromId", "l.likedId")
      .addAndLogic(`m.toId = l.likeId`)
      .innerJoin("users", "u")
      .on("u.id", "l.likedId")
      .where("l.likeId", user.getId())
      .groupBy("l.id")
      .sendQuery();

    user.setMatches(rows);
    return user;
  };

  this.addBlocksToUser = async function (user) {
    const rows = await queryCreator
      .select("u.username", "blocked")
      .from("blocks", "b")
      .innerJoin("users", "u")
      .on("b.blockedId", "u.id")
      .where("b.blockerId", user.getId())
      .sendQuery();

    user.setBlocks(rows);
    return user;
  };

  this.addReportsToUser = async function (user) {
    const rows = await queryCreator
      .select("u.username", "reported")
      .from("reports", "r")
      .innerJoin("users", "u")
      .on("r.reportedId", "u.id")
      .where("r.reporterId", user.getId())
      .sendQuery();

    user.setReports(rows);
    return user;
  };

  this.addBocksToUser = async function (user) {
    const rows = await queryCreator
      .select("u.username", "blocked")
      .from("blocks", "b")
      .innerJoin("users", "u")
      .on("r.blockedId", "u.id")
      .where("r.blockerId", user.getId())
      .sendQuery();

    user.setReports(rows);
    return user;
  };

  /* ----------------------------------- HASH ------------------------------- */

  this.getUserIdByHashForget = async function (hashForget) {
    const sql = "SELECT userId FROM hash WHERE hashForget = ?";
    const result = await db.query(sql, hashForget);

    if (result && result[0]) {
      return result[0].userId;
    }
    return null;
  };

  this.readHashValidation = function (hash) {
    const sql = "SELECT * FROM hash WHERE hashValidation = ?";

    return db.query(sql, hash);
  };

  this.updateHashForget = function (user, hash) {
    const sql = "UPDATE hash SET hashForget = ? WHERE userId = ?";
    const values = [hash, user.getId()];

    return db.query(sql, values);
  };

  this.deleteHash = function (id) {
    const sql = "DELETE FROM hash WHERE id = ?";

    return db.query(sql, id);
  };

  this.deleteHashByUserId = function (userId) {
    const sql = "DELETE FROM hash WHERE userId = ?";

    return db.query(sql, userId);
  };

  this.createHashValidation = function (user, hash) {
    const sql = "INSERT INTO hash (userId, hashValidation) VALUES (?, ?)";
    const values = [user.getId(), hash];

    return db.query(sql, values);
  };

  this.createHashForget = function (user, hash) {
    const sql = "INSERT INTO hash (userId, hashForget) VALUES (?, ?)";
    const values = [user.getId(), hash];

    return db.query(sql, values);
  };

  this.hasHash = async function (id) {
    const sql = "SELECT * FROM hash WHERE userId = ?";
    let result = await db.query(sql, id);

    if ((result = result[0])) {
      return result.hashValidation ? VALIDATION : FORGET;
    }
    return null;
  };

  /* ----------------------------------- CHAT ------------------------------- */

  this.updateViewedMessage = function (userId, otherId) {
    const sql = `UPDATE messages SET unviewed = 0 WHERE fromId = ? AND toId = ?`;
    const values = [otherId, userId];

    return db.query(sql, values);
  };

  this.getConversationWith = function (fromId, toId) {
    const subRequest = `(SELECT * FROM messages WHERE fromId = ${fromId}) `;

    return queryCreator
      .select("m.message")
      .addSelect("m.sendAt")
      .addSelect("m2.id", "send")
      .from("messages", "m")
      .leftJoin(subRequest, "m2")
      .on("m.id", "m2.id")
      .addWhereLogic(
        `(m.fromId = ${fromId} AND m.toId = ${toId}) OR (m.fromId = ${toId} AND m.toId = ${fromId})`
      )
      .sendQuery();
  };

  /* ----------------------------------- REPORT AND BLOCK ------------------------------- */

  this.createReport = async function (reporter, reported) {
    return queryCreator
      .insert("reports", ["reporterId", "reportedId"])
      .value([reporter.getId(), reported.getId()])
      .sendQuery();
  };

  this.createBlock = async function (blocker, blocked) {
    return queryCreator
      .insert("blocks", ["blockerId", "blockedId"])
      .value([blocker.getId(), blocked.getId()])
      .sendQuery();
  };

  this.deleteBlock = async function (blocker, blocked) {
    const sql = `DELETE FROM blocks WHERE blockerId = ? AND blockedId = ?`;
    const values = [blocker.getId(), blocked.getId()];

    return db.query(sql, values);
  };

  this.getBlocks = async function (user) {
    const ret = {};
    const sql =
      "SELECT username, avatar FROM blocks INNER JOIN users ON blockedId = users.id WHERE blockerId = ?";
    const blocks = await db.query(sql, user.getId());

    return blocks;
  };

  /* ----------------------------------- VIEW ------------------------------- */

  this.getViews = async function (user) {
    const views = await queryCreator
      .select("u.username", "username")
      .addSelect("v.viewAt", "viewAt")
      .addSelect("u.avatar")
      .from("views", "v")
      .innerJoin("users", "u")
      .on("v.watcherId", "u.id")
      .where("v.watchedId", user.getId())
      .orderBy("v.id", "DESC")
      .sendQuery();

    return views;
  };

  this.createView = async function (watcher, watched) {
    return await queryCreator
      .insert("views", ["watcherId", "watchedId"])
      .value([watcher.getId(), watched.getId()])
      .sendQuery();
  };
};

UserManager.prototype = Object.create(Manager.prototype);
UserManager.prototype.constructor = UserManager;

module.exports = UserManager;
