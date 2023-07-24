import { handleAttack } from '@/lib/modules/handle-attack';
import { handlePositions } from '@/lib/utils/handle-positions';
import { getCurrentPlayerResponse } from '@/lib/responses/get-current-player-response';
import { isGameFinished } from '@/lib/utils/is-game-finished';
import { findGame } from '@/lib/utils/find-game';
import { getRoomsResponse } from '@/lib/responses/get-rooms-response';
import { stringify } from '@/lib/utils/stringify';
import { DataTypeEnum } from '@/lib/types/data.type';
import { WebSocketClientT } from '@/lib/types/websocket-client.type';

export const handleSinglePlayerGameAttack = ({
  client,
  type,
}: {
  client: WebSocketClientT;
  type: DataTypeEnum.Attack | DataTypeEnum.AttackRandom;
}) => {
  const { index, idGame } = client.playerInfo.botInfo;

  setTimeout(() => {
    const attack = handleAttack({
      gameId: idGame,
      indexPlayer: index,
      type: DataTypeEnum.AttackRandom,
    });

    if (typeof attack === 'string') {
      client.send(attack);
    } else if (typeof attack === 'object' && 'currentPlayer' in attack) {
      handlePositions({ attack, client, type });
    }

    const gameId = client.playerInfo.idGame;

    client.send(stringify(getCurrentPlayerResponse(gameId)));

    if (isGameFinished(gameId)) {
      client.send(stringify(findGame(gameId)));
      client.playerInfo.isSingleGame = false;
      client.send(stringify(getRoomsResponse()));
    }
  }, 1000);
};
