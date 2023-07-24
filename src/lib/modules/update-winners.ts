import { WebSocketServer } from 'ws';
import { WebSocketClientT } from '@/lib/types/websocket-client.type';
import { getWinnersResponse } from '@/lib/responses/get-winners-response';
import { stringify } from '@/lib/utils/stringify';
import { isClientValid } from '@/lib/utils/is-client-valid';

export const updateWinners = (wsServer: WebSocketServer) => {
  const clients = wsServer.clients as Set<WebSocketClientT>;

  clients.forEach((client) => {
    if (isClientValid(client)) {
      client.send(stringify(getWinnersResponse()));
    }
  });
};
