"use strict";
const bcrypt = require("bcryptjs");

class User {
  constructor(kwargs) {
    for (const key in kwargs) {
      const setter = "set" + this.capitalize(key);

      if (typeof this[setter] === "function") {
        this[setter](kwargs[key]);
      }
    }
  }

  toPlainObject() {
    const plainObject = {};

    for (const key in this) {
      if (key !== "password") {
        plainObject[key] = this[key];
      }
    }
    return plainObject;
  }

  capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  isWritable() {
    return (
      this.email &&
      this.username &&
      this.name &&
      this.firstname &&
      this.password
    );
  }

  setEmail(email) {
    this.email = email;
  }

  setId(id) {
    this.id = id;
  }

  setUsername(username) {
    this.username = username;
  }

  setPassword(password) {
    this.password = password;
  }

  setHashPassword(password) {
    this.password = bcrypt.hashSync(password, 0);
  }

  setName(name) {
    this.name = name;
  }

  setIsLogin(bool) {
    this.isLogin = bool;
  }

  setFirstname(firstname) {
    this.firstname = firstname;
  }

  getEmail = () => this.email;
  getUsername() {
    return this.username;
  }
  getPassword() {
    return this.password;
  }
  getName() {
    return this.name;
  }
  getFirstname() {
    return this.firstname;
  }
  getId() {
    return this.id;
  }
  getIsLogin() {
    return this.isLogin;
  }

  confirmPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

module.exports = User;
