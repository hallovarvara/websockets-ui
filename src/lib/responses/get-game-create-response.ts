import { DataTypeEnum } from '@/lib/types/data.type';

export const getGameCreateResponse = ({
  idGame,
  idPlayer,
}: {
  idGame: string;
  idPlayer: string;
}) => ({
  type: DataTypeEnum.GameCreate,
  data: { idGame, idPlayer },
  id: 0,
});
