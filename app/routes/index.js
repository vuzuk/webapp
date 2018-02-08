const express = require("express");
const Router = express.Router;
const route = Router();
const mailTransporter = require("./functions/configEmail");
const passport = require("./passport")(route);
const routes = {
    api: {
        admin: require("./admin"),
        auth: require("./auth")(passport, mailTransporter),
        secure: require("./secure"),
        unSecure: require("./unsecure")
    },
    react: require("./react")
};

route.use(function (req, res, next) {
    try {
        req.body = JSON.parse(Object.keys(req.body)[0]);
    } catch (err) {
        req.body = req.body;
    }
    next();
});

route.get('/api', function (req, res) {
    return res.json({status: true, msg: 'hey you! go ahead :)'});
});
route.use('/api/auth', routes.api.auth);
route.use('/api/secure', routes.api.secure);
route.use('/api/unsecure', routes.api.unSecure);
route.use('/', routes.react);
route.use('/images', express.static(process.env.APP_ROOT + "/app/db/uploads/images"));

module.exports = route;