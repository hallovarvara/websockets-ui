import { DataTypeEnum } from '@/lib/types/data.type';
import { rooms } from '@/lib/db';

export const getRoomsResponse = () => ({
  type: DataTypeEnum.RoomUpdate,
  data: rooms,
  id: 0,
});
