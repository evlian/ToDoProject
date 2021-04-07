require("dotenv");
const express = require ("express");
const app = express ();
const port = 3000;
const lib = require('./config/db');
const connection = lib.get_db_connection();

app.get ("/" , ( req , res ) => {
    res.send (" Hello World !");
});

app.get(/name.+/, function (req, res) {
    who = req.url.split('/')[2];
    res.send('Hey ' + who)
  })

app.listen ( port , () => {
    console.log (`Example app listening at http://localhost:${port}`) ;
});

connection.query(
    'SELECT * FROM user;',
    function(err, results) {
        console.log(results);
    }
);