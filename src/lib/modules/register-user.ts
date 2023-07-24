import { ResponseT } from '@/lib/types/data.type';
import { WebSocketClientT } from '@/lib/types/websocket-client.type';
import { getRegisterUserResponse } from '@/lib/responses/get-register-user-response';
import { getRoomsResponse } from '@/lib/responses/get-rooms-response';
import { getWinnersResponse } from '@/lib/responses/get-winners-response';
import { stringify } from '@/lib/utils/stringify';

export const registerUser = ({
  response,
  wsClient,
}: {
  response: ResponseT;
  wsClient: WebSocketClientT;
}) => {
  const result = getRegisterUserResponse({ response, wsClient });

  wsClient.send(stringify(result));

  if (!result.data.error) {
    wsClient.send(stringify(getRoomsResponse()));
    wsClient.send(stringify(getWinnersResponse()));
  }
};
