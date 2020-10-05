"use strict";
const database = require("./Database");
const db = require("./Database");

Array.prototype.isLastIndex = function (index) {
  return this.length - 1 === index;
};

class QueryCreator {
  query = "";
  values = [];

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
    console.log("WHERE CLAUSE, ", this.query);
    this.values.push(condition);
    return this;
  }

  and(field, condition) {
    this.query += `AND ${field} = ? `;
    console.log("AND CLAUSE, ", this.query);
    this.values.push(condition);
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
    return db.query(this.query, this.values);
  }
}

const queryCreator = new QueryCreator();

module.exports = queryCreator;
