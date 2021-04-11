require('dotenv').config();
const bcrypt = require('bcryptjs');
const userQuery = require('../user/user.query');
const jwt = require('jsonwebtoken');

async function authorizeUser(app, connection)
{
    app.post("/login", async (req, res) => {
        const email = req.body.email;
        const user = await userQuery.getUserById(connection, email);
        if (! await userQuery.emailExists(connection, email)) {
            res.status(200);
            res.json({"msg": "Invalid Credentials"});
        }
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                const userJson = {"user": email};
                const token = jwt.sign(userJson, process.env.SECRET);
                res.status(200);
                res.json({"token": `${token}`});
            } else {
                res.status(200);
                res.json({"msg": "Invalid Credentials"});
            }
        } catch {
            return res.status(500).json({
                msg: 'Internal server error',
            });
        }
    });
}

module.exports = { authorizeUser };