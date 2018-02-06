const Router = require("express").Router;
const route = Router();
const passport = require("./passport")(route);
const routes = {
    api: {
        auth: require("./auth")(passport),
        secure: require("./secure"),
        unSecure: require("./unsecure")
    },
    react: require("./react")
};

route.get('/api', function (req, res) {
    res.send('hey you! go ahead :)');
});
route.use('/api/auth', routes.api.auth);
route.use('/api/secure', routes.api.secure);
route.use('/api/unsecure', routes.api.unSecure);
route.use('/', routes.react);

module.exports = route;