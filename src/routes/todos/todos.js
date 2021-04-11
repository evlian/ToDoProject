const queries = require('./todos.query');
const auth = require('../../middleware/auth');

async function getTodos(connection, app) {
    app.get ("/todo", auth.authenticateToken, async (req, res) => {
        results = await queries.getAllTasks(connection);
        res.status(200);
        res.send(results);
    });
    app.get (/todo\/:.+/, auth.authenticateToken, async (req, res) => {
        id = req.url.split(':')[1];
        if (!await queries.taskExists(connection, id)) {
            return res.status(201).json({
                msg: 'Not found',
            });
        }
        results = await queries.getTaskById(connection, id);
        res.status(200);
        res.send(results);
    });
}

async function addTodos(connection, app) {
    app.post ("/todo" , auth.authenticateToken, async ( req , res ) => {
        queries.registerTask(connection, req.body.user_id, req.body.title,
                            req.body.description, req.body.status, req.body.due_time);
        res.send(req.body);
        return res.status(200).send();
    });
}

async function editTodos(connection, app) {
    app.put (/todo\/:.+/, auth.authenticateToken, async (req, res) => {
        const id = req.url.split(':')[1];
        if (!await queries.taskExists(connection, id)) {
            return res.status(201).json({
                msg: 'Not found',
            });
        }
        queries.updateTask(connection, id, req.body.title, req.body.description, req.body.status, req.body.due_time)
        res.json(await queries.getTaskById(connection, id));
        res.status(200).send();
    });
}

async function deleteTodos(connection, app) {
    app.delete (/todo\/:.+/, auth.authenticateToken, async (req, res) => {
        const id = req.url.split(':')[1];
        if (!await queries.taskExists(connection, id)) {
            return res.status(201).json({
                msg: 'Not found',
            });
        }
        queries.deleteTask(connection, id);
        return res.status(200).json({
            msg: `successfully deleted record number: ${id}`,
        });
    });
}

async function todoRoutes (connection, app) {
    getTodos(connection, app);
    addTodos(connection, app);
    editTodos(connection, app);
    deleteTodos(connection, app);
}

module.exports = {todoRoutes};