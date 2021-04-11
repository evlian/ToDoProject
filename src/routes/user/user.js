const queries = require('./user.query');
const todoQueries = require('../todos/todos.query');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');

async function getUserInfo(connection, app) {
    app.get ("/user", auth.authenticateToken, async (req, res) => {
        results = await queries.getUsers(connection);
        res.send(results);
        res.status(200);
    });
    app.get (/user\/:.+/, auth.authenticateToken, async (req, res) => {
        id = req.url.split(':')[1];
        results = await queries.getUserById(connection, id);
        res.send(results);
        res.status(200);
    });
    app.get ("/user/todos", auth.authenticateToken, async (req, res) => {
        results = await todoQueries.getUserTasks(connection, req.user.user);
        res.send(results);
        res.status(200);
    });
}

async function addUsers(connection, app) {
    app.post ("/register" , async ( req , res ) => {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            if (await queries.emailExists(connection, req.body.email)) {
                res.json({"msg":"account already exists"});
                res.status(200).send();
                return;
            }
            queries.insertUser(connection, req.body.email, hashedPassword,
                                req.body.name, req.body.firstname);
            const user = {"user": req.body.email};
            const token = jwt.sign(user, process.env.SECRET);
            res.json({"token": token});
            res.status(200);
        } catch {
            return res.status(500).json({
                msg: 'Internal server error',
            });
        }
    });
}

async function editUsers(connection, app) {
    app.put (/user\/:.+/, auth.authenticateToken, async (req, res) => {
        id = req.url.split(':')[1];
        queries.updateUser(connection, id, req.body.email
                            ,req.body.password, req.body.name
                            , req.body.firstname ,req.body.created_at);
        res.json(await queries.getUserById(connection, id));
        res.status(200).send();
    });
}

async function deleteUsers(connection, app) {
    app.delete (/user\/:.+/, auth.authenticateToken, async (req, res) => {
        id = req.url.split(':')[1];
        queries.deleteUser(connection, id);
        return res.status(200).json({
            msg: `successfully deleted record number: ${id}`,
        });
    });
}

async function userRoutes (connection, app) {
    getUserInfo(connection, app);
    addUsers(connection, app);
    editUsers(connection, app);
    deleteUsers(connection, app);
}

module.exports = { userRoutes };