"use strict";

const db = require("../../framework/Database");
const bcrypt = require("bcryptjs");
const Manager = require("./Manager");
const User = require("../entities/User");

const VALIDATION = 1;
const FORGET = 2;
const MATCHES_PER_PAGE = 10;

const UserManager = function () {
  Manager.call(this, "users");

  this.findUserByEmail = async function (email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const result = await db.query(sql, email);

    return result[0] ? new User(result[0]) : null;
  };

  this.findUserByUsername = async function (username) {
    const sql = "SELECT * FROM users WHERE username = ?";
    const result = await db.query(sql, username);

    return result[0] ? new User(result[0]) : null;
  };

  this.createUser = function (user) {
    const sql =
      "INSERT INTO users (email, username, firstname, name, password) VALUES (?, ?, ?, ?, ?)";
    const pwd = bcrypt.hashSync(user.password, 0);
    const values = [user.email, user.username, user.firstname, user.name, pwd];

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
    const sql = "UPDATE users SET isLogin = 1 WHERE id = ?";

    return db.query(sql, user.getId());
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
};

UserManager.prototype = Object.create(Manager.prototype);
UserManager.prototype.constructor = UserManager;

module.exports = UserManager;
