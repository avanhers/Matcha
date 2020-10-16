"use strict";
const UserManager = require("../manager/UserManager");
const searcher = require("../manager/SearcherManager");
const User = require("../entities/User");
const manager = new UserManager();

const matchController = {
  findMatches: async function (request, response, next) {
    try {
      let users;
      const user = await manager.findOneById(request.userId);
      let parameters;

      if (!user.isComplete()) {
        return response.json({ status: 401, error: "user not complete" });
      }
      await manager.addTagsToUser(user);
      parameters = this.getParameters(request, user);
      console.log("coucou");
      users = await searcher.findMatches(user, parameters);
      return response.json({ users: users });
    } catch (e) {
      return response.json({ status: 500, error: e.message });
    }
  },

  getParameters: function (req, user) {
    const params = {
      sortBy: "LENGTH(tags)",
      orderBy: "DESC",
      perPage: 30,
      page: 1,
      ageMin: 0,
      ageMax: 200,
      popMin: 0,
      popMax: 100,
      tags: user.getSearchingTags(),
    };
    const queryParams = req.query;

    for (const key in queryParams) {
      const val = queryParams[key];

      if (params.hasOwnProperty(key)) {
        params[key] = val;
      }
    }
    for (const key in params) {
      const val = params[key];

      console.log(typeof val);
      if (typeof val === "string" && val.indexOf(" ") > -1) {
        throw val + ": bad Parameters";
      }
    }
    return params;
  },
};

module.exports = matchController;
