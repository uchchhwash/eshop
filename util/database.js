const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "node-complete",
    database: "node-complete"
})

module.exports = pool.promise();