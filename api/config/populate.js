const mysql = require('mysql');
const config = require('./db.config');

const Initializer = require('../init');

const dbConn = mysql.createConnection(config);

dbConn.connect((err) => {
    dbConn.query('SELECT COUNT(*) FROM users', (err, result) => {
        const count = result[0]['COUNT(*)'];
        if (!err) {
            if (!result.length) {
                const init = new Initializer(dbConn);

                console.log('Database Matcha is going to be populate');
                init.createFakeData(200);
            } else {
                console.log('Database already populates');
            }
        } else {
            console.log('SQL Error: ' + err.message);
        }
        dbConn.end((err) => {
            if (err) {
                console.log('Error: ', err.message);
            }
        })
    })
});
