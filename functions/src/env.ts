import { defineString } from 'firebase-functions/params';

export const ENV = {
  mailerEmail: defineString('MAILER_EMAIL'),
  mailerPassword: defineString('MAILER_PASSWORD'),
};
