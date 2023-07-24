import { RoomT } from '@/lib/types/room.type';
import { FIELD_SHIPS_NUMBER } from '@/lib/constants';

export const getNewRoom = ({
  index,
  name,
  roomId,
}: {
  index?: string;
  name?: string;
  roomId: string;
}): RoomT => ({
  roomId,
  roomUsers: [{ name, index, fieldShips: [], shipsAlive: FIELD_SHIPS_NUMBER }],
});
