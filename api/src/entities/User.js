'use strict';
const bcrypt = require('bcryptjs');

class User {

    constructor(kwargs) {
        for (const key in kwargs) {
            const setter = 'set' + this.capitalize(key);

            if (typeof this[setter] === 'function') {
                this[setter](kwargs[key]);
            }
        }
    }

    toPlainObject() {
        const plainObject = {};

        for (const key in this) {
            plainObject[key] = this[key];
        }
        return plainObject;
    }

    capitalize(string) {
        return string[0].toUpperCase() + string.slice(1);
    }

    isWritable() {
        return this.email && this.username && this.name && this.firstname && this.password;
    };

    setEmail(email) {
        this.email = email;
    };

    setId(id) {
        this.id = id;
    }

    setHashValidation(hashValidation) {
        this.hashValidation = hashValidation;
    }

    setUsername(username) {
        this.username = username;
    };

    setPassword(password) {
        this.password = password;
    }

    setName(name) {
        this.name = name;
    };

    setFirstname(firstname) {
        this.firstname = firstname;
    };

    getEmail() { return this.email };
    getUsername() { return this.username };
    getPassword() { return this.password };
    getName() { return this.name };
    getFirstname() { return this.firstname };
    getHashValidation() { return this.hashValidation };
    getId() { return this.id };

    confirmPassword(password) { return bcrypt.compareSync(password, this.password) };


}

module.exports = User;
