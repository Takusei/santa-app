// eslint-disable-next-line import/no-extraneous-dependencies
import { createTransport } from 'nodemailer';
import { pendingWishes } from './sharedData';

// require('dotenv').config();

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  secure: true,
});

/**
 * Returns a Message header for the mail
 *
 */
const createMessageHeader = () => ({
  from: 'do_not_reply@northpole.com',
  to: 'santa@northpole.com',
  subject: 'Pending Wishes!',
});

/**
 * Returns a Message text for the mail
 *
 */
const createMessageText = () => {
  const strWishes = pendingWishes.map((wish) => Object.keys(wish).map((key) => ` ${wish[key]}`).join(',')).join('\n');
  console.log('🚀 ~ file: mailer.js:38 ~ createMessageText ~ strWishes:', strWishes);
  return `
    Dear Santa,

        You have following pending wishes to be granted! Hurry!

        ${strWishes}
    `;
};

/**
 * Uses nodemailer sendMail functionality to send message via SMTP
 *
 */
const invokeSend = (msg) => transporter.sendMail(msg);

/**
 * Mail function that creates message header and body
 * then send it to the Email
 */
const sendMessage = () => {
  if (!pendingWishes.length) return;
  try {
    let message = {};

    const messageHeader = createMessageHeader();
    const text = createMessageText();

    message = { ...messageHeader, text };
    console.log('🚀 ~ file: mailer.js:58 ~ sendMessage ~ message:', message);
    invokeSend(message);
  } catch (e) {
    console.log(e);
  }
};
console.log('🚀 ~ file: mailer.js:67 ~ sendMessage ~ pendingWishes:', pendingWishes);

export default { sendMessage };
