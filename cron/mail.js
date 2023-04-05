// eslint-disable-next-line import/no-extraneous-dependencies
const cron = require('node-cron');
const mailer = require('../lib/mailer');

const sendMail = () => {
  cron.schedule('*/15 * * * * *', () => {
    console.log('running a task every 15s');
    mailer.sendMessage();
  });
};
// Schedule tasks to be run on the server.
module.exports = { sendMail };
