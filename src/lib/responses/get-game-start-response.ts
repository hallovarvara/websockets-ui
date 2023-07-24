import { ShipT } from '@/lib/types/ship.type';
import { DataTypeEnum } from '@/lib/types/data.type';

export const getGameStartResponse = ({
  indexPlayer,
  ships,
}: {
  indexPlayer: string;
  ships?: ShipT[];
}) => ({
  type: DataTypeEnum.GameStart,
  data: { ships, currentPlayerIndex: indexPlayer },
  id: 0,
});
