import { DataTypeEnum } from '@/lib/types/data.type';
import { GameT } from '@/lib/types/game.type';

export const getGameFinishResponse = (game: GameT) => ({
  type: DataTypeEnum.GameFinish,
  data: { winPlayer: game.gameWinner },
  id: 0,
});
