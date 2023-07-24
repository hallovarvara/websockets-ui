import { PositionT } from '@/lib/types/position.type';
import { DataTypeEnum } from '@/lib/types/data.type';

export const getAttackResponse = ({
  index,
  position,
  status,
  type,
}: {
  index: string;
  position: PositionT;
  status: string;
  type: DataTypeEnum.Attack | DataTypeEnum.AttackRandom;
}) => ({
  id: 0,
  data: { position, currentPlayer: index, status },
  type,
});
