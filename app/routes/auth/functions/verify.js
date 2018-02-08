const Router = require("express").Router;
const route = Router();
const randomString = require("randomstring");
const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models.user;
const Blogger = models.blogger;
const plivo = require('plivo');
const p = plivo.RestAPI({
    authId: process.env.PLIVO_AUTHID,
    authToken: process.env.PLIVO_AUTHTOKEN
});

module.exports = (passport) => {
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
                    res.status(400).json({status: false, msg: "not found"});
                }
                obj[0]
                    .update({
                        isEmailVerified: true,
                        emailVerifKey: null
                    })
                    .then(() => {
                        res.status(200).json({status: true, msg: "email verified successfully"});
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
                    res.status(400).json({status: false, msg: "not found"});
                }
                let user = obj[0];
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
                    res.status(400).json({status: false, msg: "not found"});
                }
                obj[0]
                    .update({
                        isContactVerified: true,
                        otp: null
                    })
                    .then(() => {
                        res.status(200).json({status: true, msg: "contact verified successfully"});
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
                    res.status(400).json({status: false, msg: "not found"});
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
                        var params = {
                            'src': parseInt(process.env.ADMIN_CONTACT), // Sender's phone number with country code
                            'dst' : user.contact, // Receiver's phone Number with country code
                            'text' : "Hi, your otp for vuzuk id is " + otp, // Your SMS Text Message - English
                        };

                        // Prints the complete response
                        p.send_message(params, function (status, response) {
                            console.log('Status: ', status);
                            console.log('API Response:\n', response);
                            if(status !== 202){
                                return res.status(503).json({status: false, msg: "error in sending otp"})
                            }
                            return res.status(200).json({status: true, msg: "otp sent"});
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
