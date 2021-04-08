function registerTask(connection, userId, title, description, status, dueTime) {
    connection.query(
        `INSERT INTO todos(user_id, title, description, status, due_time)
        VALUES("${userId}", "${title}", "${description}", "${status}", "${dueTime}");`
    )
}

function getTask(connection, task_id) {
    connection.query(
        `SELECT * FROM todos WHERE task_id = ${task_id};`,
        function (err, results, fields) {
            return results;
        }
    )
}

function updateTask(connection, taskId, title, description, status) {
    connection.query(
        `UPDATE todos SET title = ${title}, SET description = ${description},
        SET status = ${status} WHERE task_id = ${taskId};`
    )
}

function deleteTask(connection, taskId) {
    connection.query(
        `DELETE FROM todos WHERE task_id = ${taskId};`
    )
}

module.exports = { registerTask, getTasks, updateTask, deleteTask };