import { SupportedUtilities, utilitiesFunctions } from './fetchers';

export async function getDebts(
  accountNumbers: Partial<Record<SupportedUtilities, string>>
) {
  const debts = await Promise.all(
    Object.entries(accountNumbers).map(async (entry) => {
      const [utility, accountNumber] = entry as [SupportedUtilities, string];

      const debt = await utilitiesFunctions[utility](accountNumber);

      return { name: utility, amount: debt };
    })
  );

  const totalDebt = debts.map((debt) => debt.amount).reduce((a, b) => a + b, 0);

  return { debts, totalDebt };
}
