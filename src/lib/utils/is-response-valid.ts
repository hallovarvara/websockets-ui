import { RESPONSE_FIELDS } from '@/lib/constants';

export const isResponseValid = (response: unknown) =>
  response &&
  typeof response === 'object' &&
  Object.keys(response).every((key) => RESPONSE_FIELDS.includes(key));
