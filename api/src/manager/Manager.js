'use strict';

const db = require('./../../config/db.config');

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

}

module.exports = Manager;