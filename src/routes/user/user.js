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

    app.get (/user\/:.*/, auth.authenticateToken, async (req, res) => {
        id = req.url.split(':')[1];;
        results = await queries.getUserById(connection, id);
        res.send(results);
        res.status(201);
    });
}

module.exports = { userRoutes };