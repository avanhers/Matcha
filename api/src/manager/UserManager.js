"use strict";

const db = require("../../framework/Database");
const bcrypt = require("bcryptjs");
const Manager = require("./Manager");
const { v1: uuidv1 } = require("uuid");
const mailer = require("../../Mailer");
const MATCHES_PER_PAGE = 10;

const UserManager = function () {
  Manager.call(this, "users");

  this.findUserByEmail = function (email) {
    const sql = "SELECT * FROM users WHERE email = ?";

    return db.query(sql, email);
  };

  this.findUserByUsername = function (username) {
    const sql = "SELECT * FROM users WHERE username = ?";

    return db.query(sql, username);
  };

  this.createUser = function (user) {
    const sql =
      "INSERT INTO users (email, username, firstname, name, password) VALUES (?, ?, ?, ?, ?)";
    const pwd = bcrypt.hashSync(user.password, 0);
    const values = [user.email, user.username, user.firstname, user.name, pwd];

    return db.query(sql, values);
  };

  this.createHashValidation = function (user) {
    const sql = "INSERT INTO hash (userId, hashValidation) VALUES (?, ?)";
    const values = [user.getId(), user.getHashValidation()];

    return db.query(sql, values);
  };

  this.userRegistration = async function (user) {
    return new Promise((resolve, reject) => {
      db.db.beginTransaction(async (beginTransactionError) => {
        if (beginTransactionError) {
          return reject(beginTransactionError.message);
        }
        try {
          const hash = uuidv1();
          const result = await this.createUser(user);

          user.setId(result.insertId);
          user.setHashValidation(hash);
          const id = await this.createHashValidation(user);
          mailer
            .sendMail(user, "confirmation")
            .then((result) => {
              db.db.commit(() => {
                resolve(result);
              });
            })
            .catch((e) => {
              db.db.rollback(() => reject(e.message));
            });
        } catch (e) {
          db.db.rollback(() => reject(e.message));
        }
      });
    });
  };

  this.readHashValidation = function (id) {
    const sql = "SELECT * FROM hash WHERE userId = ?";

    return db.query(sql, id);
  };

  this.deleteHash = function (id) {
    const sql = "DELETE FROM hash WHERE id = ?";

    return db.query(sql, id);
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
