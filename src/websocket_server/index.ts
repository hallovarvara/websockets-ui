import { WebSocketServer } from 'ws';
import { MESSAGE_CLOSE_SERVER } from '@/lib/constants';
import { WebSocketChild } from './web-socket-child';
import { WebSocketClientT } from '@/lib/types/websocket-client.type';

export class WebSocketServerExtended {
  public wsServer: WebSocketServer;
  constructor(port: number) {
    this.wsServer = new WebSocketServer({ port });

    this.wsServer.on('connection', (wsClient: WebSocketClientT) => {
      new WebSocketChild(this.wsServer).connect(wsClient);
    });

    this.wsServer.on('close', () => {
      console.log(MESSAGE_CLOSE_SERVER);
    });
  }
}
