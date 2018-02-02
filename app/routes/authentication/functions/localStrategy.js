const passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models.user;
const Blogger = models.blogger;

let ls = new LocalStrategy({
        usernameField: 'email_username_isBlogger',
        passwordField: 'password',
    },
    (email_username_isBlogger, password, done) => {
        console.log("Checking credentials");
        let arr = email_username_isBlogger.split(";");
        let isBlogger = JSON.parse(arr[1].toLowerCase());
        let model_to_use = isBlogger ? Blogger : User;
        let whereObj = {
            $or: [{
                email: arr[0]
            }, {
                username: arr[0]
            }],
            password: password,
            signed_up_via: 'local'
        };

        model_to_use.findOne({
            where: whereObj
        })
            .then(function (user_blogger) {
                if (!user_blogger) {
                    return done(null, false, {message: "invalid username or password"});
                }
                user_blogger["isBlogger"] = isBlogger;
                return done(null, user_blogger, {message: "success"});
            })
            .catch(function (err) {
                return done(err);
            })
    });

module.exports = (app, passport) => {
    passport.use(ls);

    //body = {email_username, password, isBlogger}
    app.post('/login/local', function (req, res, next) {
        req.body.email_username_isBlogger = req.body.email_username + ";" + (req.body.isBlogger ? "true" : "false");
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                console.log(err);
                return res.status(503).json({status: false, msg: "error in database"});
            }
            if (!user) {
                return res.status(404).json({status: false, msg: info.message});
            }
            req.login(user, function (err) {
                if (err) {
                    console.log(err);
                    return res.status(503).json({status: false, msg: "error in processing"});
                }
                return res.redirect("/", 200);
            })
        })(req, res, next);
    });

    //body = {email, username, password, first_name, last_name, dob, gender, contact, isBlogger}
    app.post('/signUp/local', function (req, res) {
        let model_to_use = JSON.parse(req.body.isBlogger) ? Blogger : User;
        model_to_use
            .findOrCreate({
                where: {
                    email: req.body.email,
                    password: req.body.password,
                },
                defaults: {
                    username: req.body.username,
                    first_name: req.body.first_name,
                    last_name: req.body.name.last_name,
                    dob: req.body.dob,
                    gender: req.body.gender,
                    contact: req.body.contact,
                    signed_up_via: 'local',
                }
            })
            .spread((user, created) => {
                user.isBlogger = JSON.parse(req.body.isBlogger);
                req.login(user, function (err) {
                    if (err) {
                        console.log(err);
                        return res.status(503).json({status: false, msg: "error in processing"});
                    }
                    return res.redirect("/", 200);
                })
            })
            .catch((err) => {
                console.log("hi");
                return res.status(503).json({status: false, msg: "error in database"})
            })
    })
};