const queries = require('./user.query');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');

async function userRoutes (connection, app) {
    app.post ("/register" , async ( req , res ) => {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            if (await queries.getUserPasswordByEmail(connection, req.body.email) != undefined) {
                res.json({"msg":"account already exists"});
                res.status(201).send();
                return;
            }
            queries.insertUser(connection, req.body.email, hashedPassword,
                                req.body.name, req.body.firstname);
            const user = {"user": req.body.email};
            const token = jwt.sign(user, process.env.SECRET);
            res.json({"token": token});
            res.status(201);
        } catch {
            res.status(500).send();
        }
    });
    app.get ("/user/", auth.authenticateToken, async (req, res) => {
        results = await queries.getUsers(connection);
        res.send(results);
        res.status(201);
    });

    app.get (/user\/:.+/, auth.authenticateToken, async (req, res) => {
        id = req.url.split(':')[1];
        if (id.includes('@'))
            results = await queries.getUserByEmail(connection, id);
        else
            results = await queries.getUserById(connection, id);
        res.send(results);
        res.status(201);
    });

    app.put (/user\/:.+/, auth.authenticateToken, async (req, res) => {
        id = req.url.split(':')[1];
        queries.updateUser(connection, id, req.body.email
                            ,req.body.password, req.body.name
                            , req.body.firstname ,req.body.created_at);
        res.json(req.body);
        res.status(201).send();
    });

    app.delete (/user\/:.+/, auth.authenticateToken, async (req, res) => {
        id = req.url.split(':')[1];
        queries.deleteUser(connection, id);
        return res.status(201).json({
            msg: `successfully deleted record number: ${id}`,
        });
    });

    app.get ("/user/todos", auth.authenticateToken, async (req, res) => {
        result = await(getUserTasks);
        res.send(results);
        res.status(201);
    });
}

module.exports = { userRoutes };