import { WebSocketServer } from 'ws';
import { games, rooms } from '@/lib/db';
import {
  ERROR_MESSAGE_INVALID_DATA,
  ERROR_MESSAGE_WAIT_FOR_RIVAL,
} from '@/lib/constants';
import {
  DataTypeEnum,
  ResponseT,
  ResponseUserAddToRoomT,
} from '@/lib/types/data.type';
import { WebSocketClientT } from '@/lib/types/websocket-client.type';
import { PlayerT } from '@/lib/types/player.type';
import { randomUUID } from 'node:crypto';
import { getNewGame } from '@/lib/utils/get-new-game';
import { getNewPlayer } from '@/lib/utils/get-new-player';
import { isClientValid } from '@/lib/utils/is-client-valid';
import { getRoomsResponse } from '@/lib/responses/get-rooms-response';
import { isUserAddToRoomDataValid } from '@/lib/utils/is-user-add-to-room-data-valid';
import { getErrorResponse } from '@/lib/responses/get-error-response';
import { getGameCreateResponse } from '@/lib/responses/get-game-create-response';
import { stringify } from '@/lib/utils/stringify';

export const createGame = ({
  response,
  wsClient,
  wsServer,
}: {
  response: ResponseT;
  wsClient: WebSocketClientT;
  wsServer: WebSocketServer;
}) => {
  if (!isUserAddToRoomDataValid(response as ResponseUserAddToRoomT)) {
    wsClient.send(
      stringify(
        getErrorResponse({
          type: DataTypeEnum.UserAddToRoom,
          errorText: ERROR_MESSAGE_INVALID_DATA,
        }),
      ),
    );

    return;
  }

  if (
    wsClient.playerInfo.roomId ===
    (response as ResponseUserAddToRoomT).data.indexRoom
  ) {
    wsClient.send(
      stringify(
        getErrorResponse({
          type: DataTypeEnum.UserAddToRoom,
          errorText: ERROR_MESSAGE_WAIT_FOR_RIVAL,
        }),
      ),
    );

    return;
  }

  const { indexRoom } = (response as ResponseUserAddToRoomT).data;
  const { index, name } = wsClient.playerInfo;
  const idGame = randomUUID();

  wsClient.playerInfo = {
    ...wsClient.playerInfo,
    roomId: indexRoom,
    idGame,
  };

  const room = rooms.find((room) => room.roomId === indexRoom);

  room?.roomUsers.push(getNewPlayer({ index, name }));

  const gameUsers = [...(room?.roomUsers as PlayerT[])];

  games.push(getNewGame({ idGame, gameUsers }));

  gameUsers.forEach((user) => {
    rooms.splice(
      rooms.findIndex(
        (room) =>
          room.roomUsers.find(
            (userInOtherRoom) => userInOtherRoom.index === user.index,
          )?.index === user.index,
      ),
      1,
    );
  });

  (wsServer.clients as Set<WebSocketClientT>).forEach((client) => {
    if (isClientValid(client)) {
      if (client.playerInfo.roomId === wsClient.playerInfo.roomId) {
        client.playerInfo.idGame = wsClient.playerInfo.idGame;
        client.send(stringify(getRoomsResponse()));

        const { index: idPlayer, idGame } = client.playerInfo;
        client.send(stringify(getGameCreateResponse({ idGame, idPlayer })));

        return;
      }

      client.send(stringify(getRoomsResponse()));
    }
  });
};
