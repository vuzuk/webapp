const Router = require("express").Router;
const route = Router();
const randomString = require("randomstring");
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models.user;
const Blogger = models.blogger;
const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = (mailTransporter) => {
//query = {isBlogger, emailVerifKey, email}
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
                    return res.status(400).json({status: false, msg: "not found"});
                }
                obj[0]
                    .update({
                        isEmailVerified: true,
                        emailVerifKey: null
                    })
                    .then(() => {
                        if (!isBlogger) {
                            return res.status(200).json({status: true, msg: "email verified successfully"});
                        }
                        return res.redirect('/verify/phone', 200);
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
                    subject: 'verify vuzuk email', // Subject line
                    text: `click the link or copy paste in browser to verify vuzuk email id: ${emailLink}`, // plain text body
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

    //query = {isBlogger, otp, email}
    route.get('/verifyOTP', function (req, res, next) {
        let isBlogger = JSON.parse(req.query["isBlogger"]);
        let otp = parseInt(req.query["otp"]);
        let email = req.query["email"];
        let model_to_use = isBlogger ? Blogger : User;
        model_to_use
            .findAll({
                where: {
                    email: email,
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

    //query = {isBlogger, email}
    route.get('/resendOTP', function (req, res, next) {
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
