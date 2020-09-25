'use strict';

const db = require('../../framework/Database');
const bcrypt = require('bcryptjs');
const Manager = require('./Manager');
const User = require('../entities/User');

const VALIDATION = 1;
const FORGET = 2;


const UserManager = function () {
    Manager.call(this, 'users');

    this.findUserByEmail = async function (email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const result = await db.query(sql, email);

        return result[0] ? new User(result[0]) : null;
    }

    this.findUserByUsername = async function (username) {
        const sql = 'SELECT * FROM users WHERE username = ?';
        const result = await db.query(sql, username);

        return result[0] ? new User(result[0]) : null;
    }

    this.createUser = function (user) {
        const sql = 'INSERT INTO users (email, username, firstname, name, password) VALUES (?, ?, ?, ?, ?)';
        const pwd = bcrypt.hashSync(user.password, 0);
        const values = [user.email, user.username, user.firstname, user.name, pwd];

        return db.query(sql, values);
    }

    this.createHashValidation = function (user) {
        const sql = 'INSERT INTO hash (userId, hashValidation) VALUES (?, ?)';
        const values = [user.getId(), user.getHashValidation()];

        return db.query(sql, values);
    }

    this.hasHash = async function (id) {
        const sql = 'SELECT * FROM hash WHERE userId = ?';
        let result = await db.query(sql, id);

        if (result = result[0]) {
            return result.hashValidation ? VALIDATION : FORGET;
        }
        return null;
    }

    this.readHashValidation = function (hash) {
        const sql = 'SELECT * FROM hash WHERE hashValidation = ?';

        return db.query(sql, hash);
    }

    this.deleteHash = function (id) {
        const sql = 'DELETE FROM hash WHERE id = ?';

        return db.query(sql, id);
    }

}

UserManager.prototype = Object.create(Manager.prototype);
UserManager.prototype.constructor = UserManager;

module.exports = UserManager;