import { ShipT } from './ship.type';
import { PositionT } from './position.type';
import { PlayerCredentialsT } from './player.type';
import { RoomT } from '@/lib/types/room.type';
import { WinnerT } from '@/lib/types/winner.type';

export enum DataTypeEnum {
  Attack = 'attack',
  AttackRandom = 'randomAttack',
  GameCreate = 'create_game',
  GameFinish = 'finish',
  GameStart = 'start_game',
  RoomCreate = 'create_room',
  RoomUpdate = 'update_room',
  SinglePlay = 'single_play',
  ShipsAdd = 'add_ships',
  Turn = 'turn',
  UserAddToRoom = 'add_user_to_room',
  UserRegister = 'reg',
  WinnersUpdate = 'update_winners',
}

type ResponseBaseT<Data, Type> = { id: number; data: Data; type: Type };

export type ResponseAttackT = ResponseBaseT<
  Partial<PositionT> & { gameId: string; indexPlayer: string },
  DataTypeEnum.Attack | DataTypeEnum.AttackRandom
>;

export type ResponseGameCreateT = ResponseBaseT<
  { idGame: string; idPlayer: string },
  DataTypeEnum.GameCreate
>;

export type ResponseGameStartT = ResponseBaseT<
  { ships: ShipT[]; currentPlayerIndex: number },
  DataTypeEnum.GameStart
>;

export type ResponseGameFinishT = ResponseBaseT<
  { winPlayer: string },
  DataTypeEnum.GameFinish
>;

export type ResponseRoomCreateT = ResponseBaseT<
  string,
  DataTypeEnum.RoomCreate
>;

export type ResponseRoomUpdateT = ResponseBaseT<
  RoomT[],
  DataTypeEnum.RoomUpdate
>;

export type ResponseShipsAddT = ResponseBaseT<
  { gameId: string; ships: ShipT[]; indexPlayer: string },
  DataTypeEnum.ShipsAdd
>;

export type ResponseTurnT = ResponseBaseT<
  { winPlayer: number },
  DataTypeEnum.Turn
>;

export type ResponseUserAddToRoomT = ResponseBaseT<
  { indexRoom: string },
  DataTypeEnum.UserAddToRoom
>;

export type RequestUserRegisterT = ResponseBaseT<
  PlayerCredentialsT,
  DataTypeEnum.UserRegister
>;

export type ResponseUserRegisterT = ResponseBaseT<
  { name: string; index: string; error: boolean; errorText: string },
  DataTypeEnum.UserRegister
>;

export type ResponseWinnersUpdateT = ResponseBaseT<
  WinnerT[],
  DataTypeEnum.WinnersUpdate
>;

export type ResponseErrorT<Type> = ResponseBaseT<
  { name: string; index: string; error: boolean; errorText: string },
  Type
>;

export type ResponseT =
  | ResponseAttackT
  | ResponseGameCreateT
  | ResponseGameStartT
  | ResponseGameFinishT
  | ResponseRoomCreateT
  | ResponseRoomUpdateT
  | ResponseShipsAddT
  | ResponseTurnT
  | ResponseUserAddToRoomT
  | RequestUserRegisterT
  | ResponseUserRegisterT
  | ResponseWinnersUpdateT
  | ResponseErrorT<DataTypeEnum>;
