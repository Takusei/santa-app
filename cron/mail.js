// eslint-disable-next-line import/no-extraneous-dependencies
import { schedule } from 'node-cron';
import mailer from '../lib/mailer';

const sendMail = () => {
  schedule('*/15 * * * * *', () => {
    console.log('Send mail every 15s');
    mailer.sendMessage();
    console.log('sented mails');
  });
};

export default { sendMail };
