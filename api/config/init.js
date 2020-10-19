"use strict";

const faker = require("faker");
const bcrypt = require("bcryptjs");
const TAGS = require("./tags").TAGS;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getDifferentId(arr, number) {
  if (arr.length === number) {
    return arr;
  } else {
    const id = getRandomInt(TAGS.length) + 1;

    if (arr.indexOf(id) === -1) {
      arr.push(id);
    }
    return getDifferentId(arr, number);
  }
}

const Initializer = function (db) {
  this.db = db;
  this.tagValues = [];

  this.genderType = ["male", "female"];

  this.orientationType = ["hetero", "homo", "bi"];

  this.getFakeData = function (number) {
    const ret = [];
    let i = 0;

    while (i < number) {
      const gender = i < number % 2 ? "male" : "female";
      const genderPics = gender === " male" ? "men" : "women";
      const avatar = `https://randomuser.me/api/portraits/${genderPics}/${
        i % 100
      }.jpg`;
      const user = [];
      const orientation = faker.random.arrayElement(this.orientationType);
      const userName = faker.internet.userName();
      const age = Math.floor(Math.random() * Math.floor(75 - 18)) + 18;

      user.push(faker.internet.email());
      user.push(userName);
      user.push(faker.name.firstName(gender));
      user.push(faker.name.lastName());
      user.push(bcrypt.hashSync(userName, 0));
      user.push(age);
      user.push(orientation);
      user.push(faker.lorem.sentence());
      user.push(JSON.stringify({}));
      user.push(gender);
      user.push(faker.random.number(99));
      user.push(faker.address.latitude());
      user.push(faker.address.longitude());
      user.push(avatar);
      ret.push(user);
      i++;
      this.addTagsToUser(i);
    }
    return ret;
  };

  this.addTagsToUser = function (userId) {
    const numberOfTags = getRandomInt(TAGS.length) + 1;
    const tagsId = getDifferentId([], numberOfTags);

    tagsId.forEach((tagId) => {
      const value = [userId, tagId];

      this.tagValues.push(value);
    });
    console.log("user ceated: ", userId);
  };

  this.createFakeData = function (number) {
    const sql =
      "INSERT INTO users (email, username, firstname, name, password, age, sexualOrientation, description, matches, gender, popularityScore, latitude, longitude, avatar) VALUES ?";
    const insertTag = "INSERT INTO user_tag (userId, tagId) VALUES ?";
    const values = this.getFakeData(number);

    this.db.query(sql, [values], (err) => {
      if (err) {
        console.log("ERROR SQL: " + err.message);
      }
      console.log("users has been populate");
    });
    this.db.query(insertTag, [this.tagValues], (err) => {
      if (err) {
        console.log("ERROR SQL: " + err);
      }
      console.log("tags has been populate");
    });
  };
};

module.exports = Initializer;
