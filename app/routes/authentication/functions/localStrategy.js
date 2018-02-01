const passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models.user;
const Blogger = models.blogger;

let ls = new LocalStrategy({
        usernameField: 'email_username',
        passwordField: 'password',
    },
    (email_username, password, done) => {
        console.log("Checking credentials");
        User.findOne({
            where: {
                $or: [{
                    email: email_username
                }, {
                    username: email_username
                }],
                password: password
            }
        })
            .then(function (user) {
                if (user) {
                    user["isUser"] = true;
                    return done(null, user, {message: "success"});
                }
                Blogger.findOne({
                    where: {
                        $or: [{
                            email: email_username
                        }, {
                            username: email_username
                        }],
                        password: password
                    }
                })
                    .then(function (blogger) {
                        if (!blogger) {
                            return done(null, false, {message: "invalid username or password"});
                        }
                        blogger["isUser"] = false;
                        return done(null, blogger, {message: "success"});
                    })
                    .catch(function (err) {
                        return done(err);
                    })
            })
            .catch(function (err) {
                return done(err);
            })
    });

module.exports = ls;