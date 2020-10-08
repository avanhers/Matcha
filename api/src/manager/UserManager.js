"use strict";

const db = require("../../framework/Database");
const bcrypt = require("bcryptjs");
const Manager = require("./Manager");
const User = require("../entities/User");
const queryCreator = require("../../framework/queryCreator");
const { innerJoin } = require("../../framework/queryCreator");

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
    const sql = `UPDATE users SET username = ?, name = ?, firstname = ?, gender = ?, sexualOrientation = ?, 
      description = ? WHERE id = ? `;
    const values = [
      user.getUsername(),
      user.getName(),
      user.getFirstname(),
      user.getGender(),
      user.getSexualOrientation(),
      user.getDescription(),
      user.getId(),
    ];

    return db.query(sql, values);
  };

  this.updateAvatar = function (user) {
    const sql = "UPDATE users SET avatar = ? where id = ?";
    const values = [user.getAvatar(), user.getId()];

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

    return result[0].image;
  };

  this.updateImage = function (imageId, path) {
    const sql = "UPDATE images SET image = ? WHERE id = ?";
    const values = [path, imageId];

    return db.query(sql, values);
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

  this.createHashValidation = function (user, hash) {
    const sql = "INSERT INTO hash (userId, hashValidation) VALUES (?, ?)";
    const values = [user.getId(), hash];

    return db.query(sql, values);
  };

  this.createHashForget = function (user, hash) {};

  this.hasHash = async function (id) {
    const sql = "SELECT * FROM hash WHERE userId = ?";
    let result = await db.query(sql, id);

    if ((result = result[0])) {
      return result.hashValidation ? VALIDATION : FORGET;
    }
    return null;
  };

  this.updatePassword = async function (user) {
    const sql = "UPDATE users SET password = ? WHERE id = ?";
    const values = [user.getPassword(), user.getId()];

    await db.query(sql, values);
  };

  this.getUserIdByHashForget = async function (hashForget) {
    const sql = "SELECT userId FROM hash WHERE hashForget = ?";
    const result = await db.query(sql, hashForget);

    if (result) {
      return result[0].userId;
    }
    return null;
  };

  this.readHashValidation = function (hash) {
    const sql = "SELECT * FROM hash WHERE hashValidation = ?";

    return db.query(sql, hash);
  };

  this.deleteHash = function (id) {
    const sql = "DELETE FROM hash WHERE id = ?";

    return db.query(sql, id);
  };

  this.deleteHashByUserId = function (userId) {
    const sql = "DELETE FROM hash WHERE userId = ?";

    return db.query(sql, userId);
  };

  this.findMatches = function (params) {
    const paramsMap = ["age"];
    let sqlParams = [];
    let sql = "SELECT * FROM users";
    paramsMap.map((filter) => {
      if (params[filter] !== undefined) {
        if (filter === "age") {
          // sql += ` WHERE ${filter} = ?`;
          console.log(params[filter]);
          sql += ` WHERE ${filter} BETWEEN ? AND ?`;
          sqlParams = sqlParams.concat(params[filter]);
        }
      }
    });
    if (params["page"] !== undefined && params["page"] > 0) {
      sql += ` LIMIT ${MATCHES_PER_PAGE} OFFSET ${
        (params["page"] - 1) * MATCHES_PER_PAGE
      }`;
    }

    console.log("requete sql : ", sql, sqlParams);
    // sql = "SELECT * FROM us ers WHERE age = 18 LIMIT 10 OFFSET 0";
    return db.query(sql, sqlParams);
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

    console.log("newscore: ", newScore);
    return db.query(sql, values);
  };

  this.substractPopularityScore = async function (user, type) {
    const ratio = SCORE[type];
    const newScore = -user.getPopularityScore() / ratio + 100;
    const sql = "UPDATE users SET popularityScore = ? WHERE id = ?";
    const values = [newScore, user.getId()];

    console.log("newscore: ", newScore);
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
      .from("likes", "l")
      .innerJoin("users", "u")
      .on("l.likeId", "u.id")
      .where("l.likedId", user.getId())
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
      .select("u2.username")
      .from("users", "u")
      .innerJoin("likes", "l")
      .on("u.id", "l.likeId")
      .innerJoin("users", "u2")
      .on("l.likedId", "u2.id")
      .where("u.id", user.getId())
      .sendQuery();

    user.setLikes(rows);
    return user;
  };

  this.addMatchesToUser = async function (user) {
    const rows = await queryCreator
      .select("u2.username", "matches")
      .from("users", "u")
      .innerJoin("likes", "l")
      .on("l.likeId", "u.id")
      .innerJoin("users", "u2")
      .on("l.likedId", "u2.id")
      .where("u.id", user.getId())
      .sendQuery();

    user.setMatches(rows);
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

    console.log("reported = ", rows);
    user.setReports(rows);
    return user;
  };

  /* ----------------------------------- VIEW ------------------------------- */

  this.createReport = async function (reporter, reported) {
    return queryCreator
      .insert("reports", ["reporterId", "reportedId"])
      .value([reporter.getId(), reported.getId()])
      .sendQuery();
  };

  /* ----------------------------------- VIEW ------------------------------- */

  this.getViews = async function (user) {
    const views = await queryCreator
      .select("u.username", "username")
      .addSelect("v.viewAt", "viewAt")
      .from("views", "v")
      .innerJoin("users", "u")
      .on("v.watcherId", "u.id")
      .where("v.watchedId", user.getId())
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
