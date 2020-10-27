"use strict";

const User = require("../entities/User");
const queryCreator = require("../../framework/queryCreator");

class SearcherManager {
  async findMatches(user, parameters) {
    queryCreator.selectUserInfos().addSelect("s.tags").from("users", "u");
    this.addLikesJoin(user);
    this.addDistanceJoin(user);
    this.addTagsJoin(parameters);
    this.addBlocks(user);
    this.filterBySexualOrientation(
      user.getGender(),
      user.getSexualOrientation()
    );
    this.setOtherFilters(parameters);
    queryCreator.addAndLogic(`u.id <> ${user.getId()}`);
    queryCreator.addAndLogic(`b.id IS NULL`);
    this.setSort(parameters);
    this.setPagination(parameters);
    return queryCreator.sendQuery();
  }

  addBlocks(user) {
    queryCreator
      .leftJoin("blocks", "b")
      .on("b.blockerId", user.getId())
      .addAndLogic("b.blockedId = u.id");
  }

  addTagsJoin(parameters) {
    const subRequest = this.getMatchingTagsSubRequest(parameters.tags);

    queryCreator.innerJoin(subRequest, "s").on("u.id", "s.userId");
  }

  //Calcul de la distance avec la formule de haversine
  addDistanceJoin(user) {
    const subRequest = `(SELECT a, id, c, 6371 * c as distance, longitude, latitude
      FROM (SELECT a, id, 2 * ATAN(SQRT(a) / SQRT(1 - a)) as c , longitude, latitude
            FROM (SELECT(POW(SIN((${user.getLatitude()} - latitude) / 2),2) + COS(latitude) * COS(${user.getLatitude()}) * POW(SIN((${user.getLongitude()} - longitude) / 2),2)) as a, longitude, latitude, id
FROM users) t1) t2) `;
    queryCreator.innerJoin(subRequest, "t").on("u.id", "t.id");
  }

  addLikesJoin(user) {
    queryCreator
      .leftJoin("likes", "l")
      .on("l.likeId", user.getId())
      .addAndLogic("l.likedId = u.id");
  }

  setOtherFilters(params) {
    const { ageMin, ageMax, popMin, popMax, distMax } = params;

    queryCreator.addAndLogic(
      `(age BETWEEN  ${ageMin} AND ${ageMax} ) AND (popularityScore BETWEEN ${popMin} AND ${popMax} ) AND distance < ${distMax}`
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
