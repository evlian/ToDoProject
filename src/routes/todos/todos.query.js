const userQuery = require('../user/user.query');

function registerTask(connection, userId, title, description, status, dueTime) {
    connection.query(
        `INSERT INTO todo(user_id, title, description, status, due_time)
        VALUES("${userId}", "${title}", "${description}", "${status}", "${dueTime}");`
    )
}

async function getTaskById(connection, id) {
    task = await userQuery.getQueryWithPromise(connection, `SELECT * FROM todo WHERE id = ${id};`);
    return task[0];
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
    let user_id = await userQuery.getUserById(connection, email);

    return await userQuery.getQueryWithPromise(connection,
            `SELECT * FROM todo WHERE user_id = ${user_id.id};`);
}

async function getAllTasks(connection) {
    return await userQuery.getQueryWithPromise(connection,
        `SELECT * FROM todo;`)
}

async function taskExists(connection, id) {
    const task = await getTaskById(connection, id);
    if (task) return true;
    return false;
}

module.exports = { registerTask, updateTask, deleteTask, getTaskById, getUserTasks, getAllTasks, taskExists };