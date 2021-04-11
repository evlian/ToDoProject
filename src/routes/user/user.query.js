function insertUser(connection, email, password, name, firstname) {
    connection.query(
        `INSERT INTO user(email, password, name, firstname)
        VALUES("${email}", "${password}", "${name}", "${firstname}");`,
    )
}

async function getUserById(connection, id) {
    let user;
    if (id.includes('@'))
        user = await getQueryWithPromise(connection, `SELECT * FROM user WHERE email = "${id}";`);
    else
        user = await getQueryWithPromise(connection, `SELECT * FROM user WHERE id = ${id};`);
    return user[0];
}

async function emailExists(connection, email) {
    const user = await getUserById(connection, email);
    if (user)
        return true;
    return false;
}

async function getUsers(connection) {
    return await getQueryWithPromise(connection, "SELECT * FROM user;");
}

async function getQueryWithPromise(connection, queryStatement) {
    return connection.promise().query(queryStatement).then(([rows, fields]) => {
        return(rows);
    }).catch(console.log);
}

async function deleteUser(connection, user_id) {
    connection.query(
        `DELETE FROM todo WHERE user_id = ${user_id};`
    );
    connection.query(
        `DELETE FROM user WHERE id = ${user_id};`
    );
}

function updateUser(connection, id, email, password, name, firstname, createdAt) {
    connection.query(
        `UPDATE user SET email = "${email}", password = "${password}", name = "${name}",
        firstname = "${firstname}", created_at = "${createdAt}" WHERE id = ${id};`
    )
}

module.exports = { insertUser, getUserById, getUsers, deleteUser, updateUser, getQueryWithPromise, emailExists };