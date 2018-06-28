const Router = require("express").Router;
const route = Router();
const randomString = require("randomstring");
const sequelize = require('sequelize');
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models.user;
const Blogger = models.blogger;
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.SALT);

module.exports = (passport, mailTransporter) => {
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
            if (!user.isEmailVerified) {
                return res.status(404).json({
                    status: false,
                    msg: "please verify your email address " + user.email,
                    notVerified: "email"
                });
            }
            if (user.isBlogger) {
                if (!user.isContactVerified) {
                    // *************** BYPASSING PHONE VERIFICATION OF BLOGGER ***************
                    // return res.status(404).json({status: false, msg: "please verify your contact " + user.contact, notVerified: "contact"});
                }
            }
            req.login(user, function (err) {
                if (err) {
                    console.log(err);
                    return res.status(503).json({status: false, msg: "error in processing"});
                }
                return res.status(200).json({status: true, msg: {username: user["username"], image: user["image"]}});
            })
        })(req, res, next);
    });

    //body = {email, username, password, first_name, last_name, dob, gender, contact, isBlogger, category, place
    // , ref_username, ref_blogger}
    route.post('/signUp', function (req, res) {
        let isBlogger = JSON.parse(req.body.isBlogger);
        let model_to_use = isBlogger ? Blogger : User;
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) {
                console.log(err);
                return res.status(503).json({status: false, msg: "error in processing"});
            }
            req.body.password = hash;
            let defaults = {
                username: req.body.username,
                password: req.body.password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                dob: req.body.dob,
                gender: req.body.gender.toUpperCase(),
                contact: req.body.contact,
                place: req.body.place,
                signed_up_via: 'local',
                emailVerifKey: randomString.generate(15),
            };
            if (isBlogger) {
                defaults['category'] = req.body.category
            }

            model_to_use
                .findOrCreate({
                    where: {
                        email: req.body.email,
                    },
                    defaults: defaults,
                    logging: false
                })
                .spread((user, created) => {
                    if (!created) {
                        return res.status(400).json({status: false, msg: "already signedUp"});
                    }
                    user.isBlogger = JSON.parse(req.body.isBlogger);
                    //send verification email and otp
                    // setup email data with unicode symbols
                    let emailLink = "http://" + process.env.DOMAIN + "/api/auth/verification/verifyEmail?email=" +
                        user.email + "&emailVerifKey=" + user.emailVerifKey + "&isBlogger=" + isBlogger;

                    // adding referer if available
                    let ref_username = req.body['ref_username'];
                    let ref_blogger = ref_username ? JSON.parse(req.body['ref_blogger']) : null;
                    if(ref_username){
                        emailLink += '&ref_username='+ref_username+'&ref_blogger='+ref_blogger;
                    }

                    let mailOptions = {
                        from: process.env.ADMIN_EMAIL_ID, // sender address
                        to: user.email, // list of receivers
                        subject: 'Verify Your Email', // Subject line
                        text: `Click this link or copy paste in browser to verify your Email id: ${emailLink}`, // plain text body
                    };

                    // send mail with defined transport object
                    mailTransporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                            return res.status(503).json({status: false, msg: "error in sending mail"});
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
