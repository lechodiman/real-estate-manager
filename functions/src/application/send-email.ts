import * as nodemailer from 'nodemailer';
import { ENV } from '../env';

export async function sendEmail(message: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com', // hostname
    port: 587, // port for secure SMTP
    auth: {
      user: ENV.mailerEmail.value(),
      pass: ENV.mailerPassword.value(),
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });

  await transporter.sendMail({
    from: `Luis Chodiman <lechodiman@uc.cl>`,
    to: 'lechodiman@uc.cl',
    subject: 'Nuevo informe de Real Estate Manager',
    html: message,
  });
}
