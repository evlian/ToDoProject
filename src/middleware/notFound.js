
function routeNotFound(req, res, next) {
    return res.status(404).send("URL Not Found.");
}

module.exports = {routeNotFound}