require('dotenv').config();
const bcrypt = require('bcryptjs');
const userQuery = require('../user/user.query');
const jwt = require('jsonwebtoken');

async function authorizeUser(app, connection)
{
    app.post("/login", async (req, res) => {
        const email = req.body.email;
        const password = await userQuery.getUserPasswordByEmail(connection, email);
        if (password == undefined) {
            res.status(200);
            res.json({"msg": "Invalid Credentials"});
        }
        try {
            if (await bcrypt.compare(req.body.password, password)) {
                const user = {"user": email};
                const token = jwt.sign(user, process.env.SECRET);
                res.status(200);
                res.json({"token": `${token}`});
            } else {
                res.status(200);
                res.json({"msg": "Invalid Credentials"});
            }
        } catch {
            res.status(500).send();
        }
    });
}

module.exports = { authorizeUser };