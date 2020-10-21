"use strict";
const UserManager = require("../manager/UserManager");
const searcher = require("../manager/SearcherManager");
const User = require("../entities/User");
const manager = new UserManager();

function getSearchingTags(tags) {
  let ret = "(";
  let numberOfTags = tags.reduce((acc, cv) => (cv ? ++acc : acc), 0);

  console.log("NoT: ", numberOfTags);
  tags.forEach((tag, index) => {
    if (tag) {
      numberOfTags--;
      ret += `${index + 1}`;
      ret += !numberOfTags ? ")" : ",";
    }
  });
  console.log("ret = ", ret);
  return ret;
}

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
      users = await searcher.findMatches(user, parameters);
      return response.json({ status: 200, users: users });
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
      distMax: 600000,
      tags: getSearchingTags(user.getTags()),
    };
    const queryParams = req.query;
    console.log(params);
    for (const key in queryParams) {
      const val = queryParams[key];

      if (params.hasOwnProperty(key) && val) {
        if (key === "tags") {
          params[key] = getSearchingTags(val);
        } else {
          params[key] = val;
        }
      }
    }
    for (const key in params) {
      const val = params[key];

      if (typeof val === "string" && val.indexOf(" ") > -1) {
        throw val + ": bad Parameters";
      }
    }
    return params;
  },
};

module.exports = matchController;
