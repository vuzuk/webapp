const Router = require("express").Router;
const route = Router();
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models.user;
const Blogger = models.blogger;

module.exports = (passport) => {

    route.get('/login', passport.authenticate('facebook', {
        scope: ['public_profile', 'email', 'user_birthday',]
    }));
    route.get('/login/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

    return route;
};
