'use strict';
const nodemailer = require('nodemailer');
let aws = require('aws-sdk');

// configure AWS SDK
aws.config.loadFromPath('config.json');

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01'
    })
});

module.exports = transporter;