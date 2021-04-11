require("dotenv").config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});


function getDbConnection() {
    return connection;
}

function closeDbConnection(connection) {
    connection.end();
}

module.exports = { getDbConnection, closeDbConnection };