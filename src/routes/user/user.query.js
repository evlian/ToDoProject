function insertUser(connection, email, password, name, firstname) {
    connection.query(
        `INSERT INTO user(email, password, name, firstname)
        VALUES("${email}", "${password}", "${name}", "${firstname}");`,
        function(err, results) {
            if (err) return "duplicate-email";
        }
    )
    return undefined;
}

async function getUserById(connection, id) {
    let user;
    let promise = new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM user WHERE id = ${id} OR email = "${id}";`,
            function (err, results) {
                if (err) reject();
                if (results != "" && results != undefined)
                    user = results;
                resolve(user);
        });
    })
    return await promise;
}

async function getUserByEmail(connection, email) {
    let user;
    let promise = new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM user WHERE email = "${email}";`,
            function (err, results) {
                if (err) reject;
                if (results != "" && results != undefined)
                    user = results;
                resolve(user);
            }
        )
    })
    return await promise;
}


async function getUserPasswordByEmail(connection, email) {
    let password;
    let promise = new Promise((resolve, reject) => {
        connection.query(`SELECT password FROM user WHERE email = "${email}";`, (err, results) => {
            if (err) reject();
            if (results != ""){
                password = results[0].password;
            }
            resolve(password);
        });
    })
    return await promise;
}

async function getUserIdByEmail(connection, email) {
    let id;
    let promise = new Promise((resolve, reject) => {
        connection.query(`SELECT id FROM user WHERE email = "${email}";`, (err, results) => {
            if (err) reject();
            if (results != ""){
                id = results[0].id;
            }
            resolve(id);
        });
    })
    return await promise;
}


async function getUsers(connection) {
    let result;
    let promise = new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM user;',
            function (err, results) {
                if (err) reject();
                if (results != "") {
                    result = results;
                }
                resolve(result);
            }
        );
    })
    return await promise;
}

async function getQueryWithPromise(connection, queryStatement)
{
    let result;
    let promise = new Promise((resolve, reject) => {
        connection.query(
            queryStatement,
            function (err, results) {
                if (err, reject);
                if (results != "") {
                    result = results;
                }
                resolve(result);
            }
        )
    });
    return await promise;
}

async function deleteUser(connection, user_id) {
    connection.query(
        `DELETE FROM user WHERE id = ${user_id};`
    )
}

function updateUser(connection, id, email, password, name, firstname, createdAt) {
    connection.query(
        `UPDATE user SET email = "${email}", password = "${password}", name = "${name}",
        firstname = "${firstname}", created_at = "${createdAt}" WHERE id = ${id};`
    )
}

module.exports = { insertUser, getUserById, getUserPasswordByEmail, getUsers, deleteUser, updateUser, getUserIdByEmail, getQueryWithPromise, getUserIdByEmail };