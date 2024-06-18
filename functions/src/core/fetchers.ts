import axios from 'axios';

const baseUrl = 'https://real-estate-bills-api.fly.dev';

type UtilityBillFetcher = (accountNumber: string) => Promise<number>;

const getAguasAndinas: UtilityBillFetcher = async (accountNumber) => {
  const response = await axios.get(
    `${baseUrl}/api/aguas-andinas?accountNumber=${accountNumber}`
  );
  return response.data.totalDebt;
};

const getMetrogas: UtilityBillFetcher = async (accountNumber) => {
  const response = await axios.get(
    `${baseUrl}/api/metrogas?accountNumber=${accountNumber}`
  );
  return response.data.totalDebt;
};

const getEnel: UtilityBillFetcher = async (accountNumber) => {
  const response = await axios.get(`${baseUrl}/api/enel?accountNumber=${accountNumber}`);
  return response.data.totalDebt;
};

const getComunidadFeliz: UtilityBillFetcher = async (accountNumber) => {
  const response = await axios.get(
    `${baseUrl}/api/comunidad-feliz?accountNumber=${accountNumber}`
  );
  return response.data.totalDebt;
};

const getEdifito: UtilityBillFetcher = async (_) => {
  const response = await axios.get(`${baseUrl}/api/edifito`);
  return response.data.totalDebt;
};

const SUPPORTED_UTILITIES = [
  'Aguas Andinas',
  'Enel',
  'Metrogas',
  'Comunidad Feliz',
  'Edifito',
] as const;

export type SupportedUtilities = (typeof SUPPORTED_UTILITIES)[number];

export const utilitiesFunctions: Record<SupportedUtilities, UtilityBillFetcher> = {
  'Aguas Andinas': getAguasAndinas,
  Enel: getEnel,
  Metrogas: getMetrogas,
  'Comunidad Feliz': getComunidadFeliz,
  Edifito: getEdifito,
} as const;
