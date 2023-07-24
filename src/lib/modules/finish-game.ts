import { WebSocketServer } from 'ws';
import { games, winners } from '@/lib/db';
import { GameStageEnum } from '@/lib/types/game.type';
import { WebSocketClientT } from '@/lib/types/websocket-client.type';
import { getGameFinishResponse } from '@/lib/responses/get-game-finish-response';
import { isClientValid } from '@/lib/utils/is-client-valid';
import { getRoomsResponse } from '@/lib/responses/get-rooms-response';
import { updateWinners } from '@/lib/modules/update-winners';
import { stringify } from '@/lib/utils/stringify';

export const finishGame = ({
  gameId,
  indexPlayer,
  wsServer,
}: {
  gameId: string;
  indexPlayer: string;
  wsServer: WebSocketServer;
}) => {
  const game = games.find((game) => game.idGame === gameId);

  if (game) {
    game.stage = GameStageEnum.Finish;
    const winUser = game.gameUsers.find((user) => user.index !== indexPlayer);

    if (winUser && game.gameWinner === '') {
      const isWinUserExist = winners.find((user) => user.name === winUser.name);
      game.gameWinner = winUser.index;
      if (isWinUserExist) {
        isWinUserExist.wins++;
      } else {
        const winData = {
          name: winUser.name,
          wins: 1,
        };

        winners.push(winData);
      }
    }

    (wsServer.clients as Set<WebSocketClientT>).forEach((client) => {
      if (isClientValid(client) && client.playerInfo.idGame === gameId) {
        client.send(stringify(getGameFinishResponse(game)));
      }

      client.send(stringify(getRoomsResponse()));

      updateWinners(wsServer);
    });
  }
};
