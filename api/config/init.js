"use strict";

const faker = require("faker");
const bcrypt = require("bcryptjs");

const Initializer = function (db) {
  this.db = db;

  this.genderType = ["male", "female"];

  this.orientationType = ["hetero", "homo", "bi"];

  this.getFakeData = function (number) {
    const ret = [];

    while (number--) {
      const user = [];
      const gender = faker.random.arrayElement(this.genderType);
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
      user.push(faker.image.avatar());
      ret.push(user);
    }
    return ret;
  };

  this.createFakeData = function (number) {
    const sql =
      "INSERT INTO users (email, username, firstname, name, password, age, sexualOrientation, description, matches, gender, popularityScore, latitude, longitude, avatar) VALUES ?";
    const values = this.getFakeData(number);

    this.db.query(sql, [values], (err) => {
      if (err) {
        console.log("ERROR SQL: " + err.message);
      }
      console.log("Database Matcha has been populate");
    });
  };
};

module.exports = Initializer;
