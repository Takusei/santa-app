// eslint-disable-next-line import/no-extraneous-dependencies
import { schedule } from 'node-cron';
import sendMessage from '../lib/mailer';

const sendMail = () => {
  schedule('*/15 * * * * *', () => {
    console.log('Send mail every 15s');
    sendMessage();
  });
};

export default { sendMail };
