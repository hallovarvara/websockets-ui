import WebSocket, { WebSocketServer } from 'ws';
import {
  DataTypeEnum,
  ResponseShipsAddT,
  ResponseT,
} from '@/lib/types/data.type';
import { GameStageEnum } from '@/lib/types/game.type';
import { WebSocketClientT } from '@/lib/types/websocket-client.type';
import { games, gamesSinglePlayer } from '@/lib/db';
import { ERROR_MESSAGE_INVALID_DATA } from '@/lib/constants';
import { getGameStartResponse } from '@/lib/responses/get-game-start-response';
import { getErrorResponse } from '@/lib/responses/get-error-response';
import { getNewField } from '@/lib/utils/get-new-field';
import { isShipsDataValid } from '@/lib/utils/is-ships-data-valid';
import { getCurrentPlayerResponse } from '@/lib/responses/get-current-player-response';
import { stringify } from '@/lib/utils/stringify';

export const addShips = ({
  response,
  wsClient,
  wsServer,
}: {
  response: ResponseT;
  wsClient: WebSocketClientT;
  wsServer: WebSocketServer;
}): any => {
  const { gameId, indexPlayer } = (response as ResponseShipsAddT).data;

  if (
    !isShipsDataValid(response.data) ||
    wsClient.playerInfo.idGame !== gameId
  ) {
    wsClient.send(stringify(getErrorResponse({ type: DataTypeEnum.ShipsAdd })));
    return;
  }

  const { index } = wsClient.playerInfo;

  const game =
    games.find((game) => game.idGame === gameId) ??
    gamesSinglePlayer.find((game) => game.idGame === gameId);

  if (game) {
    const { ships } = wsClient.playerInfo;
    const user = game.gameUsers.find((user) => user.index === indexPlayer);

    const fieldShips = getNewField(ships);
    wsClient.playerInfo.fieldShips = fieldShips;

    if (user) {
      user.fieldShips = fieldShips;
    }

    const responseGameStart = stringify(
      getGameStartResponse({ indexPlayer, ships }),
    );

    if (game.stage === GameStageEnum.Ready) {
      wsClient.playerInfo.startPosition = responseGameStart;
      game.stage = GameStageEnum.Start;
      wsClient.send(responseGameStart);

      (wsServer.clients as Set<WebSocketClientT>).forEach((client) => {
        if (
          client.readyState === WebSocket.OPEN &&
          client.playerInfo &&
          client.playerInfo.idGame === wsClient.playerInfo.idGame
        ) {
          client.send(client.playerInfo.startPosition);

          client.send(
            stringify(getCurrentPlayerResponse(client.playerInfo.idGame)),
          );
        }
      });

      return;
    }

    game.stage = GameStageEnum.Ready;
    game.currentPlayer = index;
    wsClient.playerInfo.startPosition = responseGameStart;

    return;
  }

  wsClient.send(
    stringify(
      getErrorResponse({
        type: DataTypeEnum.ShipsAdd,
        errorText: ERROR_MESSAGE_INVALID_DATA,
      }),
    ),
  );
};
