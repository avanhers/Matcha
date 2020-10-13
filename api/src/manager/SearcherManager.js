"use strict";

const User = require("../entities/User");
const queryCreator = require("../../framework/queryCreator");

class SearcherManager {
  async findMatches(user, parameters) {
    const subRequest = this.getMatchingTagsSubRequest(parameters.tags);

    queryCreator
      .selectUserInfos()
      .addSelect("s.tags")
      .from("users", "u")
      .innerJoin(subRequest, "s")
      .on("u.id", "s.userId");
    this.filterBySexualOrientation(
      user.getGender(),
      user.getSexualOrientation()
    );
    this.setOtherFilters(parameters);
    this.setSort(parameters);
    this.setPagination(parameters);
    return queryCreator.sendQuery();
  }

  setOtherFilters(params) {
    const { ageMin, ageMax, popMin, popMax } = params;

    queryCreator.addAndLogic(
      `(age BETWEEN  ${ageMin} AND ${ageMax} ) AND (popularityScore BETWEEN ${popMin} AND ${popMax} )`
    );
  }

  setPagination(params) {
    const { perPage, page } = params;

    queryCreator.pagination(page, perPage);
  }

  setSort(params) {
    const { orderBy, sortBy } = params;

    queryCreator.orderBy(sortBy, orderBy);
  }

  filterBySexualOrientation(gender, orientation) {
    if (orientation === "hetero") {
      const target = gender === "male" ? "female" : "male";

      queryCreator.where("gender", target).andNot("sexualOrientation", "homo");
    } else if (orientation === "homo") {
      const target = gender === "male" ? "male" : "female";

      queryCreator
        .where("gender", target)
        .andNot("sexualOrientation", "hetero");
    } else {
      if (gender === "male") {
        queryCreator.addWhereLogic(`
        ((gender = 'male' AND sexualOrientation <> 'hetero') OR (gender = 'female' AND sexualOrientation <> 'homo')) 
        `);
      } else {
        queryCreator.addWhereLogic(`
        ((gender = 'male AND sexualOrientation <> 'homo') OR (gender = 'female' AND sexualOrientation <> 'hetero')) 
        `);
      }
    }
  }

  getMatchingTagsSubRequest(tags) {
    const sql = `
    (SELECT userId, GROUP_CONCAT(tagId) as tags FROM user_tag WHERE tagId IN ${tags} GROUP BY userId) 
    `;

    return sql;
  }
}

const searcher = new SearcherManager();

module.exports = searcher;
