'use strict';

const Entity = require('./Entity');

const User = function (kwargs) {

    this.isWritable = function () {
        return this.email && this.username && this.name && this.firstname && this.password;
    };

    this.setEmail = function (email) {
        this.email = email;
    };

    this.setId = function (id) {
        this.id = id;
    }

    this.setHashValidation = function (hashValidation) {
        this.hashValidation = hashValidation;
    }

    this.setUsername = function (username) {
        this.username = username;
    };

    this.setPassword = function (password) {
        this.password = password;
    }

    this.setName = function (name) {
        this.name = name;
    };

    this.setFirstname = function (firstname) {
        this.firstname = firstname;
    };

    this.getEmail = function () { return this.email };
    this.getUsername = function () { return this.username };
    this.getPassword = function () { return this.password };
    this.getName = function () { return this.name };
    this.getFirstname = function () { return this.firstname };
    this.getHashValidation = function () { return this.hashValidation };
    this.getId = function () { return this.id };

    Entity.call(this, kwargs);
}

User.prototype = Object.create(Entity.prototype);
User.prototype.constructor = User;

module.exports = User;
