import { PlayerT } from './player.type';

export type RoomT = {
  roomId: string;
  roomUsers: Partial<PlayerT>[];
};
