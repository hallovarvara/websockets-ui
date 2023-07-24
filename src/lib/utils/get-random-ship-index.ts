import { FIELD_SHIPS_NUMBER } from '@/lib/constants';

export const getRandomShipIndex = () =>
  Math.floor(Math.random() * FIELD_SHIPS_NUMBER);
