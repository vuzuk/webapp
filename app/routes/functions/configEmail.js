'use strict';
const nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(sesTransport({
    accessKeyId: process.env.ADMIN_EMAIL_USER,
    secretAccessKey: process.env.ADMIN_EMAIL_PASS,
    rateLimit: 5
}));

module.exports = transporter;