import nodemailer from 'nodemailer'
import { emailtempelet } from './emailTemplet.js';

export async function sendMail(options){


const transporter = nodemailer.createTransport({
  service:"outlook",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
  const info = await transporter.sendMail({
    from: `Fred Foo 👻" <${process.env.EMAIL}>`, // sender address
    to: options.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: emailtempelet(options.api), // html body
  });
  console.log("Message sent: %s", info.messageId);
}