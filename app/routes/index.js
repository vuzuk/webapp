const Router = require("express").Router;
const route = Router();
passport = require("./authentication")(route);
const models = require("../db/models");

const routes = {
    api: {
        secure: require("./secure"),
        unSecure: require("./unsecure")
    },
    react: require("./react")
};

route.get('/api', function (req, res) {
    res.send('hey you! go ahead :)');
});
route.use('/api/secure', routes.api.secure);
route.use('/api/unsecure', routes.api.unSecure);
route.use('/', routes.react);

module.exports = route;