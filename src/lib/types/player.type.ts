import { ShipT } from './ship.type';
import { CellT } from './cell.type';
import { BotT } from './bot.type';

export type PlayerCredentialsT = { name: string; password: string };

export type PlayerT = {
  fieldShips: Array<Array<number | CellT>>;
  idGame: string;
  index: string;
  isSingleGame: boolean;
  name: string;
  roomId: string;
  ships: ShipT[];
  shipsAlive: number;
  startPosition: string;
  botInfo: BotT;
};
