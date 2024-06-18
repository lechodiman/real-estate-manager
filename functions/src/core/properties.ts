import { SupportedUtilities } from './fetchers';

type Property = {
  name: string;
  accounts: Partial<Record<SupportedUtilities, string>>;
};

export const PROPERTIES: Property[] = [
  {
    name: 'Toro Mazote',
    accounts: {
      'Aguas Andinas': '2887922',
      Enel: '3611388-K',
      Edifito: '',
    },
  },
  {
    name: 'San Petersburgo',
    accounts: {
      'Aguas Andinas': '2694545',
      Enel: '3374022-0',
      Metrogas: '901489040',
      'Comunidad Feliz': '1508931',
    },
  },
];
