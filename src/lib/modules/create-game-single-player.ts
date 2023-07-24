import WebSocket from 'ws';
import { GameStageEnum } from '@/lib/types/game.type';
import { WebSocketClientT } from '@/lib/types/websocket-client.type';
import { bot } from '@/lib/bot';
import { gamesSinglePlayer } from '@/lib/db';
import { randomUUID } from 'node:crypto';
import { getNewPlayer } from '@/lib/utils/get-new-player';
import { getNewField } from '@/lib/utils/get-new-field';
import { getRandomShipIndex } from '@/lib/utils/get-random-ship-index';
import { getNewGame } from '@/lib/utils/get-new-game';
import { getGameCreateResponse } from '@/lib/responses/get-game-create-response';
import { stringify } from '@/lib/utils/stringify';

export const createGameSinglePlayer = (wsClient: WebSocketClientT) => {
  if (wsClient.readyState !== WebSocket.OPEN || !wsClient.playerInfo) {
    return;
  }

  const idGame = randomUUID();
  const { index, name } = wsClient.playerInfo;

  const bot = getNewPlayer({
    name: 'botClient',
    fieldShips: getNewField(bot[getRandomShipIndex()]),
  });

  const game = getNewGame({
    currentPlayer: index,
    gameUsers: [bot, getNewPlayer({ name, index })],
    idGame,
    stage: GameStageEnum.Ready,
  });

  gamesSinglePlayer.push(game);

  wsClient.playerInfo.idGame = idGame;
  wsClient.playerInfo.isSingleGame = true;

  wsClient.playerInfo.botInfo = {
    name: bot.name,
    index: bot.index,
    idGame,
  };

  wsClient.send(stringify(getGameCreateResponse({ idGame, idPlayer: index })));
};
