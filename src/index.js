require("dotenv");
const express = require ("express");
const app = express();
const port = 3000;
const lib = require('./config/db');
const user_query = require('./routes/user/user.query');
const connection = lib.get_db_connection();
app.use(express.json());

app.get ("/" , ( req , res ) => {
    res.send (" Hello World !");
});

app.get(/name.+/, function (req, res) {
    who = req.url.split('/')[2];
    res.send('Hey ' + who)
})

app.post('/users', (req, res) => {
    res.status(201).send();
    console.log("here")
    user_query.register_user(connection, req.body.email, req.body.password, req.body.name, req.body.firstname);
    res.status(201).send();
});

connection.query(
    'SELECT * FROM user;',
    function(err, results) {
        console.log(results);
    }
);

app.listen(port);