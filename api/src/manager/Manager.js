"use strict";

const db = require("./../../framework/Database");
const User = require("../entities/User");

const Manager = function (type) {
  this.type = type;
};

Manager.prototype = {
  findAll: function () {
    const sql = "SELECT * FROM users";
    return db.query(sql, null);
  },

  findAllOffsetLimit: function (limit, offset) {
    const sql = `SELECT * FROM ${this.type} LIMIT ${limit} OFFSET ${offset}`;
    return db.query(sql);
  },

  findOneById: async function (id) {
    const sql = `SELECT * FROM ${this.type} WHERE id = ?`;
    const result = await db.query(sql, id);
    return new User(result[0]);
  },
};

module.exports = Manager;
