function insert_user(connection, email, password, name, firstname) {
    connection.query(
        `INSERT INTO user(email, password, name, firstname)
        VALUES("${email}", "${password}", "${name}", "${firstname}");`
    )
}

function get_user(connection, id) {
    connection.query(
        `SELECT * FROM user WHERE id = ${id};`,
        function (err, results, fields) {
            return results;
        }
    )
}

function get_users(connection) {
    connection.query(
        'SELECT * FROM user;',
        function (err, results) {
            console.log(results);
        }
    );
}

function get_user_tasks(connection, user_id) {
    connection.query(
        `SELECT * FROM todos WHERE user_id = ${user_id};`,
        function (err, results, fields) {
            return results;
        }
    )
}

function delete_user(connection, user_id) {
    connection.query(
        `DELETE FROM user WHERE id = ${user_id};`
    )
}

function update_user(connection, id, email, password, name, firstname, created_at) {
    connection.query(
        `UPDATE user SET email = ${email}, SET password = ${password}, SET name = ${name},
        SET firstname ${firstname}, SET created_at = ${created_at} WHERE id = ${id};`
    )
}

module.exports = { insert_user, get_user, get_users, delete_user, update_user, get_user_tasks };