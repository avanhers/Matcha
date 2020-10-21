"use strict";
const database = require("./Database");
const db = require("./Database");

Array.prototype.isLastIndex = function (index) {
  return this.length - 1 === index;
};

class QueryCreator {
  query = "";
  values = [];

  selectUserInfos() {
    this.values = [];
    this.query = `
    SELECT u.username, u.age, u.sexualOrientation, u.gender, u.popularityScore, u.latitude, u.longitude, u.avatar, ROUND(t.distance, 2) as distance, l.likedId 
    `;
    return this;
  }

  select(field, alias = null) {
    this.values = [];
    this.query = `SELECT ${field}`;

    if (alias) {
      this.query += ` AS ${alias}`;
    }
    this.query += " ";
    return this;
  }

  delete(table) {
    this.query = `DELETE FROM ${table} `;
    this.values = [];
    return this;
  }

  insert(table, fields) {
    this.values = [];
    this.query = `INSERT INTO ${table} (`;

    fields.forEach((field, index) => {
      this.query += field;
      this.query += fields.isLastIndex(index) ? ") " : ", ";
    });
    return this;
  }

  value(fieldValues) {
    this.query += "VALUES ";
    fieldValues.forEach((fieldValue, index) => {
      if (index === 0) {
        this.query += "(";
      }
      this.query += "?";
      this.query += fieldValues.isLastIndex(index) ? ") " : ", ";
      this.values.push(fieldValue);
    });
    return this;
  }

  addSelect(field, alias = null) {
    this.query += `, ${field}`;
    if (alias) {
      this.query += ` AS ${alias}`;
    }
    this.query += " ";
    return this;
  }

  from(table, alias = null) {
    this.query += `FROM ${table}`;
    if (alias) {
      this.query += ` AS ${alias}`;
    }
    this.query += " ";

    return this;
  }

  where(field, condition) {
    this.query += `WHERE ${field} = ? `;
    this.values.push(condition);
    return this;
  }

  groupBy(field) {
    this.query += `GROUP BY ${field}`;
    return this;
  }

  and(field, condition) {
    this.query += `AND ${field} = ? `;
    this.values.push(condition);
    return this;
  }

  andNot(field, condition) {
    this.query += `AND ${field} <> ? `;
    this.values.push(condition);
    return this;
  }

  innerJoin(table, alias) {
    this.query += `INNER JOIN ${table} as ${alias} `;
    return this;
  }

  leftJoin(table, alias) {
    this.query += `LEFT JOIN ${table} as ${alias} `;
    return this;
  }

  on(field1, field2) {
    this.query += `ON ${field1} = ${field2} `;
    return this;
  }

  orderBy(field, order) {
    this.query += `ORDER BY ${field} ${order} `;
    return this;
  }

  pagination(page, itemsPerPage = 30) {
    const start = itemsPerPage * (page - 1);

    this.query += `LIMIT ${itemsPerPage} OFFSET ${start} `;
    return this;
  }

  getQuery() {
    return this.query;
  }

  addWhereLogic(logic, conditions = null) {
    this.query += `WHERE ${logic} `;
    if (conditions) {
      this.values.concat(conditions);
    }
    return this;
  }

  addAndLogic(logic, conditions = null) {
    this.query += `AND ${logic} `;
    if (conditions) {
      this.values.concat(conditions);
    }
    return this;
  }

  sendQuery() {
    console.log("QUERY = ", this.query);
    return db.query(this.query, this.values);
  }
}

const queryCreator = new QueryCreator();

module.exports = queryCreator;
