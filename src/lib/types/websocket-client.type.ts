import WebSocket from 'ws';
import { PlayerT } from './player.type';

export interface WebSocketClientT extends WebSocket {
  playerInfo: PlayerT;
}
