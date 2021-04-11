require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['token'];
    const token = authHeader;

    if (token == null) {
        return res.status(403).json({
            msg: 'No token, authorization denied',
        });
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                msg: 'Token is not valid',
            });
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };