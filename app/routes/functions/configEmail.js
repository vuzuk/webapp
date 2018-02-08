'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.ADMIN_EMAIL_HOST,
    port: parseInt(process.env.ADMIN_EMAIL_PORT),
    secure: parseInt(process.env.ADMIN_EMAIL_PORT) === 465, // true for 465, false for other ports
    auth: {
        user: process.env.ADMIN_EMAIL_USER, // generated ethereal user
        pass: process.env.ADMIN_EMAIL_PASS  // generated ethereal password
    }
});

process.env["mailTransporter"] = transporter;

module.exports = transporter;