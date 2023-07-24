import { ResponseUserAddToRoomT } from '@/lib/types/data.type';

export const isUserAddToRoomDataValid = ({ data }: ResponseUserAddToRoomT) =>
  data && typeof data === 'object' && data.indexRoom;
