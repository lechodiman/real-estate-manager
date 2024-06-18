import * as tableify from 'html-tableify';

interface Debt {
  name: string;
  amount: number;
}

interface EmailTableParams {
  title: string;
  debts: Debt[];
  totalDebt: number;
}

export function renderEmailTable({ title, debts, totalDebt }: EmailTableParams): string {
  const table = tableify(
    debts.map((debt) => ({ ...debt, amount: debt.amount.toString() })),
    {
      headers: [
        { name: 'name', align: 'left' },
        { name: 'amount', align: 'left' },
      ],
    }
  );

  return `
    <h1>${title}</h1>
    ${table}
    <p><strong>Total: ${totalDebt}</strong></p>
  `;
}
