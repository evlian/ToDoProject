require("dotenv");
const express = require ("express");
const app = express();
const port = 3000;
const lib = require('./config/db');
const connection = lib.getDbConnection();
const notFound = require('./middleware/notFound.js');
const userQueries = require('./routes/user/user.query');
const user = require('./routes/user/user.js');
const todo = require('./routes/todos/todos.js');
const auth = require('./routes/auth/auth.js');

app.use(express.json());
user.userRoutes(connection, app);
todo.todoRoutes(connection, app);
auth.authorizeUser(app, connection);
app.use('*', notFound.routeNotFound);
app.listen(port);