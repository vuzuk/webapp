const passportFacebook = require('passport-facebook');
const FacebookStrategy = passportFacebook.Strategy;
var randomstring = require("randomstring");
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models.user;
const Blogger = models.blogger;

let fs = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://" + process.env.DOMAIN + "/login/facebook/user/callback"
}, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOrCreate({
        where: {
            email: profile.email,
        },
        defaults: {
            username: profile.displayName + randomstring.generate(7),
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            image: profile.photos[0],
            dob: profile.user_birthday,
            gender: profile.gender,
            contact: null,
            signed_up_via: profile.provider,
        }
    })
        .spread((user, created) => {
            user.isBlogger = false;
            return done(null, user)
        })
        .catch((err) => done(err))
});

module.exports = (app, passport) => {
    passport.use(fs);
    app.get('/login/facebook/user', passport.authenticate('facebook', {
        scope: ['public_profile', 'email', 'user_birthday',]
    }));
    app.post('/login/facebook/user/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/'
    }));
};