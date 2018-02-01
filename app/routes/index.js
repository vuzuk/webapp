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


//request to login
route.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        // modify after this line to adapt to our database ************************
        // if (err) {
        //     console.log(err);
        //     return res.status(503).json({status: false, msg: "error in database"});
        // }
        // if (!user) {
        //     return res.status(404).json({status: false, msg: info['message']});
        // }
        // req.logIn(user, function (err) {
        //     if (err) {
        //         console.log(err);
        //         return res.status(503).json({status: false, msg: "error in database"});
        //     }
        //     return res.status(200).json({status: true, msg: info['message']});
        // });
    })(req, res, next);
});

module.exports = route;