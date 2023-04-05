// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const { sendMail } = require('../cron/mail').default;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

sendMail();

module.exports = app;
