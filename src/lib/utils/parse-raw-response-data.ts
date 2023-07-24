import { RawData } from 'ws';

export const parseRawResponseData = (rawData: RawData) =>
  JSON.parse(rawData.toString());
