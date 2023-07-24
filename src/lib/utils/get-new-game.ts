import { GameStageEnum, GameT } from '@/lib/types/game.type';
import { PlayerT } from '@/lib/types/player.type';

export const getNewGame = ({
  currentPlayer = '',
  gameUsers,
  idGame,
  stage = GameStageEnum.Prepare,
}: {
  currentPlayer?: string;
  gameUsers: PlayerT[];
  idGame: string;
  stage?: GameStageEnum;
}): GameT => ({
  stage,
  idGame,
  gameUsers,
  currentPlayer,
  gameWinner: '',
});
