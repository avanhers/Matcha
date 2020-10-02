"use strict";
const database = require("./Database");
const db = require("./Database");

class QueryCreator {
  query = "";
  values;

  select(field, alias = null) {
    this.values = [];
    this.query = `SELECT ${field}`;

    if (alias) {
      this.query += ` AS ${alias}`;
    }
    return this;
  }

  from(table, alias) {
    this.query += `FROM ${table} as ${alias} `;
    return this;
  }

  where(field, condition) {
    this.query += `WHERE ${field} = ? `;
    this.value.push(condition);
    return this;
  }

  innerJoin(table, alias) {
    this.query += `INNER JOIN ${table} as ${alias} `;
    return this;
  }

  on(field1, field2) {
    this.query += `ON ${field1} = ${field2} `;
    return this;
  }

  getQuery() {
    return this.query;
  }

  sendQuery() {
    return db.query(this.query, values);
  }
}

const queryCreator = new QueryCreator();

module.exports = queryCreator;
