import { WebSocketServer } from 'ws';
import { WebSocketClientT } from '@/lib/types/websocket-client.type';
import { DataTypeEnum, ResponseT } from '@/lib/types/data.type';
import { ERROR_MESSAGE_ROOM_EXISTS } from '@/lib/constants';
import { rooms } from '@/lib/db';
import { randomUUID } from 'node:crypto';
import { getErrorResponse } from '@/lib/responses/get-error-response';
import { isRoomExisting } from '@/lib/utils/is-room-existing';
import { getRoomsResponse } from '@/lib/responses/get-rooms-response';
import { getNewRoom } from '@/lib/utils/get-new-room';
import { stringify } from '@/lib/utils/stringify';
import { isClientValid } from '@/lib/utils/is-client-valid';

export const createRoom = ({
  response,
  wsClient,
  wsServer,
}: {
  response: ResponseT;
  wsClient: WebSocketClientT;
  wsServer: WebSocketServer;
}) => {
  const { data } = response;

  if (typeof data !== 'string') {
    wsClient.send(
      stringify(getErrorResponse({ type: DataTypeEnum.RoomCreate })),
    );

    return;
  }

  const { index, name } = wsClient.playerInfo;

  if (isRoomExisting(index)) {
    wsClient.send(
      stringify(
        getErrorResponse({
          type: DataTypeEnum.RoomCreate,
          errorText: ERROR_MESSAGE_ROOM_EXISTS,
        }),
      ),
    );

    return;
  }

  const roomId = randomUUID();
  wsClient.playerInfo.roomId = roomId;
  rooms.push(getNewRoom({ index, name, roomId }));

  (wsServer.clients as Set<WebSocketClientT>).forEach((client) => {
    if (isClientValid(client)) {
      client.send(stringify(getRoomsResponse()));
    }
  });
};
