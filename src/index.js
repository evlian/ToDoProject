require("dotenv");
const express = require ("express");
const app = express();
const port = 3000;
const lib = require('./config/db');
const user_query = require('./routes/user/user.query');
const connection = lib.get_db_connection();
const user = require('./routes/user/user.js');

app.use(express.json());

user.user_routes(connection, app);


app.listen(port);