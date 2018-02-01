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

module.exports = (app, passport) => {
    passport.use(ls);
    app.post('/login/local', function (req, res, next) {
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
    })
};