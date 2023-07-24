import { rooms } from '../db';

export const isRoomExisting = (index?: string) =>
  index &&
  rooms.length > 0 &&
  rooms.find(
    (room) =>
      room.roomUsers.find((user) => user.index === index)?.index === index,
  );
