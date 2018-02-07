const express = require("express");
const Router = express.Router;
const route = Router();
const passport = require("./passport")(route);
const routes = {
    api: {
        admin: require("./admin"),
        auth: require("./auth")(passport),
        secure: require("./secure"),
        unSecure: require("./unsecure")
    },
    react: require("./react")
};

route.get('/api', function (req, res) {
    return res.json({status: true, msg: 'hey you! go ahead :)'});
});
route.use('/api/auth', routes.api.auth);
route.use('/api/secure', routes.api.secure);
route.use('/api/unsecure', routes.api.unSecure);
route.use('/', routes.react);
route.use('/images', express.static(process.env.APP_ROOT + "/app/db/uploads/images"));

module.exports = route;