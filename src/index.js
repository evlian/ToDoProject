require("dotenv");
const express = require ("express");
const app = express();
const port = 3000;
const lib = require('./config/db');
const userQuery = require('./routes/user/user.query');
const connection = lib.getDbConnection();
const user = require('./routes/user/user.js');
const auth = require('./routes/auth/auth.js');

app.use(express.json());

user.userRoutes(connection, app);

auth.authorizeUser(app, connection);
app.listen(port);