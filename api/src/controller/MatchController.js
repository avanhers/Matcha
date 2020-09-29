"use strict";
const UserManager = require("../manager/UserManager");
const User = require("../entities/User");
const manager = new UserManager();

const matchController = {
  findMatches: async function (request, response, next) {
    console.log("in match controller");
    try {
      console.log(request.body.nbElem, request.body.offset);
      let results = await manager.findMatches(request.body);
      //let results = await manager.findUserByEmail("Bud_McCullough76@yahoo.com");
      //   console.log(results);
      response.status(200).json(results);
    } catch (e) {
      console.log("bonjour", e);
      response.sendStatus(500);
    }
  },
};

module.exports = matchController;
