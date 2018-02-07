const Router = require("express").Router;
const route = Router();
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models.user;
const Blogger = models.blogger;
const bcrypt = require('bcrypt');
const salt = JSON.parse(process.env.SALT);

module.exports = (passport) => {

    //body = {email_username, password, isBlogger}
    route.post('/login', function (req, res, next) {
        req.body.email_username_isBlogger = req.body.email_username + ";" + (JSON.parse(req.body.isBlogger) ? "true" : "false");
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
    })

    //body = {email, username, password, first_name, last_name, dob, gender, contact, isBlogger}
    route.post('/signUp', function (req, res) {
        let model_to_use = JSON.parse(req.body.isBlogger) ? Blogger : User;
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) {
                console.log(err);
                return res.status(503).json({status: false, msg: "error in processing"});
            }
            req.body.password = hash;
            model_to_use
                .findOrCreate({
                    where: {
                        email: req.body.email,
                    },
                    defaults: {
                        username: req.body.username,
                        password: req.body.password,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        dob: req.body.dob,
                        gender: req.body.gender.toUpperCase(),
                        contact: req.body.contact,
                        signed_up_via: 'local',
                    },
                    logging: false
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
                    console.log(err);
                    return res.status(503).json({status: false, msg: "error in database"})
                })
        });
    });

    return route;
};
