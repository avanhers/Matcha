'use strict';

const Manager = require('./Manager');

const UserManager = function () {
    Manager.call(this, 'users');
}

UserManager.prototype = Object.create(Manager.prototype);
UserManager.prototype.constructor = UserManager;

module.exports = UserManager;