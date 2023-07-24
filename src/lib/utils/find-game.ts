import { games, gamesSinglePlayer } from '@/lib/db';
import { GameT } from '@/lib/types/game.type';

export const findGame = (gameId: string): GameT | undefined =>
  games.find((game) => game.idGame === gameId) ??
  gamesSinglePlayer.find((game) => game.idGame === gameId);
