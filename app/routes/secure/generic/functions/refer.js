const Op = require("sequelize").Op;
const models = require(process.env.APP_ROOT + "/app/db/models");
const mailTransporter = require(process.env.APP_ROOT + "/app/routes/functions/configEmail");

module.exports = (req, res) => {
    let username = req.query["username"];
    let email = req.query["email"];
    let blogger_reader = req.query['blogger_reader']

    //send email
    // setup email data with unicode symbols
    let emailText = `login to www.vuzuk.com/${blogger_reader}/signup/${username}/${req['user']['isBlogger'] ? 'blogger' : 'user'}`;
    let mailOptions = {
        from: process.env.ADMIN_EMAIL_ID, // sender address
        // to: process.env.ADMIN_EMAIL_ID, // list of receivers
        to: email, // list of receivers
        subject: 'Vuzuk Referral Mail', // Subject line
        text: emailText, // plain text body
    };

    // send mail with defined transport object
    mailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(503).json({status: false, msg: "error in sending mail"});
        }
        console.log('Message sent: %s', info.messageId);
        return res.status(200).json({status: true, msg: "Message Sent"});
    });
};