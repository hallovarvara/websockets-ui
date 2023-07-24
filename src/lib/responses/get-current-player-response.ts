import { findGame } from '@/lib/utils/find-game';
import { DataTypeEnum } from '@/lib/types/data.type';

export const getCurrentPlayerResponse = (idGame: string) => {
  const game = findGame(idGame);

  return {
    type: DataTypeEnum.Turn,
    data: { currentPlayer: game && game.currentPlayer },
    id: 0,
  };
};
