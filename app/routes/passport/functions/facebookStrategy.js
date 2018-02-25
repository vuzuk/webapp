const passportFacebook = require('passport-facebook');
const FacebookStrategy = passportFacebook.Strategy;
var randomString = require("randomstring");
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models.user;

let fs = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://" + process.env.DOMAIN + "/api/auth/facebook/login/callback"
}, function (accessToken, refreshToken, profile, done) {
    return console.log("profile: ", profile);
    User.findOrCreate({
        where: {
            email: profile.email,
        },
        defaults: {
            username: profile.displayName + randomString.generate(7),
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            image: profile.photos[0],
            dob: profile.user_birthday,
            gender: profile.gender,
            contact: null,
            signed_up_via: profile.provider,
        },
        // logging: false
    })
        .spread((user, created) => {
            user.isBlogger = false;
            return done(null, user)
        })
        .catch((err) => done(err));
});

module.exports = (passport) => {
    passport.use(fs);
};