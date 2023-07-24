import { RawData, WebSocketServer } from 'ws';
import { WebSocketClientT } from '@/lib/types/websocket-client.type';
import { DataTypeEnum } from '@/lib/types/data.type';
import { isResponseValid } from '@/lib/utils/is-response-valid';
import { parseRawResponseData } from '@/lib/utils/parse-raw-response-data';
import { updateRoom } from '@/lib/modules/update-room';
import { getRoomsResponse } from '@/lib/responses/get-rooms-response';
import { finishGame } from '@/lib/modules/finish-game';
import { registerUser } from '@/lib/modules/register-user';
import { createRoom } from '@/lib/modules/create-room';
import { createGame } from '@/lib/modules/create-game';
import { addShips } from '@/lib/modules/add-ships';
import { attack } from '@/lib/modules/attack';
import { createGameSinglePlayer } from '@/lib/modules/create-game-single-player';
import { getErrorResponse } from '@/lib/responses/get-error-response';
import { stringify } from '@/lib/utils/stringify';
import { isClientValid } from '@/lib/utils/is-client-valid';

export class WebSocketChild {
  public wsClient?: WebSocketClientT;
  public wsServer: WebSocketServer;

  constructor(wsServer: WebSocketServer) {
    this.wsServer = wsServer;
  }

  public connect(wsClient: WebSocketClientT): void {
    this.wsClient = wsClient;
    wsClient.on('error', console.error);
    wsClient.on('message', this.message);
    wsClient.on('close', this.disconnect);
  }

  private message = (rawData: RawData): void => {
    const response = parseRawResponseData(rawData);
    const { wsClient, wsServer } = this;

    console.log(JSON.stringify(response));

    if (!isResponseValid(response) || !wsClient || !wsServer) {
      wsClient?.send(stringify(getErrorResponse({ type: response.type })));
      return;
    }

    switch (response.type) {
      case DataTypeEnum.UserRegister: {
        registerUser({ response, wsClient });
        break;
      }

      case DataTypeEnum.RoomCreate: {
        createRoom({ response, wsClient, wsServer });
        break;
      }

      case DataTypeEnum.UserAddToRoom: {
        createGame({ response, wsClient, wsServer });
        break;
      }

      case DataTypeEnum.ShipsAdd: {
        addShips({ response, wsClient, wsServer });
        break;
      }

      case DataTypeEnum.Attack:
      case DataTypeEnum.AttackRandom: {
        attack({ response, wsClient, wsServer });
        break;
      }

      case DataTypeEnum.SinglePlay: {
        createGameSinglePlayer(wsClient);
        break;
      }

      default: {
        wsClient?.send(
          stringify(
            getErrorResponse({
              type: response.type,
              errorText: `Unknown type of request: "${response.type}"`,
            }),
          ),
        );
      }
    }
  };

  private disconnect = (): void => {
    console.log('Disconnect WebSocket client');

    if (this.wsClient?.playerInfo) {
      const { index, roomId, idGame } = this.wsClient.playerInfo;

      if (roomId) {
        updateRoom(roomId);

        (this.wsServer.clients as Set<WebSocketClientT>).forEach((client) => {
          if (isClientValid(client)) {
            client.send(stringify(getRoomsResponse()));
          }
        });
      }

      if (idGame && index) {
        finishGame({
          gameId: idGame,
          indexPlayer: index,
          wsServer: this.wsServer,
        });
      }
    }
  };
}
