"use strict";
const bcrypt = require("bcryptjs");

class User {
  PRIVATE = ["password", "id", "PRIVATE", "PROFILE"];
  PROFILE = ["password", "id", "PROFILE", "email", "PRIVATE"];

  constructor(kwargs) {
    for (const key in kwargs) {
      const value = kwargs[key];
      const setter = "set" + this.capitalize(key);

      if (typeof this[setter] === "function") {
        this[setter](value);
      }
    }
  }

  isComplete() {
    for (const key in this) {
      const val = this[key];

      if (val === null) {
        return false;
      }
    }
    return true;
  }

  toPlainObject() {
    const plainObject = {};

    for (const key in this) {
      if (this.PRIVATE.indexOf(key) < 0) {
        plainObject[key] = this[key];
      }
    }
    return plainObject;
  }

  toProfile() {
    const plainObject = {};

    for (const key in this) {
      if (this.PROFILE.indexOf(key) < 0) {
        plainObject[key] = this[key];
      }
    }
    return plainObject;
  }

  alreadyLike(user) {
    const userLiked = this.likes.find(
      (like) => like.username === user.getUsername()
    );

    return userLiked === undefined ? false : true;
  }

  alreadyReport(user) {
    const userReported = this.reports.find(
      (report) => report.reported === user.getUsername()
    );

    return userReported === undefined ? false : true;
  }

  alreadyBlock(user) {
    const userBlocked = this.blocks.find(
      (block) => block.blocked === user.getUsername()
    );

    return userBlocked === undefined ? false : true;
  }

  hasMatchWith(user) {
    const matchUser = this.matches.find(
      (match) => match.matches === user.getUsername()
    );

    return matchUser === undefined ? false : true;
  }

  setInfos(infos) {
    for (const key in infos) {
      const value = infos[key];
      const setter = "set" + this.capitalize(key);

      if (typeof this[setter] === "function") {
        this[setter](value);
      }
    }
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

  setBlocks(blocks) {
    this.blocks = blocks;
  }

  setReports(reports) {
    this.reports = reports;
  }

  setConnectedAt(date) {
    this.connectedAt = date;
  }

  setAge(age) {
    this.age = age;
  }

  setSexualOrientation(orientation) {
    this.sexualOrientation = orientation;
  }

  setDescription(description) {
    this.description = description;
  }

  setGender(gender) {
    this.gender = gender;
  }

  setAvatar(avatar) {
    this.avatar = avatar;
  }

  setTags(tags) {
    this.tags = tags;
  }

  setEmail(email) {
    this.email = email;
  }

  setId(id) {
    this.id = id;
  }

  setLikes(likes) {
    this.likes = likes;
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

  setMatches(matches) {
    this.matches = matches;
  }

  setPopularityScore(score) {
    this.popularityScore = score;
  }

  getBlocks() {
    return this.blocks;
  }
  getReports() {
    return this.reports;
  }
  getConnectedAt() {
    return this.connectedAt;
  }
  getLikes() {
    return this.likes;
  }
  getPopularityScore() {
    return this.popularityScore;
  }
  getMatches() {
    return this.matches;
  }
  getAge() {
    return this.age;
  }
  getSexualOrientation() {
    return this.sexualOrientation;
  }
  getDescription() {
    return this.description;
  }
  getGender() {
    return this.gender;
  }
  getEmail() {
    return this.email;
  }
  getAvatar() {
    return this.avatar;
  }
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
  getTags() {
    return this.tags;
  }

  getSearchingTags() {
    let ret = "(";

    this.tags.forEach((e, index) => {
      const tag = e.tags;

      ret += `${tag}`;
      ret += index === this.tags.length - 1 ? ")" : ",";
    });
    return ret;
  }

  confirmPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

module.exports = User;
