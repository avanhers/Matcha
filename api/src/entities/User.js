'use strict';

const Entity = require('./Entity');

const User = function (kwargs) {

    this.setName = function (name) {
        this.name = name;
    };

    this.setFirstname = function (firstname) {
        this.firstname = firstname;
    };

    Entity.call(this, kwargs);
}

User.prototype = Object.create(Entity.prototype);
User.prototype.constructor = User;

const jules = new User({
    firstname: 'Jules',
    name: 'Jaegle',
});
