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

      const tables = [];
      for (const { name, accounts } of PROPERTIES) {
        // sequentially on purpose
        const { debts, totalDebt } = await getDebts(accounts);
        const table = renderEmailTable({ title: name, debts, totalDebt });

        tables.push(table);
      }

      const html = tables.join('\n\n');

      logger.info('HTML:', html);

      await sendEmail(html);

      logger.info('Email sent successfully!');
    } catch (error) {
      logger.error('Error while sending email:', error);
    }
  }
);
