function register_task(connection, user_id, title, description, status, due_time) {
    connection.query(
        `INSERT INTO todos(user_id, title, description, status, due_time)
        VALUES("${user_id}", "${title}", "${description}", "${status}", "${due_time}");`
    )
}

function get_task(connection, user_id, task_id) {
    connection.query(
        `SELECT * FROM todos WHERE task_id = ${task_id};`,
        function (err, results, fields) {
            return results;
        }
    )
}

function update_task(connection, task_id, title, description, status) {
    connection.query(
        `UPDATE todos SET title = ${title}, SET description = ${description},
        SET status = ${status} WHERE task_id = ${task_id};`
    )
}

function delete_task(connection, task_id) {
    connection.query(
        `DELETE FROM todos WHERE task_id = ${task_id};`
    )
}

module.exports = { register_task, get_tasks, update_task, delete_task };