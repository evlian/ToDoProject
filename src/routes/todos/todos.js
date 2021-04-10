const queries = require('./todos.query');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');

async function todoRoutes (connection, app) {
    app.post ("/todo" , auth.authenticateToken, async ( req , res ) => {
        queries.registerTask(connection, req.body.user_id, req.body.title,
                            req.body.description, req.body.status, req.body.due_time);
        res.send(req.body);
        return res.status(201).send();
    });
    app.get ("/todo/", auth.authenticateToken, async (req, res) => {
        results = await queries.getUserTasks(connection, req.user.user);
        res.send(results);
        res.status(201);
    });

    app.get (/todo\/:.+/, auth.authenticateToken, async (req, res) => {
        id = req.url.split(':')[1];
        results = await queries.getTaskById(connection, id);
        res.send(results);
        res.status(201);
    });

    app.put (/todo\/:.+/, auth.authenticateToken, async (req, res) => {
        id = req.url.split(':')[1];
        queries.updateTask(connection, id, req.body.title, req.body.description, req.body.status, req.body.due_time)
        res.json(req.body);
        res.status(201).send();
    });

    app.delete (/todo\/:.+/, auth.authenticateToken, async (req, res) => {
        id = req.url.split(':')[1];
        queries.deleteTask(connection, id);
        return res.status(201).json({
            msg: `successfully deleted record number: ${id}`,
        });
    });
}

module.exports = {todoRoutes};