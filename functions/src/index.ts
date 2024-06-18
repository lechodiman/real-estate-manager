import * as logger from 'firebase-functions/logger';
import { scheduler } from 'firebase-functions/v2';
import { renderEmailTable } from './presentation/email-presenter';
import { PROPERTIES } from './core/properties';
import { sendEmail } from './application/send-email';
import { getDebts } from './core/debts';

export const weeklyJob = scheduler.onSchedule(
  { timeoutSeconds: 180, schedule: 'every sunday 00:00' },
  async (context) => {
    try {
      logger.info('Sending email...');

      const tables = await Promise.all(
        PROPERTIES.map(async ({ name, accounts }) => {
          const { debts, totalDebt } = await getDebts(accounts);

          return renderEmailTable({ title: name, debts, totalDebt });
        })
      );

      const html = tables.join('\n\n');

      logger.info('HTML:', html);

      await sendEmail(html);

      logger.info('Email sent successfully!');
    } catch (error) {
      logger.error('Error while sending email:', error);
    }
  }
);
