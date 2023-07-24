import { ResponseT } from '../types/data.type';

export const parseResponseData = (response: ResponseT) =>
  typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
