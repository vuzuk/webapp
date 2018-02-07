const passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;
const bcrypt = require("bcrypt");
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
            signed_up_via: 'local'
        };

        model_to_use.findOne({
            where: whereObj,
            logging: false
        })
            .then(function (user_blogger) {
                if (!user_blogger) {
                    return done(null, false, {message: "invalid username"});
                }
                bcrypt.compare(password, user_blogger['password'], function(err, res) {
                    if(err){
                        return done(err);
                    }
                    if(res === false){
                        return done(null, false, {message: "invalid password"});
                    }
                    // res == true
                    user_blogger["isBlogger"] = isBlogger;
                    return done(null, user_blogger, {message: "success"});
                });
            })
            .catch(function (err) {
                return done(err);
            })
    });

module.exports = (passport) => {
    passport.use(ls);
};