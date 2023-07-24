import WebSocket from 'ws';
import { WebSocketClientT } from '@/lib/types/websocket-client.type';

export const isClientValid = (client: WebSocketClientT) =>
  client.readyState === WebSocket.OPEN && client.playerInfo;
