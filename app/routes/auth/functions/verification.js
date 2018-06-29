const Sequelize = require('sequelize');
const Router = require("express").Router;
const route = Router();
const randomString = require("randomstring");
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models.user;
const Blogger = models.blogger;
const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
const bcrypt = require('bcrypt');

module.exports = (mailTransporter) => {
//query = {isBlogger, emailVerifKey, email, ref_username, ref_blogger}
    route.get('/verifyEmail', function (req, res, next) {
        let isBlogger = JSON.parse(req.query["isBlogger"]);
        let emailVerifKey = req.query["emailVerifKey"];
        let email = req.query["email"];

        let model_to_use = isBlogger ? Blogger : User;
        model_to_use
            .findAll({
                where: {
                    email: email,
                    emailVerifKey: emailVerifKey
                },
                limit: 1
            })
            .then(obj => {
                if (obj.length === 0) {
                    return isBlogger ? res.redirect('/blogger/login') : res.redirect('/reader/login');
                }
                obj[0]
                    .update({
                        isEmailVerified: true,
                        emailVerifKey: null,
                        referral_points: 20
                    })
                    .then(() => {
                        // return res.redirect('/verify/phone/?isBlogger=true');
                        // *************** BYPASSING PHONE VERIFICATION OF BLOGGER ***************

                        if (!req.query['ref_username']) {
                            return isBlogger ? res.redirect('/blogger/login') : res.redirect('/reader/login');
                        }

                        // incrementing referer points
                        let ref_username = req.query['ref_username'];
                        let ref_blogger = JSON.parse(req.query['ref_blogger']);
                        model_to_use = ref_blogger ? Blogger : User;
                        let pointIncCount = parseInt(process.env[(ref_blogger === "blogger" ? "BLOGGER" : "USER") + "_REFER_POINTS"])
                        model_to_use
                            .update({
                                    referral_points: Sequelize.literal('referral_points + ' + pointIncCount)
                                },
                                {
                                    where: {
                                        username: ref_username
                                    }
                                })
                            .then(() => {
                                return isBlogger ? res.redirect('/blogger/login') : res.redirect('/reader/login');
                            })
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.status(503).json({status: false, msg: "error in database"})
                    });
            })
            .catch((err) => {
                console.log(err);
                return res.status(503).json({status: false, msg: "error in database"})
            });
    });

    //query = {isBlogger, email}
    route.get('/resendEmail', function (req, res, next) {
        let isBlogger = JSON.parse(req.query["isBlogger"]);
        let email = req.query["email"];
        let model_to_use = isBlogger ? Blogger : User;
        model_to_use
            .findAll({
                where: {
                    email: email,
                },
                limit: 1
            })
            .then(obj => {
                if (obj.length === 0 || obj[0].isEmailVerified) {
                    return res.status(400).json({status: false, msg: "not found"});
                }
                let user = obj[0];
                let emailLink = "http://" + process.env.DOMAIN + "/api/auth/verification/verifyEmail?email=" + user.email + "&emailVerifKey=" + user.emailVerifKey + "&isBlogger=" + isBlogger;
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
                return res.status(503).json({status: false, msg: "error in database"});
            });
    });

    //query = {isBlogger, email}
    route.get('/forgotPassword', function (req, res, next) {
        let isBlogger = JSON.parse(req.query["isBlogger"]);
        let email = req.query["email"];
        let model_to_use = isBlogger ? Blogger : User;
        model_to_use
            .findAll({
                where: {
                    email: email,
                },
                limit: 1
            })
            .then(obj => {
                if (obj.length === 0) {
                    return res.status(400).json({status: false, msg: "Email not found"});
                }
                if (!obj[0].isEmailVerified) {
                    return res.status(400).json({status: false, msg: "Email not verified"});
                }

                let user = obj[0];

                user
                    .update({emailVerifKey: randomString.generate(15)},
                        {logging: false})
                    .then(() => {
                        let emailLink = "http://" + process.env.DOMAIN + "/reset-password/?email="
                            + user.email + "&emailVerifKey=" + user.emailVerifKey + "&isBlogger=" + isBlogger;
                        let mailOptions = {
                            from: process.env.ADMIN_EMAIL_ID, // sender address
                            to: user.email, // list of receivers
                            subject: 'Reset Password', // Subject line
                            text: `Click this link or copy paste in browser to reset password: ${emailLink}`, // plain text body
                        };

                        // send mail with defined transport object
                        mailTransporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                                return res.status(503).json({status: false, msg: "error in sending mail"});
                            }
                            console.log('Message sent: %s', info.messageId);
                            return res.status(200).json({status: true, msg: "password reset link sent on mail"});
                        });
                    })
            })
            .catch((err) => {
                console.log(err);
                return res.status(503).json({status: false, msg: "error in database"});
            });
    });

    //body = {isBlogger, emailVerifKey, email, password}
    route.post('/resetPassword', function (req, res, next) {
        let isBlogger = JSON.parse(req.body["isBlogger"]);
        let emailVerifKey = req.body["emailVerifKey"];
        let email = req.body["email"];
        let password = req.body["password"];

        let model_to_use = isBlogger ? Blogger : User;
        model_to_use
            .findAll({
                where: {
                    email: email,
                    emailVerifKey: emailVerifKey
                },
                limit: 1
            })
            .then(obj => {
                if (obj.length === 0) {
                    return isBlogger ? res.status(200).send({location: '/blogger/login'}) : res.status(200).send({location: '/reader/login'});
                }

                bcrypt.hash(password, parseInt(process.env.SALT), function (err, hash) {
                    if (err) {
                        console.log(err);
                        return res.status(503).json({status: false, msg: "error in processing"});
                    }
                    password = hash;
                    obj[0]
                        .update({
                            password: password,
                            emailVerifKey: null
                        })
                        .then(() => {
                            return isBlogger ? res.status(200).send({location: '/blogger/login'}) : res.status(200).send({location: '/reader/login'});
                        })
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(503).json({status: false, msg: "error in database"})
            });
    });

    //body = {isBlogger, otp, contact}
    route.post('/verifyOTP', function (req, res, next) {
        let isBlogger = JSON.parse(req.body["isBlogger"]);
        let otp = parseInt(req.body["otp"]);
        let contact = parseInt(req.body["contact"]);
        let model_to_use = isBlogger ? Blogger : User;
        model_to_use
            .findAll({
                where: {
                    contact: contact,
                    otp: otp
                },
                limit: 1
            })
            .then(obj => {
                if (obj.length === 0) {
                    return res.status(400).json({status: false, msg: "not found"});
                }
                obj[0]
                    .update({
                        isContactVerified: true,
                        otp: null
                    })
                    .then(() => {
                        return res.status(200).json({status: true, msg: "contact verified successfully"});
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.status(503).json({status: false, msg: "error in database"})
                    });
            })
            .catch((err) => {
                console.log(err);
                return res.status(503).json({status: false, msg: "error in database"})
            });
    });

    //query = {isBlogger, contact}
    route.get('/resendOTP', function (req, res, next) {
        let isBlogger = JSON.parse(req.query["isBlogger"]);
        let contact = parseInt(req.query["contact"]);
        let model_to_use = isBlogger ? Blogger : User;
        model_to_use
            .findAll({
                where: {
                    contact: contact,
                },
                limit: 1
            })
            .then(obj => {
                if (obj.length === 0 || obj[0].isContactVerified) {
                    return res.status(400).json({status: false, msg: "not found"});
                }
                let user = obj[0];
                // add the otp
                let otp = randomString.generate({
                    length: 8,
                    charset: 'numeric'
                });
                user
                    .update({
                        otp: otp
                    })
                    .then(() => {
                        //sending the otp
                        client.messages.create({
                            body: "Hi, your otp for vuzuk id is " + otp,
                            to: "+91" + user.contact,
                            from: "+" + process.env.TWILIO_ADMIN_CONTACT,
                        })
                            .then((message) => {
                                return res.status(200).json({status: true, msg: "otp sent"});
                            })
                            .catch(err => {
                                console.log(err);
                                return res.status(503).json({status: false, msg: "error in sending otp"})
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.status(503).json({status: false, msg: "error in database"})
                    });
            })
            .catch((err) => {
                console.log(err);
                return res.status(503).json({status: false, msg: "error in database"})
            });
    });

    return route;
};
