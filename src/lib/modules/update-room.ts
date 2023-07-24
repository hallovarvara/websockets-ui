import { rooms } from '@/lib/db';

export const updateRoom = (roomId: string): void => {
  const roomIndex = rooms.findIndex((room) => room.roomId === roomId);

  if (roomIndex !== -1) {
    rooms.splice(roomIndex, 1);
  }
};
