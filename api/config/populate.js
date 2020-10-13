const mysql = require("mysql");
const config = require("./db.config");

const Initializer = require("./init");

const dbConn = mysql.createConnection(config);

dbConn.connect((err) => {
  dbConn.query("SELECT COUNT(*) FROM users", (err, result) => {
    if (err) {
      console.log("ERR: ", err);
    } else {
      const count = result[0]["COUNT(*)"];

      console.log(result);
      if (!count || count < 99) {
        const init = new Initializer(dbConn);

        console.log("Database Matcha is going to be populate");
        init.createFakeData(200);
      } else {
        console.log("Database already populates");
      }
    }
    dbConn.end((err) => {
      if (err) {
        console.log("Error: ", err.message);
      }
    });
  });
});
