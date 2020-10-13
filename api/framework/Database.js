const mysql = require("mysql");
const config = require("../config/db.config");

class Database {
  db;

  constructor(config) {
    this.db = mysql.createConnection(config);

    this.db.connect((err) => {
      if (err) {
        console.log("error connecting: " + err);
        return;
      }
      console.log("connected as id " + this.db.threadId);
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.db.query(sql, args, (err, rows) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(rows);
      });
    });
  }
}

const db = new Database(config);

module.exports = db;
