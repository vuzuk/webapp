const Router = require("express").Router;
const route = Router();
const randomString = require("randomstring");
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models.user;
const Blogger = models.blogger;
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.SALT);

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
            if(!user.isEmailVerified){
                return res.status(404).json({status: false, msg: "please verify email address " + user.email});
            }
            if(user.isBlogger) {
                if(!user.isContactVerified){
                    return res.status(404).json({status: false, msg: "please verify contact "+ user.contact});
                }
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
        let isBlogger = JSON.parse(req.body.isBlogger);
        let model_to_use = isBlogger ? Blogger : User;
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
                        emailVerfKey: randomString.generate(15),
                    },
                    logging: false
                })
                .spread((user, created) => {
                    if(!created) {
                        res.status(400).json({status: false, msg: "already signedUp"});
                    }
                    user.isBlogger = JSON.parse(req.body.isBlogger);
                    //send verification email and otp
                    // setup email data with unicode symbols
                    let emailLink = process.env.DOMAIN + "/api/auth/verification/verifyEmail?email=" + user.email + "&emailVerifKey=" + user.emailVerifKey+"&isBlogger="+isBlogger;
                    let mailOptions = {
                        from: process.env.ADMIN_EMAIL_ID, // sender address
                        to: user.email, // list of receivers
                        subject: 'verify vuzuk email', // Subject line
                        text: `click the link or copy paste in browser to verify vuzuk email id: ${emailLink}`, // plain text body
                    };

                    // send mail with defined transport object
                    process.env.mailTransporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: %s', info.messageId);
                        return res.status(200).json({status: true, msg: "verification mail sent"});
                    });
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(503).json({status: false, msg: "error in database"})
                });
        });
    });

    return route;
};
