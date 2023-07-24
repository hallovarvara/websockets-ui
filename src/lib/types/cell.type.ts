import { ShipSizeEnum } from './ship.type';
import { PositionT } from './position.type';

export enum CellStatusEnum {
  Alive = 'alive',
  Shot = 'shot',
  Killed = 'killed',
  Miss = 'miss',
}

export type CellT = {
  health: number;
  length: number;
  missAroundPosition: PositionT[];
  shots: PositionT[];
  startPosition: PositionT;
  status: CellStatusEnum;
  type: ShipSizeEnum;
};
