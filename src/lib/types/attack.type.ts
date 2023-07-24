import { PositionT } from '@/lib/types/position.type';

export type AttackT = {
  aroundPositions: PositionT[];
  currentPlayer: string;
  killedPositions: PositionT[];
};
