import { winners } from '@/lib/db';
import { DataTypeEnum, ResponseWinnersUpdateT } from '@/lib/types/data.type';

export const getWinnersResponse = (): ResponseWinnersUpdateT => ({
  type: DataTypeEnum.WinnersUpdate,
  data: winners,
  id: 0,
});
