'use strict';

const db = require('./../../framework/Database');
const User = require('../entities/User');

const Manager = function (type) {
    this.type = type;
}

Manager.prototype = {

    findAll: function (result) {
        db.query(`SELECT * FROM ${this.type}`, (err, res) => {
            if (err) {
                console.log("Error: ", err.message);
                result(err, null);
            } else {
                console.log('users: ', res);
                result(null, res);
            }
        })
    },

    findOneById: async function (id) {
        const sql = `SELECT * FROM ${this.type} WHERE id = ?`;
        const result = await db.query(sql, id);

        return new User(result[0]);
    }

}

module.exports = Manager;