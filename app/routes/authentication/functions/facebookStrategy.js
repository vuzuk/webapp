const passportFacebook = require('passport-facebook');
const FacebookStrategy = passportFacebook.Strategy;
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models.user;
const Blogger = models.blogger;

let fs = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://" + process.env.DOMAIN + "/login/facebook/callback"
}, function (accessToken, refreshToken, profile, done) {
    
});

module.exports = (app, passport) => {
    passport.use(fs);
    app.post('/login/facebook', {});
    app.post('/login/facebook/callback', {});
};