import WebSocket, { WebSocketServer } from 'ws';
import {
  DataTypeEnum,
  ResponseAttackT,
  ResponseT,
} from '@/lib/types/data.type';
import { WebSocketClientT } from '@/lib/types/websocket-client.type';
import { isAttackDataValid } from '@/lib/utils/is-attack-data-valid';
import { getErrorResponse } from '@/lib/responses/get-error-response';
import { getCurrentPlayerResponse } from '@/lib/responses/get-current-player-response';
import { isGameFinished } from '@/lib/utils/is-game-finished';
import { findGame } from '@/lib/utils/find-game';
import { getRoomsResponse } from '@/lib/responses/get-rooms-response';
import { handleAttack } from '@/lib/modules/handle-attack';
import { updateWinners } from '@/lib/modules/update-winners';
import { handlePositions } from '@/lib/utils/handle-positions';
import { handleSinglePlayerGameAttack } from '@/lib/modules/handle-single-player-game-attack';
import { stringify } from '@/lib/utils/stringify';

export const attack = ({
  response,
  wsClient,
  wsServer,
}: {
  response: ResponseT;
  wsClient: WebSocketClientT;
  wsServer: WebSocketServer;
}) => {
  const clients = wsServer.clients as Set<WebSocketClientT>;

  const type =
    response.type === DataTypeEnum.Attack
      ? DataTypeEnum.Attack
      : DataTypeEnum.AttackRandom;

  if (!isAttackDataValid({ type: response.type, response })) {
    wsClient.send(stringify(getErrorResponse({ type })));
    return;
  }

  const attack = handleAttack({ ...(response as ResponseAttackT).data, type });

  // @ts-ignore
  if (typeof attack === 'object' && attack.error) {
    wsClient.send(stringify({ ...attack, type }));
    return;
  }

  let count = 1;

  clients.forEach((client) => {
    if (
      client.readyState === WebSocket.OPEN &&
      client.playerInfo &&
      client.playerInfo.idGame === wsClient.playerInfo.idGame
    ) {
      if (typeof attack === 'string') {
        client.send(attack);
      } else if (typeof attack === 'object' && 'currentPlayer' in attack) {
        handlePositions({ attack, client, type });
      }

      const gameId = client.playerInfo.idGame;

      client.send(stringify(getCurrentPlayerResponse(gameId)));

      if (isGameFinished(gameId)) {
        client.send(stringify(findGame(gameId)));
        client.send(stringify(getRoomsResponse()));

        if (count === 2) {
          count = 1;
          updateWinners(wsServer);
        } else {
          if (client.playerInfo.isSingleGame) {
            client.playerInfo.isSingleGame = false;
            updateWinners(wsServer);
            return;
          }

          count++;
        }
      }

      if (client.playerInfo.isSingleGame) {
        handleSinglePlayerGameAttack({ client, type });
      }
    }
  });
};
