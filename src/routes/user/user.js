const queries = require('./user.query');
const bcrypt = require('bcryptjs');

function user_routes (connection, app) {
    app.post ("/register" , async ( req , res ) => {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            queries.insert_user(connection, req.body.email, hashedPassword,
                                req.body.name, req.body.firstname);

            res.json({"token": hashedPassword});
            console.log(hashedPassword);
            res.status(201);
        } catch {
            res.status(500).send();
        }
    });

    app.get ("/user", (req, res) => {
        res.send(queries.get_users(connection));
        res.status(201);
    });
}

module.exports = { user_routes };