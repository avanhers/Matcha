"use strict";

const db = require("../../framework/Database");

const Manager = function (type) {
  this.type = type;
};

Manager.prototype = {
  findAll: function () {
    const sql = "SELECT * FROM users";
    return db.query(sql, null);
  },
  findAllOffsetLimit: function (limit, offset) {
    console.log(limit, offset);
    const sql = `SELECT * FROM ${this.type} LIMIT ${limit} OFFSET ${offset}`;
    console.log(sql);
    return db.query(sql);
  },
  findOneById: function (id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${this.type} WHERE id = ?`;
      db.query(sql, id, (err, result, fields) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = Manager;
