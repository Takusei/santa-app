// eslint-disable-next-line import/no-extraneous-dependencies
import { createTransport } from 'nodemailer';
import sharedData from './sharedData';

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  secure: true,
});

const createMessageHeader = () => ({
  from: 'do_not_reply@northpole.com',
  to: 'santa@northpole.com',
  subject: 'Pending Wishes!',
});

const createMessageText = () => {
  const strWishes = sharedData.pendingWishes.map((wish) => Object.keys(wish).map((key) => ` ${wish[key]}`).join(',')).join('\n');
  return `
    Dear Santa,

        You have following pending wishes to be granted! Hurry!

        ${strWishes}
    `;
};

const invokeSend = (msg) => transporter.sendMail(msg);

const sendMessage = () => {
  if (!sharedData.pendingWishes.length) return;
  try {
    let message = {};

    const messageHeader = createMessageHeader();
    const text = createMessageText();

    message = { ...messageHeader, text };
    invokeSend(message);
  } catch (e) {
    console.log(e);
  }
};

export default { sendMessage };
