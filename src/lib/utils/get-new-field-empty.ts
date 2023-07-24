import { CellT } from '@/lib/types/cell.type';
import { FIELD_SHIPS_NUMBER } from '@/lib/constants';

export const getNewFieldEmpty = (): Array<Array<number | CellT>> => {
  const arr = Array(FIELD_SHIPS_NUMBER).fill(0);
  return arr.map(() => [...arr]);
};
