import { utilitiesFunctions } from './fetchers';

export async function getDebts(accountNumbers: Record<string, string>) {
  const debts = await Promise.all(
    Object.entries(accountNumbers).map(async ([utility, accountNumber]) => {
      const debt = await utilitiesFunctions[utility](accountNumber);

      return { name: utility, amount: debt };
    })
  );

  const totalDebt = debts.map((debt) => debt.amount).reduce((a, b) => a + b, 0);

  return { debts, totalDebt };
}
