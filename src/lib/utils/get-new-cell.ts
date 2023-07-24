import { CellStatusEnum, CellT } from '@/lib/types/cell.type';
import { ShipT } from '@/lib/types/ship.type';

export const getNewCell = ({ length, type, position }: ShipT): CellT => ({
  type,
  length,
  health: length,
  shots: [],
  startPosition: position,
  missAroundPosition: [],
  status: CellStatusEnum.Alive,
});
