const userQuery = require('../user/user.query');

function registerTask(connection, userId, title, description, status, dueTime) {
    connection.query(
        `INSERT INTO todo(user_id, title, description, status, due_time)
        VALUES("${userId}", "${title}", "${description}", "${status}", "${dueTime}");`
    )
}

async function getTaskById(connection, id) {
    return await userQuery.getQueryWithPromise(connection, `SELECT * FROM todo WHERE id = ${id};`);
}

function updateTask(connection, taskId, title, description, status, dueTime) {
    connection.query(
        `UPDATE todo SET title = "${title}", description = "${description}",
        status = "${status}", due_time = "${dueTime}" WHERE id = ${taskId};`
    )
}

function deleteTask(connection, taskId) {
    connection.query(
        `DELETE FROM todo WHERE id = ${taskId};`
    )
}

async function getUserTasks(connection, email) {
    let user_id = await userQuery.getUserIdByEmail(connection, email);

    return await userQuery.getQueryWithPromise(connection,
            `SELECT * FROM todo WHERE user_id = ${user_id};`);
}

module.exports = { registerTask, updateTask, deleteTask, getTaskById, getUserTasks };