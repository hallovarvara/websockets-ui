import { findGame } from '@/lib/utils/find-game';
import { GameStageEnum } from '@/lib/types/game.type';
import { winners } from '@/lib/db';
import { getNewWinner } from '@/lib/utils/get-new-winner';

export const isGameFinished = (gameId: string): boolean => {
  const game = findGame(gameId);

  if (game?.stage !== GameStageEnum.Finish) {
    return false;
  }

  const player = game.gameUsers.find(
    (user) => user.index === game.currentPlayer,
  );

  if (player && game.gameWinner === '') {
    game.gameWinner = player.index;

    const winner = winners.find(({ name }) => name === player.name);

    if (winner) {
      winner.wins++;
    } else {
      winners.push(getNewWinner(player.name));
    }
  }

  return true;
};
